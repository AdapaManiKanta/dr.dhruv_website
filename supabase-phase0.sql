-- ══════════════════════════════════════════════════════════
-- Phase 0 — Additional Columns
-- Run in Supabase SQL Editor AFTER the main schema
-- ══════════════════════════════════════════════════════════

-- Payment tracking on appointments
ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS payment_status text
    CHECK (payment_status IN ('unpaid','paid','waived')) DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS amount numeric(10,2) DEFAULT 0;

-- Patient extras
ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS condition_summary text,
  ADD COLUMN IF NOT EXISTS total_sessions int DEFAULT 0;

-- Pending user invitations (used by admin dashboard)
CREATE TABLE IF NOT EXISTS public.pending_invites (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL UNIQUE,
  full_name   text NOT NULL,
  role        text NOT NULL CHECK (role IN ('therapist','patient')),
  phone       text,
  created_by  uuid REFERENCES public.profiles,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.pending_invites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "invites_admin_all" ON public.pending_invites
  FOR ALL USING (public.get_my_role() = 'admin');

-- Allow admin to insert profiles for new therapists
CREATE POLICY "admin_insert_profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');

-- Allow admin to update any profile
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE USING (id = auth.uid() OR public.get_my_role() = 'admin');

-- Allow admin to insert patients
CREATE POLICY "admin_insert_patients" ON public.patients
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "admin_update_patients" ON public.patients
  FOR UPDATE USING (public.get_my_role() = 'admin');

-- Therapist can update their own patient's session data
CREATE POLICY "therapist_update_patients" ON public.patients
  FOR UPDATE USING (
    public.get_my_role() = 'therapist'
    AND assigned_therapist_id = auth.uid()
  );

-- Admin can update/insert appointments
CREATE POLICY "admin_insert_appts" ON public.appointments
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');
