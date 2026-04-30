import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Shared DB types ──────────────────────────────────────────
export type UserRole = "admin" | "therapist" | "patient";

export interface Profile {
  id:         string;
  full_name:  string;
  role:       UserRole;
  phone:      string | null;
  created_at: string;
}

export interface Patient {
  id:                    string;
  profile_id:            string;
  date_of_birth:         string | null;
  medical_history:       string | null;
  address:               string | null;
  emergency_contact:     string | null;
  assigned_therapist_id: string | null;
  // joined fields
  profile?:     Profile;
  therapist?:   Profile;
}

export interface Appointment {
  id:           string;
  patient_id:   string;
  therapist_id: string;
  service:      string;
  scheduled_at: string;
  status:       "pending" | "confirmed" | "completed" | "cancelled";
  notes:        string | null;
  created_at:   string;
  // joined
  patient?:     { profile: Profile };
  therapist?:   Profile;
}

export interface ContactSubmission {
  id:         string;
  name:       string;
  phone:      string | null;
  email:      string | null;
  message:    string;
  status:     "new" | "read" | "replied";
  created_at: string;
}
