import { NextRequest, NextResponse } from "next/server";
import {
  testConnection,
  getConversionActions,
  getCampaigns,
  getPerformanceReport,
  GoogleAdsConfig,
} from "@/lib/google-ads";

// Get config from environment or request
function getConfig(body?: Partial<GoogleAdsConfig>): GoogleAdsConfig {
  return {
    developerToken: body?.developerToken || process.env.GOOGLE_ADS_DEVELOPER_TOKEN || "",
    clientId: body?.clientId || process.env.GOOGLE_ADS_CLIENT_ID || "",
    clientSecret: body?.clientSecret || process.env.GOOGLE_ADS_CLIENT_SECRET || "",
    refreshToken: body?.refreshToken || process.env.GOOGLE_ADS_REFRESH_TOKEN || "",
    customerId: body?.customerId || process.env.GOOGLE_ADS_CUSTOMER_ID || "", // Client account (789-424-2096)
    loginCustomerId: body?.loginCustomerId || process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "", // MCC account (476-210-5656)
  };
}

// Test connection
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

  const config = getConfig();

  try {
    switch (action) {
      case "test":
        const testResult = await testConnection(config);
        return NextResponse.json(testResult);

      case "conversions":
        const conversions = await getConversionActions(config);
        return NextResponse.json({ success: true, data: conversions });

      case "campaigns":
        const startDate = searchParams.get("startDate") || getDefaultStartDate();
        const endDate = searchParams.get("endDate") || getDefaultEndDate();
        const campaigns = await getCampaigns(config, { startDate, endDate });
        return NextResponse.json({ success: true, data: campaigns });

      case "performance":
        const perfStartDate = searchParams.get("startDate") || getDefaultStartDate();
        const perfEndDate = searchParams.get("endDate") || getDefaultEndDate();
        const performance = await getPerformanceReport(config, { startDate: perfStartDate, endDate: perfEndDate });
        return NextResponse.json({ success: true, data: performance });

      default:
        return NextResponse.json({
          success: false,
          error: "Unknown action. Use: test, conversions, campaigns, performance"
        }, { status: 400 });
    }
  } catch (error) {
    console.error("[Google Ads API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// Save settings or perform actions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "test-connection":
        const config = getConfig(data);
        const result = await testConnection(config);
        return NextResponse.json(result);

      case "save-settings":
        // In production, save to secure storage (e.g., encrypted database)
        // For now, we'll just validate the settings
        const testConfig = getConfig(data);
        const testResult = await testConnection(testConfig);
        if (testResult.success) {
          // Would save to database here
          return NextResponse.json({ success: true, message: "Settings validated successfully" });
        } else {
          return NextResponse.json({ success: false, error: testResult.error });
        }

      default:
        return NextResponse.json({
          success: false,
          error: "Unknown action"
        }, { status: 400 });
    }
  } catch (error) {
    console.error("[Google Ads API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

function getDefaultStartDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split("T")[0];
}

function getDefaultEndDate(): string {
  return new Date().toISOString().split("T")[0];
}
