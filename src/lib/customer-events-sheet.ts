export const CUSTOMER_EVENTS_SHEET_NAME = "📞 Alle Anfragen";
export const CUSTOMER_EVENT_SCHEMA_VERSION = "rrk-customer-event-v1";

export interface CustomerEventPayload {
  eventId: string;
  [key: string]: unknown;
}

export interface CustomerEventWriteResult {
  success: boolean;
  eventId: string;
  sheetName?: string;
  row?: number;
  duplicate?: boolean;
  error?: string;
}

interface CustomerEventWebhookAck {
  success?: unknown;
  eventId?: unknown;
  sheetName?: unknown;
  row?: unknown;
  duplicate?: unknown;
}

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export async function postCustomerEventToSheet(
  webhookUrl: string | undefined,
  payload: CustomerEventPayload,
  fetchImpl: FetchLike = fetch,
): Promise<CustomerEventWriteResult> {
  const eventId = payload.eventId.trim();
  if (!/^[A-Za-z0-9._:-]{1,100}$/.test(eventId)) {
    return { success: false, eventId, error: "event_id_invalid" };
  }

  if (!webhookUrl) {
    return {
      success: false,
      eventId,
      error: "sheets_webhook_not_configured",
    };
  }

  try {
    const response = await fetchImpl(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        eventId,
        schemaVersion: CUSTOMER_EVENT_SCHEMA_VERSION,
        targetSheet: CUSTOMER_EVENTS_SHEET_NAME,
      }),
      cache: "no-store",
    });
    const responseText = await response.text();

    if (!response.ok) {
      return {
        success: false,
        eventId,
        error: `sheets_webhook_http_${response.status}`,
      };
    }

    let ack: CustomerEventWebhookAck;
    try {
      ack = JSON.parse(responseText) as CustomerEventWebhookAck;
    } catch {
      return { success: false, eventId, error: "sheets_webhook_invalid_ack" };
    }

    if (
      ack.success !== true ||
      ack.sheetName !== CUSTOMER_EVENTS_SHEET_NAME ||
      ack.eventId !== eventId ||
      !Number.isInteger(ack.row) ||
      Number(ack.row) < 3
    ) {
      return { success: false, eventId, error: "sheets_webhook_ack_mismatch" };
    }

    return {
      success: true,
      eventId,
      sheetName: CUSTOMER_EVENTS_SHEET_NAME,
      row: Number(ack.row),
      duplicate: ack.duplicate === true,
    };
  } catch (error) {
    return {
      success: false,
      eventId,
      error: error instanceof Error ? error.message : "sheets_webhook_failed",
    };
  }
}
