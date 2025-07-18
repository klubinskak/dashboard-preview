import { supabase } from "@/lib/supabaseClient";
import { IUserFailLoginData } from "@/models/models";

export async function fetchUserFailLoginData(): Promise<IUserFailLoginData[]> {
    const { data, error } = await supabase.from("user_fail_login").select("*");

  if (error) {
    throw new Error("Failed to fetch user fail login data");
  }

  return data as IUserFailLoginData[];
}