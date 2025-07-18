import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase.from("user_fail_login").select("*");

    if (error) {
      console.error("Error fetching user fail login data:", error);
      return NextResponse.json(
        { error: "Failed to fetch user fail login data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ userFailLogin: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
