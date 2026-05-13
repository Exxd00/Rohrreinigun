import { NextRequest, NextResponse } from "next/server";
import {
  getPerformanceReport,
  getKeywordReport,
  getConversionReport,
  getCallExtensionReport,
  getCampaignPerformanceByCity,
  getCampaigns,
  microsToCurrency,
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

function getDateRange(searchParams: URLSearchParams): { startDate: string; endDate: string } {
  const today = new Date();
  const range = searchParams.get("range") || "30d";

  let startDate: Date;

  switch (range) {
    case "7d":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "30d":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 30);
      break;
    case "90d":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 90);
      break;
    case "this_month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "last_month":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      today.setDate(0); // Last day of previous month
      break;
    default:
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 30);
  }

  // Allow custom dates
  const customStart = searchParams.get("startDate");
  const customEnd = searchParams.get("endDate");

  return {
    startDate: customStart || startDate.toISOString().split("T")[0],
    endDate: customEnd || today.toISOString().split("T")[0],
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reportType = searchParams.get("type") || "performance";
  const format = searchParams.get("format") || "json";

  const config = getConfig();
  const dateRange = getDateRange(searchParams);

  try {
    let data: unknown[];
    let reportName: string;

    switch (reportType) {
      case "performance":
        data = await getPerformanceReport(config, dateRange);
        reportName = "performance_report";
        break;

      case "keywords":
        data = await getKeywordReport(config, dateRange);
        reportName = "keyword_report";
        break;

      case "conversions":
        data = await getConversionReport(config, dateRange);
        reportName = "conversion_report";
        break;

      case "calls":
        data = await getCallExtensionReport(config, dateRange);
        reportName = "call_report";
        break;

      case "cities":
        data = await getCampaignPerformanceByCity(config, dateRange);
        reportName = "city_performance_report";
        break;

      case "campaigns":
        data = await getCampaigns(config, dateRange);
        reportName = "campaign_report";
        break;

      case "complete":
        // Generate a complete report with all data
        const [performance, keywords, conversions, calls, campaigns] = await Promise.all([
          getPerformanceReport(config, dateRange),
          getKeywordReport(config, dateRange),
          getConversionReport(config, dateRange),
          getCallExtensionReport(config, dateRange).catch(() => []),
          getCampaigns(config, dateRange),
        ]);

        data = [{
          dateRange,
          performance,
          keywords,
          conversions,
          calls,
          campaigns,
          summary: calculateSummary(performance),
        }];
        reportName = "complete_report";
        break;

      default:
        return NextResponse.json({
          success: false,
          error: "Unknown report type. Use: performance, keywords, conversions, calls, cities, campaigns, complete"
        }, { status: 400 });
    }

    // Format response
    if (format === "csv") {
      const csv = convertToCSV(data);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${reportName}_${dateRange.startDate}_${dateRange.endDate}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      reportType,
      dateRange,
      data,
    });

  } catch (error) {
    console.error("[Reports API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// Calculate summary statistics
function calculateSummary(data: unknown[]): Record<string, number> {
  if (!data || data.length === 0) {
    return {
      totalImpressions: 0,
      totalClicks: 0,
      totalCost: 0,
      totalConversions: 0,
      totalConversionValue: 0,
      avgCPC: 0,
      avgCTR: 0,
      avgCostPerConversion: 0,
    };
  }

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCostMicros = 0;
  let totalConversions = 0;
  let totalConversionValue = 0;

  for (const row of data) {
    const metrics = (row as { metrics?: Record<string, number> }).metrics || {};
    totalImpressions += metrics.impressions || 0;
    totalClicks += metrics.clicks || 0;
    totalCostMicros += metrics.costMicros || 0;
    totalConversions += metrics.conversions || 0;
    totalConversionValue += metrics.conversionsValue || 0;
  }

  const totalCost = microsToCurrency(totalCostMicros);

  return {
    totalImpressions,
    totalClicks,
    totalCost,
    totalConversions,
    totalConversionValue,
    avgCPC: totalClicks > 0 ? totalCost / totalClicks : 0,
    avgCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
    avgCostPerConversion: totalConversions > 0 ? totalCost / totalConversions : 0,
  };
}

// Convert data to CSV format
function convertToCSV(data: unknown[]): string {
  if (!data || data.length === 0) {
    return "";
  }

  // Flatten nested objects
  const flattenObject = (obj: unknown, prefix = ""): Record<string, unknown> => {
    const flattened: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const newKey = prefix ? `${prefix}_${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  };

  const flatData = data.map(row => flattenObject(row));

  // Get all unique headers
  const headers = new Set<string>();
  flatData.forEach(row => {
    Object.keys(row).forEach(key => headers.add(key));
  });
  const headerArray = Array.from(headers);

  // Create CSV
  const csvRows = [
    headerArray.join(","),
    ...flatData.map(row =>
      headerArray.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return "";
        if (typeof value === "string" && value.includes(",")) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return String(value);
      }).join(",")
    ),
  ];

  return csvRows.join("\n");
}
