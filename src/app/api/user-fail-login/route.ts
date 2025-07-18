import { fetchUserFailLoginData } from "@/app/controllers/userInfoController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
     const userFailLogin = await fetchUserFailLoginData();
     return NextResponse.json({ userFailLogin }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
