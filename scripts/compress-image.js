const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imageUrl = process.argv[2];
const outputPath = path.join(__dirname, '..', 'public', 'images', 'team-service.jpg');

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        downloadImage(response.headers.location).then(resolve).catch(reject);
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function compressAndSave(inputBuffer) {
  const compressed = await sharp(inputBuffer)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();

  fs.writeFileSync(outputPath, compressed);

  console.log(`Original size: ${(inputBuffer.length / 1024).toFixed(1)} KB`);
  console.log(`Compressed size: ${(compressed.length / 1024).toFixed(1)} KB`);
  console.log(`Saved ${((1 - compressed.length / inputBuffer.length) * 100).toFixed(1)}% space`);
  console.log(`Saved to: ${outputPath}`);
}

async function main() {
  try {
    if (imageUrl) {
      console.log(`Downloading from: ${imageUrl}`);
      const buffer = await downloadImage(imageUrl);
      await compressAndSave(buffer);
    } else {
      // If no URL, read from stdin
      const chunks = [];
      process.stdin.on('data', (chunk) => chunks.push(chunk));
      process.stdin.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        await compressAndSave(buffer);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
