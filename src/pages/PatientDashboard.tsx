import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Heart, LogOut, Home, Bell, Calendar, Phone, MessageSquare, User, CalendarPlus, CheckCircle2, Clock, Save, Stethoscope, FileText, ChevronRight } from "lucide-react";
import { supabase, Appointment, Patient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const fetchMyAppointments=async(profileId:string):Promise<Appointment[]>=>{
  const {data:pd}=await supabase.from("patients").select("id").eq("profile_id",profileId).single();
  if(!pd)return[];
  const {data,error}=await supabase.from("appointments").select(`*,therapist:profiles!appointments_therapist_id_fkey(id,full_name,phone)`).eq("patient_id",pd.id).order("scheduled_at",{ascending:false});
  if(error)throw error; return data??[];
};
const fetchMyRecord=async(profileId:string):Promise<Patient|null>=>{
  const {data}=await supabase.from("patients").select(`*,profile:profiles!patients_profile_id_fkey(id,full_name,phone),therapist:profiles!patients_assigned_therapist_id_fkey(id,full_name,phone)`).eq("profile_id",profileId).single();
  return data??null;
};

const fmtDate=(iso:string)=>new Date(iso).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});
const SERVICES=["Home Physiotherapy","Stroke Rehabilitation","Post-Surgery Recovery","Pain Relief Therapy","Elderly Care","Sports Injury Rehab"];
const TIMES=["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];
const statusCls:Record<string,string>={confirmed:"bg-emerald-500/20 text-emerald-400 border-emerald-500/30",pending:"bg-amber-500/20 text-amber-400 border-amber-500/30",completed:"bg-sky-500/20 text-sky-400 border-sky-500/30",cancelled:"bg-red-500/20 text-red-400 border-red-500/30"};

const PatientDashboard=()=>{
  const navigate=useNavigate();
  const {profile,logout}=useAuth();
  const qc=useQueryClient();
  const pid=profile?.id??"";
  const [service,setService]=useState("");
  const [date,setDate]=useState("");
  const [time,setTime]=useState("10:00");
  const [notes,setNotes]=useState("");
  const [editPhone,setEditPhone]=useState(profile?.phone??"");
  const [editAddr,setEditAddr]=useState("");
  const [saving,setSaving]=useState(false);

  const {data:appts,isLoading:aL}=useQuery({queryKey:["pt-appts",pid],queryFn:()=>fetchMyAppointments(pid),enabled:!!pid});
  const {data:rec}=useQuery({queryKey:["pt-rec",pid],queryFn:()=>fetchMyRecord(pid),enabled:!!pid,onSuccess:(d)=>{if(d?.address)setEditAddr(d.address);}});

  const book=useMutation({
    mutationFn:async()=>{
      if(!service||!date||!time)throw new Error("Fill all fields");
      const dt=new Date(`${date}T${time}:00`);
      if(rec){const {error}=await supabase.from("appointments").insert({patient_id:rec.id,therapist_id:rec.assigned_therapist_id,service,scheduled_at:dt.toISOString(),status:"pending",notes:notes.trim()||null});if(error)throw error;}
      else{const {error}=await supabase.from("contact_submissions").insert({name:profile?.full_name??"Patient",phone:profile?.phone??null,message:`Appointment: ${service} on ${date} at ${time}. ${notes}`.trim(),status:"new"});if(error)throw error;}
    },
    onSuccess:()=>{toast.success(rec?"Session requested! We'll confirm soon.":"We'll call to schedule your session.");setService("");setDate("");setTime("10:00");setNotes("");qc.invalidateQueries({queryKey:["pt-appts",pid]});},
    onError:(e:Error)=>toast.error(e.message),
  });

  const saveProfile=async()=>{
    setSaving(true);
    const {error}=await supabase.from("profiles").update({phone:editPhone.trim()||null}).eq("id",pid);
    if(!error&&rec)await supabase.from("patients").update({address:editAddr.trim()||null}).eq("id",rec.id);
    if(error)toast.error(error.message);else toast.success("Profile saved!");
    setSaving(false);
  };

  const upcoming=(appts??[]).filter(a=>a.status==="confirmed"||a.status==="pending");
  const completed=(appts??[]).filter(a=>a.status==="completed");
  const Spinner=()=><div className="flex justify-center py-10"><div className="w-7 h-7 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin"/></div>;

  return(
    <div className="min-h-screen" style={{background:"linear-gradient(135deg,hsl(222,47%,6%) 0%,hsl(220,40%,9%) 50%,hsl(222,47%,6%) 100%)"}}>
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{background:"hsl(222,47%,7%/0.8)"}}>
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center"><Heart className="w-5 h-5 text-pink-400"/></div>
            <div><h1 className="text-base font-bold text-white">My Health Portal</h1><p className="text-xs text-white/40">{profile?.full_name??""}</p></div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5"><Bell className="w-4 h-4"/></Button>
            <Button variant="ghost" size="sm" onClick={()=>navigate("/")} className="text-white/50 hover:text-white hover:bg-white/5 gap-1.5 hidden sm:flex"><Home className="w-4 h-4"/>Site</Button>
            <Button size="sm" onClick={async()=>{await logout();navigate("/login");}} className="gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10"><LogOut className="w-4 h-4"/>Logout</Button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Hi, {profile?.full_name?.split(" ")[0]??""} 👋</h2>
          <p className="text-white/40 text-sm mt-1">Track your physio sessions and book new appointments.</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlowCard glowColor="teal" customSize className="p-4 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onClick={()=>{}}>
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0"><Calendar className="w-5 h-5 text-teal-400"/></div>
            <div><p className="text-white font-medium text-sm">Upcoming</p><p className="text-teal-400 font-bold text-xl">{upcoming.length}</p></div>
          </GlowCard>
          <GlowCard glowColor="green" customSize className="p-4 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onClick={()=>window.open("tel:+919110786670")}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-emerald-400"/></div>
            <div><p className="text-white font-medium text-sm">Call Clinic</p><p className="text-white/40 text-xs">+91 91107 86670</p></div>
          </GlowCard>
          <GlowCard glowColor="green" customSize className="p-4 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform" onClick={()=>window.open("https://wa.me/919110786670")}>
            <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0"><MessageSquare className="w-5 h-5 text-green-400"/></div>
            <div><p className="text-white font-medium text-sm">WhatsApp</p><p className="text-white/40 text-xs">Chat with us</p></div>
          </GlowCard>
        </div>

        {/* Assigned therapist */}
        {rec?.therapist&&(
          <GlowCard glowColor="purple" customSize className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-300 font-bold text-lg flex-shrink-0">{rec.therapist.full_name?.charAt(0)??"T"}</div>
            <div className="flex-1 min-w-0"><p className="text-white/40 text-xs">Your assigned therapist</p><p className="text-white font-bold">{rec.therapist.full_name}</p></div>
            {rec.therapist.phone&&<Button asChild size="sm" className="bg-violet-500/20 text-violet-300 border border-violet-500/30 hover:bg-violet-500/30 gap-1 flex-shrink-0"><a href={`tel:${rec.therapist.phone}`}><Phone className="w-3.5 h-3.5"/>Call</a></Button>}
          </GlowCard>
        )}

        <Tabs defaultValue="sessions">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto gap-1">
            {[["sessions","My Sessions"],["book","Book Session"],["progress","Progress"],["profile","Profile"]].map(([v,l])=>(
              <TabsTrigger key={v} value={v} className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-300 data-[state=active]:border data-[state=active]:border-teal-500/30 text-white/50 rounded-lg px-3 py-2 text-sm hover:text-white/80">{l}</TabsTrigger>
            ))}
          </TabsList>

          {/* Sessions */}
          <TabsContent value="sessions" className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-teal-400"/>Upcoming Sessions</h3>
              {aL?<Spinner/>:upcoming.length===0?<p className="text-white/30 text-sm text-center py-6">No upcoming sessions. Book one!</p>:
                <div className="space-y-3">{upcoming.map(a=>(
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/3 flex-wrap gap-3">
                    <div><p className="text-white font-semibold text-sm">{a.service}</p><p className="text-white/40 text-xs mt-0.5">{a.therapist?.full_name??"—"}</p><p className="text-white/30 text-xs">{fmtDate(a.scheduled_at)}</p></div>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${statusCls[a.status]??""}`}>{a.status}</span>
                  </div>
                ))}</div>}
            </div>
            {completed.length>0&&(
              <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
                <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><CheckCircle2 className="w-4 h-4 text-emerald-400"/>Session History ({completed.length})</h3>
                <div className="space-y-2">{completed.map(a=>(
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/2 flex-wrap gap-2">
                    <div><p className="text-white/70 font-medium text-sm">{a.service}</p><p className="text-white/30 text-xs">{a.therapist?.full_name} · {fmtDate(a.scheduled_at)}</p>{a.notes&&<p className="text-white/25 text-xs mt-1 italic">"{a.notes.split("\n").pop()}"</p>}</div>
                    <span className="text-xs text-emerald-400 border border-emerald-500/30 rounded-full px-2.5 py-0.5">Done</span>
                  </div>
                ))}</div>
              </div>
            )}
          </TabsContent>

          {/* Book */}
          <TabsContent value="book" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-1"><CalendarPlus className="w-4 h-4 text-teal-400"/>Book a Session</h3>
              <p className="text-white/30 text-xs mb-5">{rec?"Request confirmed within 24 hours.":"We'll call to schedule your appointment."}</p>
              <div className="space-y-4 max-w-lg">
                <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Service</label>
                  <Select value={service} onValueChange={setService}><SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Select service"/></SelectTrigger><SelectContent className="bg-[hsl(222,47%,12%)] border-white/10">{SERVICES.map(s=><SelectItem key={s} value={s} className="text-white hover:bg-white/5">{s}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Date</label><Input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={e=>setDate(e.target.value)} className="bg-white/5 border-white/10 text-white"/></div>
                  <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Time</label>
                    <Select value={time} onValueChange={setTime}><SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue/></SelectTrigger><SelectContent className="bg-[hsl(222,47%,12%)] border-white/10">{TIMES.map(t=><SelectItem key={t} value={t} className="text-white hover:bg-white/5">{new Date(`2000-01-01T${t}:00`).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</SelectItem>)}</SelectContent></Select>
                  </div>
                </div>
                <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Notes (optional)</label><Input placeholder="Any special requirements…" value={notes} onChange={e=>setNotes(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20"/></div>
                <Button onClick={()=>book.mutate()} disabled={book.isPending||!service||!date||!time} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 gap-2">
                  {book.isPending?<><div className="w-4 h-4 border-2 border-teal-300 border-t-transparent rounded-full animate-spin"/>Requesting…</>:<><CalendarPlus className="w-4 h-4"/>Request Appointment</>}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Progress */}
          <TabsContent value="progress" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><FileText className="w-4 h-4 text-teal-400"/>Treatment Notes</h3>
              {completed.filter(a=>a.notes).length===0?<div className="text-center py-10"><FileText className="w-10 h-10 text-white/10 mx-auto mb-3"/><p className="text-white/30 text-sm">No treatment notes yet.</p></div>:
                <div className="space-y-3">{completed.filter(a=>a.notes).map(a=>(
                  <div key={a.id} className="p-4 rounded-xl border border-white/8 bg-white/3">
                    <div className="flex items-center gap-2 mb-2"><p className="text-white/50 text-xs">{fmtDate(a.scheduled_at)}</p><span className="text-xs text-sky-400 border border-sky-500/30 rounded-full px-2 py-0.5">{a.service}</span></div>
                    <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{a.notes}</p>
                  </div>
                ))}</div>}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-5"><User className="w-4 h-4 text-teal-400"/>My Profile</h3>
              <div className="space-y-4 max-w-lg">
                <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Full Name</label><Input value={profile?.full_name??""} disabled className="bg-white/5 border-white/5 text-white/50 cursor-not-allowed"/></div>
                <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Phone</label><Input placeholder="+91 XXXXX XXXXX" value={editPhone} onChange={e=>setEditPhone(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20"/></div>
                <div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Address</label><Input placeholder="Your area in Hyderabad…" value={editAddr} onChange={e=>setEditAddr(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20"/></div>
                {rec?.medical_history&&<div className="space-y-1.5"><label className="text-xs text-white/50 uppercase tracking-wide font-semibold">Medical History (set by therapist)</label><Input value={rec.medical_history} disabled className="bg-white/5 border-white/5 text-white/40 cursor-not-allowed"/></div>}
                <Button onClick={saveProfile} disabled={saving} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 gap-2">
                  {saving?<><div className="w-4 h-4 border-2 border-teal-300 border-t-transparent rounded-full animate-spin"/>Saving…</>:<><Save className="w-4 h-4"/>Save Profile</>}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientDashboard;
