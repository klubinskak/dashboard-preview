import { fetchSecurityEvents } from "@/app/controllers/securityEventsController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const securityEvents = await fetchSecurityEvents();
    return NextResponse.json({ securityEvents }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
