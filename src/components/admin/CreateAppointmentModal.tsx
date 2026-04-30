import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarPlus } from "lucide-react";
import { supabase, Profile, Patient } from "@/lib/supabase";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface CreateAppointmentModalProps {
  open:       boolean;
  onClose:    () => void;
  therapists: Profile[];
  patients:   Patient[];
}

const SERVICES = [
  "Home Physiotherapy","Stroke Rehabilitation","Post-Surgery Recovery",
  "Pain Relief Therapy","Elderly Care","Sports Injury Rehab",
];
const TIMES = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

const CreateAppointmentModal = ({ open, onClose, therapists, patients }: CreateAppointmentModalProps) => {
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    patient_id:   "",
    therapist_id: "",
    service:      "",
    date:         "",
    time:         "10:00",
    amount:       "1500",
    notes:        "",
  });

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  // Auto-fill therapist when patient selected
  const handlePatientChange = (pid: string) => {
    const patient = patients.find(p => p.id === pid);
    setForm(prev => ({
      ...prev,
      patient_id:   pid,
      therapist_id: patient?.assigned_therapist_id ?? prev.therapist_id,
    }));
  };

  const handleCreate = async () => {
    if (!form.patient_id || !form.therapist_id || !form.service || !form.date) {
      toast.error("Please fill in all required fields."); return;
    }

    const scheduledAt = new Date(`${form.date}T${form.time}:00`);
    if (isNaN(scheduledAt.getTime())) { toast.error("Invalid date/time."); return; }

    setSaving(true);
    const { error } = await supabase.from("appointments").insert({
      patient_id:     form.patient_id,
      therapist_id:   form.therapist_id,
      service:        form.service,
      scheduled_at:   scheduledAt.toISOString(),
      status:         "pending",
      amount:         parseFloat(form.amount) || 0,
      payment_status: "unpaid",
      notes:          form.notes.trim() || null,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Appointment created successfully!");
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
      setForm({ patient_id:"", therapist_id:"", service:"", date:"", time:"10:00", amount:"1500", notes:"" });
      onClose();
    }
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-primary" /> New Appointment
          </DialogTitle>
          <DialogDescription>Schedule a session for a patient</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Patient */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Patient *</label>
            <Select value={form.patient_id} onValueChange={handlePatientChange}>
              <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.profile?.full_name ?? p.id}
                    {p.profile?.phone ? ` — ${p.profile.phone}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Therapist */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Therapist *</label>
            <Select value={form.therapist_id} onValueChange={v => set("therapist_id", v)}>
              <SelectTrigger><SelectValue placeholder="Select therapist" /></SelectTrigger>
              <SelectContent>
                {therapists.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Service *</label>
            <Select value={form.service} onValueChange={v => set("service", v)}>
              <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
              <SelectContent>
                {SERVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date *</label>
              <Input type="date" value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => set("date", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Time *</label>
              <Select value={form.time} onValueChange={v => set("time", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIMES.map(t => (
                    <SelectItem key={t} value={t}>
                      {new Date(`2000-01-01T${t}:00`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Session Amount (₹)</label>
            <Input type="number" placeholder="1500" value={form.amount} onChange={e => set("amount", e.target.value)} />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notes (optional)</label>
            <Textarea placeholder="Any special instructions or requirements…" rows={2}
              value={form.notes} onChange={e => set("notes", e.target.value)} />
          </div>

          <div className="flex gap-3 pt-1">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button onClick={handleCreate} disabled={saving} className="flex-1 gap-2">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                : <><CalendarPlus className="w-4 h-4" />Create Appointment</>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentModal;
