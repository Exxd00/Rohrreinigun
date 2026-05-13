import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

interface CallEventData {
  eventType: "call_intent" | "call_confirmed";
  source: string;
  gclid?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  landingPage?: string | null;
  currentPage?: string | null;
  referrer?: string | null;
  timestamp?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CallEventData = await request.json();

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.log("[Call Event] GOOGLE_SHEETS_WEBHOOK_URL not configured");
      return NextResponse.json({ success: true, message: "Webhook not configured" });
    }

    // Only log confirmed calls (actual phone clicks)
    if (body.eventType !== "call_confirmed") {
      return NextResponse.json({ success: true, message: "Only confirmed calls are logged" });
    }

    // Build source info
    let sourceInfo = "Anruf (Website)";
    if (body.gclid) {
      sourceInfo = "Anruf (Google Ads)";
    } else if (body.utmSource) {
      sourceInfo = `Anruf (${body.utmSource})`;
    }

    // Payload for Google Sheets
    const payload = {
      timestamp: body.timestamp || new Date().toISOString(),
      name: "📞 Anruf",
      phone: "Direkter Anruf",
      email: "",
      city: "",
      service: "Telefonischer Kontakt",
      message: `Anruf von: ${body.source || "unbekannt"}`,
      images: 0,
      source: sourceInfo,
      referrer: body.referrer || "direct",
      gclid: body.gclid || null,
      medium: body.utmMedium || null,
      campaign: body.utmCampaign || null,
      landingPage: body.landingPage || null,
      currentPage: body.currentPage || null,
      // Mark as call event
      eventType: "call",
    };

    console.log("[Call Event] Sending to Google Sheets:", JSON.stringify(payload));

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("[Call Event] Response:", response.status, responseText);

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: responseText }, { status: 500 });
    }
  } catch (error) {
    console.error("[Call Event] Error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
