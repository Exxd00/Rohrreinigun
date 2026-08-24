import { createHash, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "rk_admin_session";

function getAdminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value || null;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = getAdminPassword();
  return expected !== null && safeEqual(candidate, expected);
}

export function getAdminSessionToken(): string | null {
  const password = getAdminPassword();
  if (!password) return null;
  return createHash("sha256").update(`rk-admin:${password}`).digest("hex");
}

export function isAdminRequestAuthorized(request: NextRequest): boolean {
  const expectedToken = getAdminSessionToken();
  const suppliedToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return Boolean(
    expectedToken && suppliedToken && safeEqual(suppliedToken, expectedToken),
  );
}
