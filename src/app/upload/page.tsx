"use client";

import { useState, useCallback } from "react";
import { Upload, CheckCircle, Loader2, Download, AlertTriangle } from "lucide-react";

const targetOptions = [
  { value: "rohrreinigung-hero.jpg", label: "Rohrreinigung Hero Card" },
  { value: "kanalreinigung-hero.jpg", label: "Kanalreinigung Hero Card" },
  { value: "notdienst-hero.jpg", label: "Notdienst Hero Card" },
  { value: "team-service.jpg", label: "Team Service (About Section)" },
  { value: "team-group.jpg", label: "Team Group Photo" },
  { value: "team-1.jpg", label: "Team Member 1" },
  { value: "team-2.jpg", label: "Team Member 2" },
  { value: "team-3.jpg", label: "Team Member 3" },
];

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [targetFile, setTargetFile] = useState("rohrreinigung-hero.jpg");
  const [result, setResult] = useState<{
    success: boolean;
    originalSize: number;
    compressedSize: number;
    compressionRatio: string;
    savedTo: string;
    downloadUrl?: string;
    isProduction?: boolean;
    message?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    setResult(null);

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    await uploadFile(file);
  }, [targetFile]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setResult(null);
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target", targetFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!result?.downloadUrl) return;

    const link = document.createElement("a");
    link.href = result.downloadUrl;
    link.download = targetFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Upload & Compress Image
        </h1>

        {/* Target file selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Save as:
          </label>
          <select
            value={targetFile}
            onChange={(e) => setTargetFile(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {targetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value})
              </option>
            ))}
          </select>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-all
            ${isDragging
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Compressing image...</p>
            </div>
          ) : result ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-green-600 dark:text-green-400 font-semibold">
                Image compressed successfully!
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>Original: {(result.originalSize / 1024).toFixed(1)} KB</p>
                <p>Compressed: {(result.compressedSize / 1024).toFixed(1)} KB</p>
                <p>Saved {result.compressionRatio} space</p>
              </div>

              {result.isProduction && result.downloadUrl && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Production Mode</span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-500 mb-3">
                    Download the compressed image and add it to your project's <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">public/images/</code> folder manually.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download {targetFile}
                  </button>
                </div>
              )}

              {!result.isProduction && (
                <p className="font-medium mt-2 text-green-600 dark:text-green-400">
                  ✓ Saved to: {result.savedTo}
                </p>
              )}

              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Upload Another
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag & drop an image here, or click to select
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition"
              >
                Select Image
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Image will be compressed and saved as <strong>{targetFile}</strong>
              </p>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-center">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Compression: Resize to 1200x800, JPEG quality 80%
        </p>
      </div>
    </div>
  );
}
