import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

interface DirectCallEventData {
  eventType: "direct_call_click";
  eventId?: string;
  source?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  landingPage?: string | null;
  currentPage?: string | null;
  referrer?: string | null;
}

const clean = (value: unknown, maxLength = 240) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DirectCallEventData;

    if (body.eventType !== "direct_call_click") {
      return NextResponse.json({
        success: true,
        recorded: false,
        reason: "unsupported_event",
      });
    }

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      return NextResponse.json({
        success: true,
        recorded: false,
        reason: "sheets_webhook_not_configured",
      });
    }

    const source = clean(body.source, 120) || "floating_call_modal";
    const trafficSource = clean(body.utmSource, 80) || "Website";
    const trafficMedium = clean(body.utmMedium, 80);
    const attribution = trafficMedium
      ? trafficSource + " / " + trafficMedium
      : trafficSource;

    const payload = {
      timestamp: new Date().toISOString(),
      name: "📞 Website-Telefonklick",
      phone: "Direkter Anruf",
      email: "",
      city: "Nürnberg",
      service: "Telefonischer Kontakt",
      message:
        'Klick auf "Jetzt direkt anrufen" im schwebenden Anruf-Dialog (' +
        source +
        ").",
      images: 0,
      source: attribution,
      referrer: clean(body.referrer, 500) || "direct",
      gclid: null,
      medium: trafficMedium || null,
      campaign: clean(body.utmCampaign, 160) || null,
      landingPage: clean(body.landingPage, 500) || null,
      currentPage: clean(body.currentPage, 500) || null,
      eventId: clean(body.eventId, 100) || null,
      eventName: "direct_call_click",
      eventType: "call",
      callStatus: "not_confirmed",
      sourceSite: "rohrreinigung-kraft.de",
    };

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const responseText = await response.text();

    if (!response.ok) {
      console.error(
        "[Direct call event] Google Sheets webhook failed:",
        response.status,
        responseText.slice(0, 300),
      );
      return NextResponse.json(
        { success: false, recorded: false },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, recorded: true });
  } catch (error) {
    console.error("[Direct call event] Error:", error);
    return NextResponse.json(
      { success: false, recorded: false },
      { status: 400 },
    );
  }
}
