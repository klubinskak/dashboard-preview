import { supabase } from "@/lib/supabaseClient";
import { IAttackByCountry } from "@/models/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("attacks_by_country")
      .select("*");

    if (error) {
      console.error("Error fetching attacks by country data:", error);
      return NextResponse.json(
        { error: "Failed to fetch attacks by country data" },
        { status: 500 }
      );
    }

    const countryData: { [key: string]: IAttackByCountry } = data.reduce(
      (acc: { [key: string]: IAttackByCountry }, item: IAttackByCountry) => {
        const countryName = item.country;

        if (!countryName) return acc;

        acc[countryName] = {
          id: item.id,
          country: countryName,
          hour: item.hour || 0,
          day: item.day || 0,
          lat: item.lat || 0,
          long:  item.long || 0,
        };
        return acc;
      },
      {} as { [key: string]: IAttackByCountry }
    );

    return NextResponse.json({
      countryData: countryData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
