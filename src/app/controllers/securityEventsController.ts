import { supabase } from "@/lib/supabaseClient";
import { ISecurityEvent } from "@/models/models";

export async function fetchSecurityEvents(): Promise<ISecurityEvent[]> {
  const { data, error } = await supabase.from("security_events").select("*");

  if (error) {
    throw new Error("Failed to fetch security events");
  }

  return data as ISecurityEvent[];
}