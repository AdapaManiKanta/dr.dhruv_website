-- ══════════════════════════════════════════════════════════════
-- Expert Physio Care — Supabase Schema
-- Run this SQL in: Supabase Dashboard → SQL Editor → New Query
-- ══════════════════════════════════════════════════════════════

-- 1. PROFILES (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name  text NOT NULL,
  role       text NOT NULL CHECK (role IN ('admin','therapist','patient')) DEFAULT 'patient',
  phone      text,
  created_at timestamptz DEFAULT now()
);

-- Auto-create profile on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. PATIENTS
CREATE TABLE IF NOT EXISTS public.patients (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id            uuid REFERENCES public.profiles ON DELETE CASCADE,
  date_of_birth         date,
  medical_history       text,
  address               text,
  emergency_contact     text,
  assigned_therapist_id uuid REFERENCES public.profiles,
  created_at            timestamptz DEFAULT now()
);

-- 3. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id   uuid REFERENCES public.patients ON DELETE CASCADE,
  therapist_id uuid REFERENCES public.profiles,
  service      text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  status       text NOT NULL CHECK (status IN ('pending','confirmed','completed','cancelled')) DEFAULT 'pending',
  notes        text,
  created_at   timestamptz DEFAULT now()
);

-- 4. CONTACT SUBMISSIONS (from website form)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  phone      text,
  email      text,
  message    text NOT NULL,
  status     text NOT NULL CHECK (status IN ('new','read','replied')) DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Helper: get current user's role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES policies
CREATE POLICY "profiles_select_own"  ON public.profiles FOR SELECT USING (id = auth.uid() OR public.get_my_role() = 'admin');
CREATE POLICY "profiles_update_own"  ON public.profiles FOR UPDATE USING (id = auth.uid());

-- PATIENTS policies
CREATE POLICY "patients_admin_all"         ON public.patients FOR ALL    USING (public.get_my_role() = 'admin');
CREATE POLICY "patients_therapist_select"  ON public.patients FOR SELECT USING (public.get_my_role() = 'therapist' AND assigned_therapist_id = auth.uid());
CREATE POLICY "patients_patient_own"       ON public.patients FOR SELECT USING (profile_id = auth.uid());

-- APPOINTMENTS policies
CREATE POLICY "appts_admin_all"           ON public.appointments FOR ALL    USING (public.get_my_role() = 'admin');
CREATE POLICY "appts_therapist_select"    ON public.appointments FOR SELECT USING (public.get_my_role() = 'therapist' AND therapist_id = auth.uid());
CREATE POLICY "appts_therapist_update"    ON public.appointments FOR UPDATE USING (public.get_my_role() = 'therapist' AND therapist_id = auth.uid());
CREATE POLICY "appts_patient_own"         ON public.appointments FOR SELECT USING (
  public.get_my_role() = 'patient' AND
  patient_id IN (SELECT id FROM public.patients WHERE profile_id = auth.uid())
);

-- CONTACT SUBMISSIONS policies
-- Anyone (even unauthenticated) can insert a submission
CREATE POLICY "contacts_insert_anon"   ON public.contact_submissions FOR INSERT WITH CHECK (true);
-- Only admin can view/update
CREATE POLICY "contacts_admin_select"  ON public.contact_submissions FOR SELECT USING (public.get_my_role() = 'admin');
CREATE POLICY "contacts_admin_update"  ON public.contact_submissions FOR UPDATE USING (public.get_my_role() = 'admin');

-- ══════════════════════════════════════════════════════════════
-- SEED DATA — Add Dr. Dhruva as admin
-- ══════════════════════════════════════════════════════════════
-- After running this schema, create the admin user in:
-- Supabase Dashboard → Authentication → Users → Add User
-- Email: admin@expertphysiocare.com
-- Then run this to set their role:
-- UPDATE public.profiles SET role = 'admin', full_name = 'Dr. Dhruva' WHERE id = '<paste-user-id>';
