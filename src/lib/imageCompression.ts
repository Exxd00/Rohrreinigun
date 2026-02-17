// Image Compression Utility
// Compresses images before upload to max 200KB

export interface CompressedImage {
  file: File;
  originalSize: number;
  compressedSize: number;
  dataUrl: string;
}

export const MAX_FILE_SIZE = 200 * 1024; // 200KB
export const MAX_DIMENSION = 800; // max width/height
export const JPEG_QUALITY = 0.6;

export async function compressImage(file: File): Promise<CompressedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down if needed
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = (height / width) * MAX_DIMENSION;
            width = MAX_DIMENSION;
          } else {
            width = (width / height) * MAX_DIMENSION;
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw image with white background (for transparency)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Try different quality levels to get under max size
        let quality = JPEG_QUALITY;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Reduce quality until under max size
        while (dataUrl.length * 0.75 > MAX_FILE_SIZE && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Convert data URL to File
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeType = 'image/jpeg';
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeType });
        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
          type: mimeType,
          lastModified: Date.now(),
        });

        resolve({
          file: compressedFile,
          originalSize: file.size,
          compressedSize: compressedFile.size,
          dataUrl,
        });
      };

      img.onerror = () => reject(new Error('Could not load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export async function compressImages(files: File[]): Promise<CompressedImage[]> {
  const compressedImages: CompressedImage[] = [];

  for (const file of files) {
    try {
      const compressed = await compressImage(file);
      compressedImages.push(compressed);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }

  return compressedImages;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
