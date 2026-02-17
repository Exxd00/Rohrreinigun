import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "info@rohrreinigungkraft.de";
// Use verified domain - no fallback to test domain
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Rohrreinigung Kraft <noreply@rohrreinigungkraft.de>";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  images?: string[]; // base64 images
}

async function uploadImageToImgBB(base64Image: string): Promise<string | null> {
  if (!IMGBB_API_KEY) return null;

  try {
    // Remove data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64Data);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    }
    return null;
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    return null;
  }
}

async function sendEmailViaResend(formData: ContactFormData, imageUrls: string[]): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  // Debug logging
  console.log("=== EMAIL CONFIG ===");
  console.log("FROM:", RESEND_FROM_EMAIL);
  console.log("TO:", RECIPIENT_EMAIL);
  console.log("====================");

  const imageHtml = imageUrls.length > 0
    ? `
      <h3 style="color: #3AB0FF;">Hochgeladene Bilder:</h3>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        ${imageUrls.map((url, i) => `
          <a href="${url}" target="_blank">
            <img src="${url}" alt="Bild ${i + 1}" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 1px solid #ddd;" />
          </a>
        `).join("")}
      </div>
    `
    : "";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3AB0FF 0%, #2563EB 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #3AB0FF; }
        .value { margin-top: 5px; }
        .footer { background: #1E3A8A; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Neue Kontaktanfrage</h1>
          <p style="margin: 5px 0 0 0;">Rohrreinigung Kraft</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${formData.name}</div>
          </div>
          <div class="field">
            <div class="label">Telefon:</div>
            <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
          </div>
          <div class="field">
            <div class="label">E-Mail:</div>
            <div class="value">${formData.email || "Nicht angegeben"}</div>
          </div>
          <div class="field">
            <div class="label">Ort:</div>
            <div class="value">${formData.city}</div>
          </div>
          <div class="field">
            <div class="label">Service:</div>
            <div class="value">${formData.service}</div>
          </div>
          <div class="field">
            <div class="label">Nachricht:</div>
            <div class="value">${formData.message || "Keine Nachricht"}</div>
          </div>
          ${imageHtml}
        </div>
        <div class="footer">
          <p>Diese E-Mail wurde automatisch von der Website rohrreinigung-kraft.de gesendet.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [RECIPIENT_EMAIL],
        subject: `Neue Anfrage: ${formData.service} - ${formData.name}`,
        html: emailHtml,
        reply_to: formData.email || undefined,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API error:", JSON.stringify(data, null, 2));
      console.error("Sending from:", RESEND_FROM_EMAIL);
      console.error("Sending to:", RECIPIENT_EMAIL);
      // Return false and include error details
      return false;
    }
    console.log("Email sent successfully:", data.id);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

async function sendToGoogleSheets(formData: ContactFormData): Promise<boolean> {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.log("GOOGLE_SHEETS_WEBHOOK_URL not configured - skipping");
    return true; // Don't fail if not configured
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "",
        city: formData.city,
        service: formData.service,
        message: formData.message || "",
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formData: ContactFormData = body;

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.city || !formData.service) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen", details: "Name, Telefon, Ort und Service sind erforderlich" },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server-Konfigurationsfehler", details: "RESEND_API_KEY fehlt" },
        { status: 500 }
      );
    }

    // Upload images to ImgBB if provided
    const imageUrls: string[] = [];
    if (formData.images && formData.images.length > 0) {
      for (const image of formData.images) {
        const url = await uploadImageToImgBB(image);
        if (url) {
          imageUrls.push(url);
        }
      }
    }

    // Send email via Resend
    const emailSent = await sendEmailViaResend(formData, imageUrls);

    // Send to Google Sheets (without images)
    const sheetsSent = await sendToGoogleSheets(formData);

    if (!emailSent) {
      return NextResponse.json(
        {
          error: "E-Mail konnte nicht gesendet werden",
          details: "Resend API Fehler. Mögliche Ursachen: 1) Domain nicht verifiziert bei Resend 2) RECIPIENT_EMAIL muss die verifizierte Resend E-Mail sein bei Nutzung von onboarding@resend.dev"
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Anfrage erfolgreich gesendet",
      emailSent,
      sheetsSent,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten", details: String(error) },
      { status: 500 }
    );
  }
}
