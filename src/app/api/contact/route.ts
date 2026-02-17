import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "info@rohrreinigungkraft.de";
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

interface ImageUploadResult {
  uploadedUrls: string[];
  failedCount: number;
  totalProvided: number;
  errors: string[];
}

async function uploadImageToImgBB(base64Image: string, index: number): Promise<{ url: string | null; error: string | null }> {
  if (!IMGBB_API_KEY) {
    const error = `[Image ${index + 1}] IMGBB_API_KEY is not configured`;
    console.error(error);
    return { url: null, error };
  }

  try {
    // Remove data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const sizeKB = Math.round(base64Data.length * 0.75 / 1024);
    console.log(`[Image ${index + 1}] Uploading to ImgBB... (size: ~${sizeKB}KB)`);

    // Use URLSearchParams for more reliable upload
    const params = new URLSearchParams();
    params.append("key", IMGBB_API_KEY);
    params.append("image", base64Data);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.success && data.data?.url) {
      console.log(`[Image ${index + 1}] Upload successful: ${data.data.url}`);
      return { url: data.data.url, error: null };
    }

    const error = `[Image ${index + 1}] ImgBB error: ${JSON.stringify(data.error || data)}`;
    console.error(error);
    return { url: null, error };
  } catch (error) {
    const errorMsg = `[Image ${index + 1}] Upload error: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    return { url: null, error: errorMsg };
  }
}

async function uploadAllImages(images: string[]): Promise<ImageUploadResult> {
  const result: ImageUploadResult = {
    uploadedUrls: [],
    failedCount: 0,
    totalProvided: images.length,
    errors: [],
  };

  console.log(`[Images] Starting upload of ${images.length} image(s)...`);

  for (let i = 0; i < images.length; i++) {
    const { url, error } = await uploadImageToImgBB(images[i], i);
    if (url) {
      result.uploadedUrls.push(url);
    } else {
      result.failedCount++;
      if (error) result.errors.push(error);
    }
  }

  console.log(`[Images] Upload complete: ${result.uploadedUrls.length}/${result.totalProvided} successful`);
  if (result.errors.length > 0) {
    console.log(`[Images] Errors: ${result.errors.join(', ')}`);
  }

  return result;
}

function formatDate(): string {
  return new Date().toLocaleString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function sendEmailViaResend(formData: ContactFormData, imageResult: ImageUploadResult): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  console.log("=== EMAIL CONFIG ===");
  console.log("FROM:", RESEND_FROM_EMAIL);
  console.log("TO:", RECIPIENT_EMAIL);
  console.log("Images:", imageResult.uploadedUrls.length, "uploaded,", imageResult.failedCount, "failed");
  console.log("====================");

  // Build image section
  let imageSection = "";
  if (imageResult.uploadedUrls.length > 0) {
    imageSection = `
      <tr>
        <td style="padding: 25px 30px; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom: 15px;">
                <span style="display: inline-block; background: linear-gradient(135deg, #3AB0FF 0%, #2563EB 100%); color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  📷 Bilder (${imageResult.uploadedUrls.length})
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    ${imageResult.uploadedUrls.map((url, i) => `
                      <td style="padding-right: 12px; padding-bottom: 12px;">
                        <a href="${url}" target="_blank" style="text-decoration: none;">
                          <img src="${url}" alt="Bild ${i + 1}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 12px; border: 3px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
                        </a>
                      </td>
                    `).join("")}
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  } else if (imageResult.totalProvided > 0) {
    // Images were provided but couldn't be uploaded
    imageSection = `
      <tr>
        <td style="padding: 20px 30px; background-color: #fef3c7;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="color: #92400e; font-size: 14px;">
                ⚠️ <strong>${imageResult.totalProvided} Bild(er) wurden hochgeladen, konnten aber nicht verarbeitet werden.</strong>
                <br><span style="font-size: 12px; color: #a16207;">Bitte IMGBB_API_KEY in den Umgebungsvariablen konfigurieren.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }

  const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Neue Kontaktanfrage</title>
  <style>
    /* Reset */
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }

    /* Mobile Styles */
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding-left: 15px !important; padding-right: 15px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-full-width { width: 100% !important; max-width: 100% !important; }
      .mobile-btn { display: block !important; width: 100% !important; margin-bottom: 10px !important; padding: 16px 20px !important; }
      .mobile-font-large { font-size: 24px !important; }
      .mobile-hide { display: none !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 20px 10px;">

        <!-- Main Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
              <div style="font-size: 40px; margin-bottom: 12px;">🔧</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">Neue Kundenanfrage</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Rohrreinigung Kraft</p>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td class="mobile-padding" style="padding: 20px 20px 0 20px;">
              <div style="background-color: #ecfdf5; border-radius: 10px; padding: 12px 15px; border-left: 4px solid #10b981;">
                <span style="color: #065f46; font-size: 13px;">📅 <strong>${formatDate()}</strong></span>
              </div>
            </td>
          </tr>

          <!-- Service Type - BIG & PROMINENT -->
          <tr>
            <td class="mobile-padding" style="padding: 20px;">
              <div style="background: linear-gradient(135deg, #3AB0FF 0%, #2563EB 100%); border-radius: 16px; padding: 20px; text-align: center;">
                <span style="color: rgba(255,255,255,0.8); font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Gewünschte Leistung</span>
                <h2 style="margin: 10px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 800;">${formData.service}</h2>
              </div>
            </td>
          </tr>

          <!-- PHONE - MOST IMPORTANT - BIG BUTTON -->
          <tr>
            <td class="mobile-padding" style="padding: 0 20px 20px 20px;">
              <a href="tel:${formData.phone}" style="display: block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px; padding: 20px; text-decoration: none; text-align: center;">
                <span style="color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">📞 Jetzt anrufen</span>
                <div class="mobile-font-large" style="color: #ffffff; font-size: 28px; font-weight: 800; margin-top: 8px; letter-spacing: 0.5px;">${formData.phone}</div>
              </a>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td class="mobile-padding" style="padding: 0 20px;">
              <div style="background-color: #f8fafc; border-radius: 16px; overflow: hidden;">

                <!-- Name -->
                <div style="padding: 16px 18px; border-bottom: 1px solid #e2e8f0;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 12px;">👤</span>
                    <div>
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Name</span>
                      <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 17px; font-weight: 600;">${formData.name}</p>
                    </div>
                  </div>
                </div>

                <!-- Location -->
                <div style="padding: 16px 18px; border-bottom: 1px solid #e2e8f0;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 12px;">📍</span>
                    <div>
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Einsatzort</span>
                      <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 17px; font-weight: 600;">${formData.city}</p>
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div style="padding: 16px 18px;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 12px;">✉️</span>
                    <div>
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">E-Mail</span>
                      <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 15px;">
                        ${formData.email ? `<a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none; word-break: break-all;">${formData.email}</a>` : '<span style="color: #94a3b8;">Nicht angegeben</span>'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </td>
          </tr>

          <!-- Message -->
          ${formData.message ? `
          <tr>
            <td class="mobile-padding" style="padding: 20px;">
              <div style="background-color: #f8fafc; border-radius: 16px; padding: 18px; border-left: 4px solid #3AB0FF;">
                <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">💬 Nachricht</span>
                <p style="margin: 10px 0 0 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Images -->
          ${imageResult.uploadedUrls.length > 0 ? `
          <tr>
            <td class="mobile-padding" style="padding: 0 20px 20px 20px;">
              <div style="background-color: #f8fafc; border-radius: 16px; padding: 18px;">
                <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📷 Bilder (${imageResult.uploadedUrls.length})</span>
                <div style="margin-top: 12px;">
                  ${imageResult.uploadedUrls.map((url, i) => `
                    <a href="${url}" target="_blank" style="display: inline-block; margin: 4px;">
                      <img src="${url}" alt="Bild ${i + 1}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 12px; border: 2px solid #e2e8f0;" />
                    </a>
                  `).join('')}
                </div>
              </div>
            </td>
          </tr>
          ` : imageResult.totalProvided > 0 ? `
          <tr>
            <td class="mobile-padding" style="padding: 0 20px 20px 20px;">
              <div style="background-color: #fef3c7; border-radius: 12px; padding: 15px;">
                <span style="color: #92400e; font-size: 13px;">⚠️ ${imageResult.totalProvided} Bild(er) konnten nicht verarbeitet werden.</span>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Action Buttons -->
          <tr>
            <td class="mobile-padding" style="padding: 10px 20px 25px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 5px;">
                    <a href="tel:${formData.phone}" class="mobile-btn" style="display: block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 20px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 15px; text-align: center;">
                      📞 Anrufen
                    </a>
                  </td>
                  <td style="padding: 5px;">
                    <a href="https://wa.me/${formData.phone.replace(/[^0-9]/g, '')}" class="mobile-btn" style="display: block; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; padding: 14px 20px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 15px; text-align: center;">
                      💬 WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px;">
                Automatisch gesendet von<br>
                <strong style="color: #3AB0FF;">rohrreinigung-kraft.de</strong>
              </p>
            </td>
          </tr>

        </table>

        <!-- Footer Text -->
        <p style="margin: 15px 0 0 0; color: #94a3b8; font-size: 11px; text-align: center;">
          © ${new Date().getFullYear()} Rohrreinigung Kraft
        </p>

      </td>
    </tr>
  </table>
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
        subject: `🔧 Neue Anfrage: ${formData.service} - ${formData.name} (${formData.city})`,
        html: emailHtml,
        reply_to: formData.email || undefined,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API error:", JSON.stringify(data, null, 2));
      return false;
    }
    console.log("Email sent successfully:", data.id);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

async function sendToGoogleSheets(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.log("[Google Sheets] GOOGLE_SHEETS_WEBHOOK_URL not configured - skipping");
    return { success: true }; // Don't fail if not configured
  }

  console.log("[Google Sheets] Sending data to webhook...");
  console.log("[Google Sheets] Webhook URL:", GOOGLE_SHEETS_WEBHOOK_URL.substring(0, 50) + "...");

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "",
      city: formData.city,
      service: formData.service,
      message: formData.message || "",
    };

    console.log("[Google Sheets] Payload:", JSON.stringify(payload));

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("[Google Sheets] Response status:", response.status);
    console.log("[Google Sheets] Response:", responseText);

    if (response.ok) {
      console.log("[Google Sheets] Data sent successfully!");
      return { success: true };
    } else {
      const error = `Status ${response.status}: ${responseText}`;
      console.error("[Google Sheets] Error:", error);
      return { success: false, error };
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[Google Sheets] Error:", errorMsg);
    return { success: false, error: errorMsg };
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
    let imageResult: ImageUploadResult = {
      uploadedUrls: [],
      failedCount: 0,
      totalProvided: 0,
      errors: [],
    };

    if (formData.images && formData.images.length > 0) {
      console.log(`[Contact Form] ${formData.images.length} image(s) provided`);
      imageResult = await uploadAllImages(formData.images);
    }

    // Send email via Resend
    const emailSent = await sendEmailViaResend(formData, imageResult);

    // Send to Google Sheets (without images)
    const sheetsResult = await sendToGoogleSheets(formData);

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
      sheetsSent: sheetsResult.success,
      sheetsError: sheetsResult.error || null,
      imagesUploaded: imageResult.uploadedUrls.length,
      imagesFailed: imageResult.failedCount,
      imageErrors: imageResult.errors,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten", details: String(error) },
      { status: 500 }
    );
  }
}
