export interface IEmailData {
  id: number;
  category: string;
  threat_count: number;
}

export interface IMalwareData {
  id: number;
  category: string;
  threat_count: number;
}

export interface IGeneralData {
  id: number;
  category: string;
  threat_count: number;
}

export interface IUsersMfaData {
  id: number;
  category: string;
  threat_count: number;
}

export interface IUserFailLoginData {
  id: number;
  user: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
}

export interface IAttackByCountry {
  id: number;
  country: string;
  hour: number;
  day: number;
  lat: number;
  long?: number;
}
