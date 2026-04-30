import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Stethoscope, LogOut, Home, Bell, CheckCircle, Clock, Users, Activity, FileText, RefreshCw, Phone } from "lucide-react";
import { supabase, Appointment, Patient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const fetchSchedule = async (id:string):Promise<Appointment[]> => {
  const today=new Date();today.setHours(0,0,0,0);
  const tom=new Date(today);tom.setDate(today.getDate()+1);
  const {data,error}=await supabase.from("appointments").select(`*,patient:patients(id,address,profile:profiles!patients_profile_id_fkey(id,full_name,phone))`).eq("therapist_id",id).gte("scheduled_at",today.toISOString()).lt("scheduled_at",tom.toISOString()).order("scheduled_at",{ascending:true});
  if(error)throw error; return data??[];
};
const fetchWeek = async (id:string):Promise<Appointment[]> => {
  const today=new Date();today.setHours(0,0,0,0);
  const week=new Date(today);week.setDate(today.getDate()+7);
  const {data,error}=await supabase.from("appointments").select(`*,patient:patients(id,profile:profiles!patients_profile_id_fkey(id,full_name,phone))`).eq("therapist_id",id).gte("scheduled_at",today.toISOString()).lt("scheduled_at",week.toISOString()).order("scheduled_at",{ascending:true});
  if(error)throw error; return data??[];
};
const fetchPatients = async (id:string):Promise<Patient[]> => {
  const {data,error}=await supabase.from("patients").select(`*,profile:profiles!patients_profile_id_fkey(id,full_name,phone)`).eq("assigned_therapist_id",id).order("created_at",{ascending:false});
  if(error)throw error; return data??[];
};
const fetchStats = async (id:string) => {
  const today=new Date();today.setHours(0,0,0,0);
  const tom=new Date(today);tom.setDate(today.getDate()+1);
  const [{count:t},{count:p},{count:d}]=await Promise.all([
    supabase.from("appointments").select("*",{count:"exact",head:true}).eq("therapist_id",id).gte("scheduled_at",today.toISOString()).lt("scheduled_at",tom.toISOString()),
    supabase.from("patients").select("*",{count:"exact",head:true}).eq("assigned_therapist_id",id),
    supabase.from("appointments").select("*",{count:"exact",head:true}).eq("therapist_id",id).eq("status","completed"),
  ]);
  return {today:t??0,patients:p??0,done:d??0};
};

const fmtTime=(iso:string)=>new Date(iso).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
const fmtDate=(iso:string)=>new Date(iso).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"});

const statusCls:Record<string,string>={confirmed:"bg-emerald-500/20 text-emerald-400 border-emerald-500/30",pending:"bg-amber-500/20 text-amber-400 border-amber-500/30",completed:"bg-sky-500/20 text-sky-400 border-sky-500/30",cancelled:"bg-red-500/20 text-red-400 border-red-500/30"};

const TherapistDashboard = () => {
  const navigate=useNavigate();
  const {profile,logout}=useAuth();
  const qc=useQueryClient();
  const tid=profile?.id??"";
  const [notePid,setNotePid]=useState("");
  const [noteText,setNoteText]=useState("");
  const [sType,setSType]=useState("Regular Session");

  const {data:stats}=useQuery({queryKey:["th-stats",tid],queryFn:()=>fetchStats(tid),enabled:!!tid});
  const {data:schedule,isLoading:sL,refetch:rS}=useQuery({queryKey:["th-schedule",tid],queryFn:()=>fetchSchedule(tid),enabled:!!tid});
  const {data:week,isLoading:wL}=useQuery({queryKey:["th-week",tid],queryFn:()=>fetchWeek(tid),enabled:!!tid});
  const {data:patients,isLoading:pL}=useQuery({queryKey:["th-patients",tid],queryFn:()=>fetchPatients(tid),enabled:!!tid});

  const complete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("appointments").update({ status: "completed" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["th-schedule", tid] });
      qc.invalidateQueries({ queryKey: ["th-stats", tid] });
      toast.success("Session completed!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      if (!notePid || !noteText.trim()) throw new Error("Select patient & write note");
      const { data: a, error: fe } = await supabase
        .from("appointments").select("id,notes")
        .eq("therapist_id", tid).eq("patient_id", notePid)
        .order("scheduled_at", { ascending: false }).limit(1);
      if (fe) throw fe;
      if (!a?.length) throw new Error("No appointment found");
      const ts = new Date().toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
      const updated = `${a[0].notes ?? ""}\n[${ts}] ${sType}: ${noteText.trim()}`.trim();
      const { error } = await supabase.from("appointments").update({ notes: updated }).eq("id", a[0].id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Note saved!"); setNoteText(""); },
    onError: (e: Error) => toast.error(e.message),
  });

  const Spinner=()=><div className="flex justify-center py-12"><div className="w-7 h-7 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin"/></div>;

  const SessionCard=({a}:{a:Appointment})=>(
    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors flex-wrap">
      <div className="flex-shrink-0 text-center min-w-[52px]">
        <p className="text-teal-400 font-bold text-lg leading-none">{fmtTime(a.scheduled_at)}</p>
        <p className="text-white/30 text-xs mt-0.5">{fmtDate(a.scheduled_at)}</p>
      </div>
      <div className="w-px h-10 bg-white/10 hidden sm:block flex-shrink-0"/>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">{a.patient?.profile?.full_name??"—"}</p>
        <p className="text-white/40 text-xs mt-0.5">{a.service}{a.patient?.address?` · ${a.patient.address}`:""}</p>
        {a.patient?.profile?.phone&&<a href={`tel:${a.patient.profile.phone}`} className="text-teal-400/70 hover:text-teal-400 text-xs flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/>{a.patient.profile.phone}</a>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-xs px-2.5 py-0.5 rounded-full border ${statusCls[a.status]??""}`}>{a.status}</span>
        {a.status!=="completed"&&a.status!=="cancelled"&&(
          <Button size="sm" className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs gap-1 h-7" onClick={()=>complete.mutate(a.id)} disabled={complete.isPending}>
            <CheckCircle className="w-3 h-3"/>Done
          </Button>
        )}
      </div>
    </div>
  );

  return(
    <div className="min-h-screen" style={{background:"linear-gradient(135deg,hsl(222,47%,6%) 0%,hsl(220,40%,9%) 50%,hsl(222,47%,6%) 100%)"}}>
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{background:"hsl(222,47%,7%/0.8)"}}>
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-teal-400"/>
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Therapist Portal</h1>
              <p className="text-xs text-white/40">{profile?.full_name??""}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5"><Bell className="w-4 h-4"/></Button>
            <Button variant="ghost" size="sm" onClick={()=>navigate("/")} className="text-white/50 hover:text-white hover:bg-white/5 gap-1.5 hidden sm:flex"><Home className="w-4 h-4"/>Site</Button>
            <Button size="sm" onClick={async()=>{await logout();navigate("/login");}} className="gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10"><LogOut className="w-4 h-4"/>Logout</Button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Welcome back, {profile?.full_name??""} 👋</h2>
          <p className="text-white/40 text-sm mt-1">Your schedule for {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[{label:"Today",value:stats?.today??0,icon:Clock,glow:"teal" as const,accent:"text-teal-400"},{label:"My Patients",value:stats?.patients??0,icon:Users,glow:"gold" as const,accent:"text-amber-400"},{label:"Completed",value:stats?.done??0,icon:CheckCircle,glow:"green" as const,accent:"text-emerald-400"}].map(s=>(
            <GlowCard key={s.label} glowColor={s.glow} customSize className="p-4 flex flex-col gap-2">
              <s.icon className={`w-5 h-5 ${s.accent}`}/>
              <p className={`text-2xl font-bold ${s.accent}`}>{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </GlowCard>
          ))}
        </div>

        <Tabs defaultValue="today">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto gap-1">
            {["today","week","patients","notes"].map(t=>(
              <TabsTrigger key={t} value={t} className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-300 data-[state=active]:border data-[state=active]:border-teal-500/30 text-white/50 rounded-lg px-4 py-2 text-sm capitalize hover:text-white/80">{t==="today"?"Today":t==="week"?"This Week":t==="patients"?"My Patients":"Notes"}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="today" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-teal-400"/>Today's Sessions</h3>
                <Button variant="ghost" size="sm" onClick={()=>rS()} className="text-white/40 hover:text-white hover:bg-white/5 border border-white/10"><RefreshCw className="w-4 h-4"/></Button>
              </div>
              {sL?<Spinner/>:(schedule??[]).length===0?<div className="text-center py-10"><Activity className="w-10 h-10 text-white/10 mx-auto mb-3"/><p className="text-white/30 text-sm">No sessions today.</p></div>:<div className="space-y-3">{(schedule??[]).map(a=><SessionCard key={a.id} a={a}/>)}</div>}
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-teal-400"/>Next 7 Days</h3>
              {wL?<Spinner/>:(week??[]).length===0?<p className="text-white/30 text-sm text-center py-8">Nothing scheduled this week.</p>:<div className="space-y-3">{(week??[]).map(a=><SessionCard key={a.id} a={a}/>)}</div>}
            </div>
          </TabsContent>

          <TabsContent value="patients" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><Users className="w-4 h-4 text-teal-400"/>My Patients ({patients?.length??0})</h3>
              {pL?<Spinner/>:(patients??[]).length===0?<p className="text-white/30 text-sm text-center py-8">No patients assigned yet.</p>:
                <div className="grid sm:grid-cols-2 gap-3">
                  {(patients??[]).map(p=>(
                    <GlowCard key={p.id} glowColor="teal" customSize className="p-4 flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-300 font-bold flex-shrink-0">{p.profile?.full_name?.charAt(0)??"P"}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold text-sm truncate">{p.profile?.full_name??"—"}</p>
                        {p.profile?.phone&&<a href={`tel:${p.profile.phone}`} className="text-teal-400/60 hover:text-teal-400 text-xs flex items-center gap-1"><Phone className="w-3 h-3"/>{p.profile.phone}</a>}
                        {p.medical_history&&<p className="text-white/30 text-xs mt-0.5 truncate">{p.medical_history}</p>}
                      </div>
                    </GlowCard>
                  ))}
                </div>}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><FileText className="w-4 h-4 text-teal-400"/>Add Treatment Note</h3>
              <div className="space-y-4 max-w-lg">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Patient</label>
                  <select className="w-full h-10 rounded-xl border border-white/10 bg-white/5 text-white px-3 text-sm focus:outline-none focus:border-teal-500/50" value={notePid} onChange={e=>setNotePid(e.target.value)}>
                    <option value="" className="bg-[hsl(222,47%,9%)]">— Select patient —</option>
                    {(patients??[]).map(p=><option key={p.id} value={p.id} className="bg-[hsl(222,47%,9%)]">{p.profile?.full_name??p.id}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Session Type</label>
                  <select className="w-full h-10 rounded-xl border border-white/10 bg-white/5 text-white px-3 text-sm focus:outline-none focus:border-teal-500/50" value={sType} onChange={e=>setSType(e.target.value)}>
                    {["Regular Session","Initial Assessment","Follow-up","Discharge Note"].map(t=><option key={t} className="bg-[hsl(222,47%,9%)]">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Notes</label>
                  <Textarea placeholder="Describe session, exercises, patient response…" rows={5} value={noteText} onChange={e=>setNoteText(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none focus:border-teal-500/50 rounded-xl"/>
                </div>
                <Button onClick={()=>saveNote.mutate()} disabled={saveNote.isPending||!notePid||!noteText.trim()} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 gap-2">
                  {saveNote.isPending?<><div className="w-4 h-4 border-2 border-teal-300 border-t-transparent rounded-full animate-spin"/>Saving…</>:<><FileText className="w-4 h-4"/>Save Note</>}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TherapistDashboard;
