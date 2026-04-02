import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Check if running on Vercel (production) or locally
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const targetName = formData.get("target") as string || "team-service.jpg";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log(`Original size: ${buffer.length} bytes`);

    // Compress with sharp
    const compressed = await sharp(buffer)
      .resize(1200, 800, { fit: "cover", position: "center" })
      .jpeg({ quality: 80, progressive: true })
      .toBuffer();

    console.log(`Compressed size: ${compressed.length} bytes`);

    let savedLocation: string;
    let downloadUrl: string | null = null;

    if (isVercel) {
      // On Vercel: Return compressed image as downloadable base64
      // Users can download and add to their local project
      const base64 = compressed.toString("base64");
      downloadUrl = `data:image/jpeg;base64,${base64}`;
      savedLocation = "download-ready";
      console.log(`Production mode: Image ready for download`);
    } else {
      // Locally: Save to public/images
      const imagesDir = join(process.cwd(), "public", "images");
      if (!existsSync(imagesDir)) {
        mkdirSync(imagesDir, { recursive: true });
      }
      const outputPath = join(imagesDir, targetName);
      writeFileSync(outputPath, compressed);
      savedLocation = `/images/${targetName}`;
      console.log(`Saved locally: ${outputPath}`);
    }

    return NextResponse.json({
      success: true,
      originalSize: buffer.length,
      compressedSize: compressed.length,
      compressionRatio: `${((1 - compressed.length / buffer.length) * 100).toFixed(1)}%`,
      savedTo: savedLocation,
      downloadUrl,
      isProduction: isVercel,
      targetFileName: targetName,
      message: isVercel
        ? "Image compressed! Download and add to your project's public/images/ folder."
        : "Image saved to public/images/",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process image", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
