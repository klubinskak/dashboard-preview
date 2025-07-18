import { fetchGeneralData } from "@/app/controllers/threadsController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const generalData = await fetchGeneralData();
    return NextResponse.json({ generalData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
