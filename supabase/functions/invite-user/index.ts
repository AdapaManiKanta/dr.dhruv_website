import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Verify the calling user is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    // Create admin client using service role key (auto-available in Edge Functions)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Verify calling user is admin
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401, headers: corsHeaders });

    const { data: profile } = await supabaseAdmin
      .from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Admin only" }), { status: 403, headers: corsHeaders });
    }

    // Parse request body
    const { email, full_name, role, phone, address, medical_history, emergency_contact, assigned_therapist_id, amount, condition_summary } = await req.json();

    if (!email || !full_name || !role) {
      return new Response(JSON.stringify({ error: "email, full_name, role required" }), { status: 400, headers: corsHeaders });
    }

    // 1. Invite user — Supabase sends the invite email automatically
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { full_name, role },
      redirectTo: `${req.headers.get("origin") ?? "http://localhost:8083"}/reset-password`,
    });

    if (inviteError) throw inviteError;

    const userId = inviteData.user.id;

    // 2. Profile is auto-created by trigger — update role & name
    await supabaseAdmin.from("profiles").upsert({
      id:        userId,
      full_name: full_name.trim(),
      role,
      phone:     phone?.trim() || null,
    });

    // 3. If patient, create patient record
    if (role === "patient") {
      await supabaseAdmin.from("patients").insert({
        profile_id:             userId,
        address:                address?.trim()            || null,
        medical_history:        medical_history?.trim()    || null,
        emergency_contact:      emergency_contact?.trim()  || null,
        assigned_therapist_id:  assigned_therapist_id      || null,
        condition_summary:      condition_summary?.trim()  || null,
      });
    }

    return new Response(
      JSON.stringify({ success: true, user_id: userId, message: `Invite email sent to ${email}` }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
