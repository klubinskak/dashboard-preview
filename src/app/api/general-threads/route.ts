import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase.from("general").select("*");

    if (error) {
      console.error("Error fetching general data:", error);
      return NextResponse.json(
        { error: "Failed to fetch general data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ generalData: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
