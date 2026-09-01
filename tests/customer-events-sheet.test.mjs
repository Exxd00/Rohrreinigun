import assert from "node:assert/strict";
import test from "node:test";

import {
  CUSTOMER_EVENTS_SHEET_NAME,
  postCustomerEventToSheet,
} from "../src/lib/customer-events-sheet.ts";

const event = { eventId: "evt-123", sourceSite: "rohrreinigung-kraft.de" };

test("fails closed when the webhook is not configured", async () => {
  const result = await postCustomerEventToSheet(undefined, event);
  assert.equal(result.success, false);
  assert.equal(result.error, "sheets_webhook_not_configured");
});

test("rejects an unsafe event id before sending", async () => {
  let called = false;
  const result = await postCustomerEventToSheet(
    "https://example.invalid/webhook",
    { ...event, eventId: "=IMPORTXML(1)" },
    async () => {
      called = true;
      return new Response("{}");
    },
  );
  assert.equal(called, false);
  assert.equal(result.success, false);
  assert.equal(result.error, "event_id_invalid");
});

test("accepts only an acknowledgement for Alle Anfragen and the same event", async () => {
  const fetchImpl = async (_input, init) => {
    const sent = JSON.parse(init.body);
    assert.equal(sent.targetSheet, CUSTOMER_EVENTS_SHEET_NAME);
    assert.equal(sent.eventId, event.eventId);
    return new Response(
      JSON.stringify({
        success: true,
        sheetName: CUSTOMER_EVENTS_SHEET_NAME,
        eventId: event.eventId,
        row: 12,
      }),
      { status: 200 },
    );
  };

  const result = await postCustomerEventToSheet(
    "https://example.invalid/webhook",
    event,
    fetchImpl,
  );
  assert.equal(result.success, true);
  assert.equal(result.row, 12);
});

test("rejects a successful response that names another sheet", async () => {
  const fetchImpl = async () =>
    new Response(
      JSON.stringify({
        success: true,
        sheetName: "Sheet4",
        eventId: event.eventId,
        row: 4,
      }),
      { status: 200 },
    );

  const result = await postCustomerEventToSheet(
    "https://example.invalid/webhook",
    event,
    fetchImpl,
  );
  assert.equal(result.success, false);
  assert.equal(result.error, "sheets_webhook_ack_mismatch");
});

test("rejects a duplicate acknowledgement with a different event id", async () => {
  const fetchImpl = async () =>
    new Response(
      JSON.stringify({
        success: true,
        sheetName: CUSTOMER_EVENTS_SHEET_NAME,
        eventId: "another-event",
        row: 4,
        duplicate: true,
      }),
      { status: 200 },
    );

  const result = await postCustomerEventToSheet(
    "https://example.invalid/webhook",
    event,
    fetchImpl,
  );
  assert.equal(result.success, false);
  assert.equal(result.error, "sheets_webhook_ack_mismatch");
});
