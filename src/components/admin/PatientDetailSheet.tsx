import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Phone, MapPin, Calendar, FileText, User,
  Stethoscope, CreditCard, Clock, Edit2, Check
} from "lucide-react";
import { supabase, Patient, Profile, Appointment } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PatientDetailSheetProps {
  patient:    Patient | null;
  open:       boolean;
  onClose:    () => void;
  therapists: Profile[];
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

const statusColor: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800 border-green-200",
  pending:   "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const PatientDetailSheet = ({ patient, open, onClose, therapists }: PatientDetailSheetProps) => {
  const qc = useQueryClient();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState(false);
  const [newTherapistId, setNewTherapistId]     = useState("");
  const [savingTherapist, setSavingTherapist]   = useState(false);

  useEffect(() => {
    if (patient?.id && open) {
      setLoadingAppts(true);
      supabase
        .from("appointments")
        .select(`*, therapist:profiles!appointments_therapist_id_fkey(id, full_name)`)
        .eq("patient_id", patient.id)
        .order("scheduled_at", { ascending: false })
        .then(({ data }) => {
          setAppointments(data ?? []);
          setLoadingAppts(false);
        });
    }
  }, [patient?.id, open]);

  const reassignTherapist = async () => {
    if (!patient || !newTherapistId) return;
    setSavingTherapist(true);
    const { error } = await supabase
      .from("patients")
      .update({ assigned_therapist_id: newTherapistId })
      .eq("id", patient.id);

    if (error) { toast.error(error.message); }
    else {
      toast.success("Therapist reassigned!");
      qc.invalidateQueries({ queryKey: ["patients"] });
      setEditingTherapist(false);
    }
    setSavingTherapist(false);
  };

  const markPaid = async (apptId: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ payment_status: "paid" })
      .eq("id", apptId);

    if (error) { toast.error(error.message); }
    else {
      toast.success("Marked as paid");
      setAppointments(prev =>
        prev.map(a => a.id === apptId ? { ...a, payment_status: "paid" } : a)
      );
      qc.invalidateQueries({ queryKey: ["stats"] });
    }
  };

  if (!patient) return null;

  const totalRevenue = appointments
    .filter(a => a.payment_status === "paid")
    .reduce((sum, a) => sum + (a.amount ?? 0), 0);

  const completedCount = appointments.filter(a => a.status === "completed").length;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/5 p-6 border-b">
          <SheetHeader>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                {patient.profile?.full_name?.charAt(0) ?? "P"}
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-lg font-bold">{patient.profile?.full_name ?? "Patient"}</SheetTitle>
                {patient.condition_summary && (
                  <p className="text-sm text-muted-foreground mt-0.5">{patient.condition_summary}</p>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">{completedCount} sessions</Badge>
                  <Badge variant="outline" className="text-xs text-green-700 border-green-300">₹{totalRevenue.toLocaleString("en-IN")} collected</Badge>
                </div>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Contact</h3>
            <div className="space-y-2">
              {patient.profile?.phone && (
                <a href={`tel:${patient.profile.phone}`} className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-muted-foreground" /> {patient.profile.phone}
                </a>
              )}
              {patient.address && (
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {patient.address}
                </div>
              )}
              {patient.emergency_contact && (
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> Emergency: {patient.emergency_contact}
                </div>
              )}
            </div>
          </section>

          {/* Assigned Therapist */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Assigned Therapist</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <Stethoscope className="w-4 h-4 text-primary" />
                {editingTherapist ? (
                  <Select value={newTherapistId} onValueChange={setNewTherapistId}>
                    <SelectTrigger className="h-8 flex-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {therapists.map(t => <SelectItem key={t.id} value={t.id}>{t.full_name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm font-medium">{patient.therapist?.full_name ?? "Unassigned"}</span>
                )}
              </div>
              {editingTherapist ? (
                <div className="flex gap-1.5">
                  <Button size="sm" onClick={reassignTherapist} disabled={savingTherapist || !newTherapistId}>
                    <Check className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingTherapist(false)}>Cancel</Button>
                </div>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => { setEditingTherapist(true); setNewTherapistId(patient.assigned_therapist_id ?? ""); }}>
                  <Edit2 className="w-3.5 h-3.5 mr-1" /> Change
                </Button>
              )}
            </div>
          </section>

          {/* Medical History */}
          {patient.medical_history && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Medical History</h3>
              <div className="p-3 rounded-lg bg-muted/50 text-sm text-foreground/80 leading-relaxed">
                {patient.medical_history}
              </div>
            </section>
          )}

          {/* Appointments Timeline */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Appointments ({appointments.length})
            </h3>
            {loadingAppts ? (
              <div className="flex justify-center py-6">
                <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No appointments yet.</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {appointments.map(a => (
                  <div key={a.id} className="p-3 rounded-xl border bg-card space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{a.service}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {fmtDate(a.scheduled_at)}
                        </p>
                        {a.therapist?.full_name && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <User className="w-3 h-3" /> {a.therapist.full_name}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[a.status] ?? ""}`}>
                          {a.status}
                        </span>
                        {a.amount && a.amount > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold">₹{a.amount}</span>
                            {a.payment_status === "paid" ? (
                              <span className="text-xs text-green-600 flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Paid
                              </span>
                            ) : (
                              <Button size="sm" variant="outline"
                                className="h-5 text-xs px-1.5 text-orange-600 border-orange-300"
                                onClick={() => markPaid(a.id)}>
                                <CreditCard className="w-3 h-3 mr-1" /> Mark Paid
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {a.notes && (
                      <div className="flex items-start gap-1.5 p-2 rounded-lg bg-muted/50">
                        <FileText className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{a.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PatientDetailSheet;
