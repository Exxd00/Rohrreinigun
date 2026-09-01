import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { getPathMatch } = require(
  "next/dist/shared/lib/router/utils/path-match",
);
const nextConfig = require("../next.config.js");
const redirects = await nextConfig.redirects();

test("redirects the bare service path to the catalogue with HTTP 301", () => {
  const redirect = redirects.find((entry) => entry.source === "/service");
  assert.deepEqual(redirect, {
    source: "/service",
    destination: "/leistungen",
    statusCode: 301,
  });
});

test("legacy city redirects do not capture real service pages", () => {
  for (const slug of [
    "rohrreinigung",
    "abflussreinigung",
    "kanalreinigung",
    "rohrreinigung-notdienst",
  ]) {
    const redirect = redirects.find(
      (entry) =>
        entry.source.includes(":city") && entry.source.endsWith(`/${slug}`),
    );
    assert.ok(redirect, `missing redirect for ${slug}`);
    const match = getPathMatch(redirect.source);
    assert.equal(match(`/service/${slug}`), false);
    assert.deepEqual(match(`/nuernberg/${slug}`), { city: "nuernberg" });
  }
});

test("emits only the configured thank-you event name", async () => {
  const source = await readFile(
    new URL("../src/lib/tracking.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /trackEvent\("thank_you_page",/);
  assert.doesNotMatch(source, /trackEvent\("kraft_thank_you",/);
});

test("neutralizes formula-leading spreadsheet values", async () => {
  const source = await readFile(
    new URL("../scripts/google-sheets-customer-events.gs", import.meta.url),
    "utf8",
  );
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const safeCell = (value) =>
    vm.runInContext(`safeCell_(${JSON.stringify(value)})`, context);

  assert.equal(safeCell("=IMPORTXML(1)"), "'=IMPORTXML(1)");
  assert.equal(safeCell("  +49911"), "'  +49911");
  assert.equal(safeCell("normal text"), "normal text");
});

test("keeps the current production payload valid during rollout", async () => {
  const source = await readFile(
    new URL("../scripts/google-sheets-customer-events.gs", import.meta.url),
    "utf8",
  );
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const legacyPayload = {
    sourceSite: "rohrreinigung-kraft.de",
    eventId: "legacy-rollout-event",
    timestamp: "2026-09-01T00:00:00.000Z",
  };
  assert.doesNotThrow(() =>
    vm.runInContext(`validatePayload_(${JSON.stringify(legacyPayload)})`, context),
  );
  assert.throws(
    () =>
      vm.runInContext(
        `validatePayload_(${JSON.stringify({ ...legacyPayload, schemaVersion: "wrong", targetSheet: "wrong" })})`,
        context,
      ),
    /Invalid schema/,
  );
});
