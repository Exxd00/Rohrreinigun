import { NextResponse } from "next/server";

// Kept for compatibility with older cached clients. Website phone clicks are
// not written as calls because a tel: click cannot confirm a connected call.
// Real Google Ads calls are synchronized from the Ads call report instead.
export async function POST() {
  return NextResponse.json({
    success: true,
    recorded: false,
    reason: "phone_click_is_not_a_confirmed_call",
  });
}
