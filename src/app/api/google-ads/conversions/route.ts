import { NextRequest, NextResponse } from "next/server";
import {
  uploadCallConversion,
  uploadClickConversion,
  getConversionActions,
  createCallConversionAction,
  GoogleAdsConfig,
} from "@/lib/google-ads";

function getConfig(): GoogleAdsConfig {
  return {
    developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || "",
    clientId: process.env.GOOGLE_ADS_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || "",
    refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || "",
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || "", // Client account (789-424-2096)
    loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "", // MCC account (476-210-5656)
  };
}

// Get conversion actions
export async function GET() {
  try {
    const config = getConfig();
    const conversions = await getConversionActions(config);
    return NextResponse.json({ success: true, data: conversions });
  } catch (error) {
    console.error("[Conversions API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// Upload conversion or create conversion action
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;
    const config = getConfig();

    switch (action) {
      case "upload-call": {
        // Upload a call conversion
        // Required: gclid OR callerPhoneNumber, conversionActionName, conversionDateTime
        const result = await uploadCallConversion(config, {
          gclid: data.gclid,
          gbraid: data.gbraid,
          conversionActionName: data.conversionActionName || "call_confirmed",
          conversionDateTime: data.conversionDateTime || new Date().toISOString(),
          conversionValue: data.conversionValue || 50,
          callerPhoneNumber: data.callerPhoneNumber,
        });

        if (result.success) {
          // Also log to Google Sheets if configured
          await logConversionToSheets({
            type: "call",
            gclid: data.gclid,
            phone: data.callerPhoneNumber,
            value: data.conversionValue || 50,
            timestamp: data.conversionDateTime || new Date().toISOString(),
          });
        }

        return NextResponse.json(result);
      }

      case "upload-click": {
        // Upload a click conversion (website conversion with gclid)
        const result = await uploadClickConversion(config, {
          gclid: data.gclid,
          conversionActionName: data.conversionActionName || "form_confirmed",
          conversionDateTime: data.conversionDateTime || new Date().toISOString(),
          conversionValue: data.conversionValue || 50,
          orderId: data.orderId,
        });

        return NextResponse.json(result);
      }

      case "create-call-conversion": {
        // Create a new call conversion action
        const result = await createCallConversionAction(
          config,
          data.name || "Calls from Ads",
          data.defaultValue || 50
        );

        return NextResponse.json({ success: true, resourceName: result });
      }

      case "bulk-upload": {
        // Bulk upload multiple conversions
        const results = [];
        for (const conversion of data.conversions || []) {
          let result;
          if (conversion.type === "call") {
            result = await uploadCallConversion(config, {
              gclid: conversion.gclid,
              conversionActionName: conversion.conversionActionName || "call_confirmed",
              conversionDateTime: conversion.conversionDateTime,
              conversionValue: conversion.conversionValue,
              callerPhoneNumber: conversion.callerPhoneNumber,
            });
          } else {
            result = await uploadClickConversion(config, {
              gclid: conversion.gclid,
              conversionActionName: conversion.conversionActionName || "form_confirmed",
              conversionDateTime: conversion.conversionDateTime,
              conversionValue: conversion.conversionValue,
            });
          }
          results.push({ ...conversion, result });
        }

        const successCount = results.filter(r => r.result.success).length;
        return NextResponse.json({
          success: true,
          uploaded: successCount,
          failed: results.length - successCount,
          details: results,
        });
      }

      default:
        return NextResponse.json({
          success: false,
          error: "Unknown action. Use: upload-call, upload-click, create-call-conversion, bulk-upload"
        }, { status: 400 });
    }
  } catch (error) {
    console.error("[Conversions API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// Helper: Log conversion to Google Sheets
async function logConversionToSheets(data: {
  type: string;
  gclid?: string;
  phone?: string;
  value: number;
  timestamp: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: data.timestamp,
        name: "📞 Conversion Import",
        phone: data.phone || "Via GCLID",
        service: `Imported ${data.type} conversion`,
        source: data.gclid ? "Google Ads (GCLID)" : "Manual Import",
        gclid: data.gclid,
        eventType: "imported_conversion",
        value: data.value,
      }),
    });
  } catch (e) {
    console.error("Failed to log to sheets:", e);
  }
}
