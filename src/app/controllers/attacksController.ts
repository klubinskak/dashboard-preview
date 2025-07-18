import { supabase } from "@/lib/supabaseClient";
import { IAttackByCountry } from "@/models/models";

export async function fetchAttackByCountry(): Promise<{
  [key: string]: IAttackByCountry;
}> {
  const { data, error } = await supabase.from("attacks_by_country").select("*");

  if (error) {
    throw new Error("Failed to fetch attack by country data");
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
        long: item.long || 0,
      };
      return acc;
    },
    {} as { [key: string]: IAttackByCountry }
  );

  return countryData as { [key: string]: IAttackByCountry };
}
