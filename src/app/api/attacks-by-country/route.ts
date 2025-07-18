import { fetchAttackByCountry } from "@/app/controllers/attacksController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const attackData = await fetchAttackByCountry();
    return NextResponse.json({ attackData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
