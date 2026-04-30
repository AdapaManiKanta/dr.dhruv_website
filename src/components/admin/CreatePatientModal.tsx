import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Mail, CheckCircle2, Send } from "lucide-react";
import { supabase, Profile } from "@/lib/supabase";
import { toast } from "sonner";

interface CreatePatientModalProps {
  open: boolean;
  onClose: () => void;
  therapists: Profile[];
  onCreated: () => void;
}

const CreatePatientModal = ({ open, onClose, therapists, onCreated }: CreatePatientModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name:"", email:"", phone:"", address:"", date_of_birth:"",
    condition:"", medical_history:"", emergency_contact:"",
    therapist_id:"", amount:"1500",
  });

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
            email:                 form.email.trim().toLowerCase(),
            full_name:             form.full_name.trim(),
            role:                  "patient",
            phone:                 form.phone.trim() || null,
            address:               form.address.trim() || null,
            medical_history:       form.medical_history.trim() || null,
            emergency_contact:     form.emergency_contact.trim() || null,
            assigned_therapist_id: form.therapist_id || null,
            condition_summary:     form.condition.trim() || null,
          }),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create patient");

      setStep(2);
      onCreated();
      toast.success(`Invite email sent to ${form.email}!`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setForm({ full_name:"", email:"", phone:"", address:"", date_of_birth:"", condition:"", medical_history:"", emergency_contact:"", therapist_id:"", amount:"1500" });
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(222,40%,10%)] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <UserPlus className="w-5 h-5 text-teal-400"/> Add New Patient
          </DialogTitle>
          <DialogDescription className="text-white/40">
            Fill in patient details and click Create — invite email is sent automatically.
          </DialogDescription>
        </DialogHeader>

        {step === 2 ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-teal-400"/>
            </div>
            <h3 className="text-lg font-bold text-white">Patient Created!</h3>
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4 text-left w-full">
              <p className="text-sm font-semibold text-teal-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-4 h-4"/> Invite Email Sent Automatically ✓
              </p>
              <p className="text-xs text-white/50">
                <strong className="text-white/70">{form.email}</strong> has received an invite email.
                They click the link → set their password → access their health portal.
              </p>
            </div>
            <Button onClick={handleClose} className="bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30">Done</Button>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {k:"full_name",  label:"Full Name *",      placeholder:"Patient's full name",     type:"text"},
                {k:"email",      label:"Email *",          placeholder:"patient@email.com",        type:"email"},
                {k:"phone",      label:"Phone",            placeholder:"+91 XXXXX XXXXX",          type:"text"},
                {k:"date_of_birth",label:"Date of Birth",  placeholder:"",                         type:"date"},
              ].map(f => (
                <div key={f.k} className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-white/40">{f.label}</label>
                  <Input type={f.type} placeholder={f.placeholder} value={form[f.k as keyof typeof form]}
                    onChange={e => set(f.k, e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"/>
                </div>
              ))}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Address</label>
                <Input placeholder="Area, Hyderabad" value={form.address} onChange={e => set("address", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Condition / Diagnosis</label>
                <Input placeholder="e.g. Post-stroke recovery" value={form.condition} onChange={e => set("condition", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"/>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Emergency Contact</label>
                <Input placeholder="+91 XXXXX XXXXX" value={form.emergency_contact} onChange={e => set("emergency_contact", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"/>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Medical History</label>
                <Textarea placeholder="Relevant history, allergies, medications…" rows={3} value={form.medical_history}
                  onChange={e => set("medical_history", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50 resize-none"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Assign Therapist</label>
                <Select value={form.therapist_id} onValueChange={v => set("therapist_id", v)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Select therapist"/></SelectTrigger>
                  <SelectContent className="bg-[hsl(222,47%,12%)] border-white/10">
                    {therapists.map(t => <SelectItem key={t.id} value={t.id} className="text-white hover:bg-white/5">{t.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Session Rate (₹)</label>
                <Input type="number" placeholder="1500" value={form.amount} onChange={e => set("amount", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50"/>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="ghost" onClick={handleClose} className="flex-1 text-white/50 hover:text-white hover:bg-white/5 border border-white/10">Cancel</Button>
              <Button onClick={handleCreate} disabled={saving} className="flex-1 gap-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30">
                {saving
                  ? <><div className="w-4 h-4 border-2 border-teal-300 border-t-transparent rounded-full animate-spin"/>Creating…</>
                  : <><Send className="w-4 h-4"/>Create & Send Invite</>}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePatientModal;
