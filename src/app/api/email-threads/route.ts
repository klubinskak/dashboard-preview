import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase.from("email").select("*");

    if (error) {
      console.error("Error fetching email data:", error);
      return NextResponse.json(
        { error: "Failed to fetch email data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ emailData: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
