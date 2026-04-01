import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

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

    // Save to public/images
    const outputPath = join(process.cwd(), "public", "images", targetName);
    writeFileSync(outputPath, compressed);

    return NextResponse.json({
      success: true,
      originalSize: buffer.length,
      compressedSize: compressed.length,
      compressionRatio: `${((1 - compressed.length / buffer.length) * 100).toFixed(1)}%`,
      savedTo: `/images/${targetName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
