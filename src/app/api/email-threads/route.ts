import { fetchEmailData } from "@/app/controllers/threadsController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const emailData = await fetchEmailData();
    return NextResponse.json({ emailData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
