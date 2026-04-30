import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope, CheckCircle2, Send, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CreateStaffModalProps {
  open:      boolean;
  onClose:   () => void;
  onCreated: () => void;
}

const SPECIALIZATIONS = [
  "General Physiotherapy",
  "Neurological Rehabilitation",
  "Sports Injury",
  "Paediatric Physiotherapy",
  "Orthopaedic Physiotherapy",
  "Geriatric Care",
];

const CreateStaffModal = ({ open, onClose, onCreated }: CreateStaffModalProps) => {
  const [step,   setStep]   = useState<1 | 2>(1);
  const [saving, setSaving] = useState(false);
  const [form,   setForm]   = useState({ full_name: "", email: "", phone: "", specialization: "" });
  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleCreate = async () => {
    if (!form.full_name.trim() || !form.email.trim()) {
      toast.error("Name and email are required."); return;
    }
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hyper-action`,
        {
          method: "POST",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey":        import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            email:     form.email.trim().toLowerCase(),
            full_name: form.full_name.trim(),
            role:      "therapist",
            phone:     form.phone.trim() || null,
          }),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create staff");

      setStep(2);
      onCreated();
      toast.success(`Invite sent to ${form.email}!`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setForm({ full_name: "", email: "", phone: "", specialization: "" });
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-[hsl(222,40%,10%)] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Stethoscope className="w-5 h-5 text-teal-400" /> Add New Therapist
          </DialogTitle>
          <DialogDescription className="text-white/40">
            An invite email will be sent automatically so they can set their password.
          </DialogDescription>
        </DialogHeader>

        {step === 2 ? (
          /* Success */
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Therapist Added!</h3>
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4 text-left w-full">
              <p className="text-sm font-semibold text-teal-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Invite Email Sent ✓
              </p>
              <p className="text-xs text-white/50">
                <strong className="text-white/70">{form.email}</strong> will receive an invite.
                They click the link → set password → access the Therapist Portal.
              </p>
            </div>
            <Button onClick={handleClose} className="bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30">
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-1">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Full Name *</label>
              <Input
                placeholder="Dr. First Last"
                value={form.full_name}
                onChange={e => set("full_name", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Email *</label>
              <Input
                type="email"
                placeholder="therapist@email.com"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Phone</label>
              <Input
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"
              />
            </div>

            {/* Specialization */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Specialization</label>
              <select
                value={form.specialization}
                onChange={e => set("specialization", e.target.value)}
                className="w-full h-10 rounded-xl border border-white/10 bg-white/5 text-white px-3 text-sm focus:outline-none focus:border-teal-500/50"
              >
                <option value="" className="bg-[hsl(222,47%,9%)]">— Select (optional) —</option>
                {SPECIALIZATIONS.map(s => (
                  <option key={s} value={s} className="bg-[hsl(222,47%,9%)]">{s}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="flex-1 text-white/50 hover:text-white hover:bg-white/5 border border-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={saving || !form.full_name.trim() || !form.email.trim()}
                className="flex-1 gap-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30"
              >
                {saving
                  ? <><div className="w-4 h-4 border-2 border-teal-300 border-t-transparent rounded-full animate-spin" />Adding…</>
                  : <><Send className="w-4 h-4" />Add & Send Invite</>}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateStaffModal;
