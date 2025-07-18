import { fetchUserMfaData } from "@/app/controllers/threadsController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userMfa = await fetchUserMfaData();
    return NextResponse.json({ userMfa }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
