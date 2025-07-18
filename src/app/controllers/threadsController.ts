import { supabase } from "@/lib/supabaseClient";
import { IEmailData, IGeneralData, IMalwareData, IUsersMfaData } from "@/models/models";

export async function fetchEmailData(): Promise<IEmailData[]> {
  const { data, error } = await supabase.from("email").select("*");

  if (error) {
    throw new Error("Failed to fetch email data");
  }

  return data as IEmailData[];
}


export async function fetchGeneralData(): Promise<IGeneralData[]> {
  const { data, error } = await supabase.from("general").select("*");

  if (error) {
    throw new Error("Failed to fetch general data");
  }

  return data as IGeneralData[];
}



export async function fetchMalwareData(): Promise<IMalwareData[]> {
  const { data, error } = await supabase.from("malware").select("*");

  if (error) {
    throw new Error("Failed to fetch malware data");
  }

  return data as IMalwareData[];
}


export async function fetchUserMfaData(): Promise<IUsersMfaData[]> {
  const { data, error } = await supabase.from("users_mfa").select("*");

  if (error) {
    throw new Error("Failed to fetch user MFA events");
  }

  return data as IUsersMfaData[];
}


