import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GlowCard } from "@/components/ui/spotlight-card";
import {
  Users, Calendar, LogOut, Home, CheckCircle, XCircle, UserCheck,
  Activity, MessageSquare, Search, RefreshCw, Plus, CreditCard,
  ChevronRight, Stethoscope, Bell, BarChart3
} from "lucide-react";
import { supabase, Appointment, Patient, ContactSubmission, Profile } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import CreatePatientModal    from "@/components/admin/CreatePatientModal";
import CreateAppointmentModal from "@/components/admin/CreateAppointmentModal";
import PatientDetailSheet    from "@/components/admin/PatientDetailSheet";
import AnalyticsTab          from "@/components/admin/AnalyticsTab";
import CreateStaffModal      from "@/components/admin/CreateStaffModal";

const fetchTherapists  = async (): Promise<Profile[]>           => { const { data } = await supabase.from("profiles").select("*").eq("role","therapist").order("full_name"); return data??[]; };
const fetchAppointments = async (): Promise<Appointment[]>       => { const { data, error } = await supabase.from("appointments").select(`*, therapist:profiles!appointments_therapist_id_fkey(id,full_name), patient:patients(id,profile:profiles!patients_profile_id_fkey(id,full_name,phone))`).order("scheduled_at",{ascending:false}).limit(100); if(error)throw error; return data??[]; };
const fetchPatients     = async (): Promise<Patient[]>           => { const { data, error } = await supabase.from("patients").select(`*, profile:profiles!patients_profile_id_fkey(id,full_name,phone,role), therapist:profiles!patients_assigned_therapist_id_fkey(id,full_name)`).order("created_at",{ascending:false}); if(error)throw error; return data??[]; };
const fetchContacts     = async (): Promise<ContactSubmission[]> => { const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at",{ascending:false}); if(error)throw error; return data??[]; };
const fetchStats        = async ()                               => { const [{ count: p },{ count: a },{ count: l },{ count: u }] = await Promise.all([supabase.from("patients").select("*",{count:"exact",head:true}),supabase.from("appointments").select("*",{count:"exact",head:true}).eq("status","confirmed").gte("scheduled_at",new Date().toISOString().split("T")[0]),supabase.from("contact_submissions").select("*",{count:"exact",head:true}).eq("status","new"),supabase.from("appointments").select("*",{count:"exact",head:true}).eq("payment_status","unpaid").neq("status","cancelled")]); return {patients:p??0,todayAppts:a??0,newLeads:l??0,unpaid:u??0}; };

const fmtDate = (iso: string) => new Date(iso).toLocaleString("en-IN",{dateStyle:"short",timeStyle:"short"});

const StatusBadge = ({status}:{status:string}) => {
  const cls: Record<string,string> = {confirmed:"bg-emerald-500/20 text-emerald-400 border-emerald-500/30",pending:"bg-amber-500/20 text-amber-400 border-amber-500/30",completed:"bg-sky-500/20 text-sky-400 border-sky-500/30",cancelled:"bg-red-500/20 text-red-400 border-red-500/30",new:"bg-red-500/20 text-red-400 border-red-500/30",read:"bg-slate-500/20 text-slate-400 border-slate-500/30",replied:"bg-emerald-500/20 text-emerald-400 border-emerald-500/30"};
  return <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${cls[status]??""}`}>{status}</span>;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [showPt,    setShowPt]    = useState(false);
  const [showAp,    setShowAp]    = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [selPt,     setSelPt]     = useState<Patient|null>(null);

  const { data: stats }       = useQuery({ queryKey:["stats"],        queryFn: fetchStats });
  const { data: therapists }  = useQuery({ queryKey:["therapists"],   queryFn: fetchTherapists });
  const { data: appointments, isLoading: apptL, refetch: rAppts } = useQuery({ queryKey:["appointments"], queryFn: fetchAppointments });
  const { data: patients,     isLoading: patL  } = useQuery({ queryKey:["patients"],     queryFn: fetchPatients });
  const { data: contacts,     isLoading: conL,  refetch: rCon } = useQuery({ queryKey:["contacts"],     queryFn: fetchContacts });

  const updAppt = useMutation({ mutationFn: async({id,status}:{id:string;status:string}) => { const {error}=await supabase.from("appointments").update({status}).eq("id",id); if(error)throw error; }, onSuccess:()=>{qc.invalidateQueries({queryKey:["appointments"]});qc.invalidateQueries({queryKey:["stats"]});}, onError:(e:Error)=>toast.error(e.message) });
  const markPaid = useMutation({ mutationFn: async(id:string)=>{ const {error}=await supabase.from("appointments").update({payment_status:"paid"}).eq("id",id); if(error)throw error; }, onSuccess:()=>{qc.invalidateQueries({queryKey:["appointments"]});toast.success("Marked as paid");}, onError:(e:Error)=>toast.error(e.message) });
  const updCon  = useMutation({ mutationFn: async({id,status}:{id:string;status:string})=>{ const {error}=await supabase.from("contact_submissions").update({status}).eq("id",id); if(error)throw error; }, onSuccess:()=>qc.invalidateQueries({queryKey:["contacts"]}), onError:(e:Error)=>toast.error(e.message) });

  const filtered = (appointments??[]).filter(a=>[a.patient?.profile?.full_name,a.therapist?.full_name,a.service,a.status].join(" ").toLowerCase().includes(search.toLowerCase()));

  const statCards = [
    { label:"Total Patients",  value:stats?.patients??0,   icon:Users,        glow:"teal"   as const, accent:"text-teal-400"   },
    { label:"Confirmed Today", value:stats?.todayAppts??0, icon:Calendar,     glow:"gold"   as const, accent:"text-amber-400"  },
    { label:"New Enquiries",   value:stats?.newLeads??0,   icon:MessageSquare,glow:"orange" as const, accent:"text-orange-400" },
    { label:"Unpaid Sessions", value:stats?.unpaid??0,     icon:CreditCard,   glow:"red"    as const, accent:"text-red-400"    },
  ];

  const Spinner = () => <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin"/></div>;

  return (
    <div className="min-h-screen" style={{background:"linear-gradient(135deg,hsl(222,47%,6%) 0%,hsl(220,40%,9%) 50%,hsl(222,47%,6%) 100%)"}}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{background:"hsl(222,47%,7%/0.8)"}}>
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-teal-400"/>
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Expert Physio</h1>
              <p className="text-xs text-white/40">Admin · {profile?.full_name??""}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5"><Bell className="w-4 h-4"/></Button>
            <Button variant="ghost" size="sm" onClick={()=>navigate("/")} className="text-white/50 hover:text-white hover:bg-white/5 gap-1.5 hidden sm:flex"><Home className="w-4 h-4"/>Site</Button>
            <Button size="sm" onClick={async()=>{await logout();navigate("/login");}} className="gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10"><LogOut className="w-4 h-4"/>Logout</Button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-white">Good {new Date().getHours()<12?"Morning":new Date().getHours()<17?"Afternoon":"Evening"}, Dr. {profile?.full_name?.split(" ").pop()}! 👋</h2>
          <p className="text-white/40 text-sm mt-1">Here's what's happening at your clinic today.</p>
        </div>

        {/* GlowCard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(s=>(
            <GlowCard key={s.label} glowColor={s.glow} customSize className="p-5 flex flex-col gap-3 cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <s.icon className={`w-5 h-5 ${s.accent}`}/>
                </div>
                <span className={`text-3xl font-bold ${s.accent}`}>{s.value}</span>
              </div>
              <p className="text-xs text-white/50 font-medium">{s.label}</p>
            </GlowCard>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto flex flex-wrap gap-1">
            {["analytics","appointments","patients","staff","contacts"].map(t=>(
              <TabsTrigger key={t} value={t} className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-300 data-[state=active]:border data-[state=active]:border-teal-500/30 text-white/50 rounded-lg px-4 py-2 text-sm capitalize hover:text-white/80">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Analytics */}
          <TabsContent value="analytics" className="mt-4"><AnalyticsTab/></TabsContent>

          {/* Appointments */}
          <TabsContent value="appointments" className="mt-4">
            <div className="rounded-2xl border border-white/8" style={{background:"hsl(222,40%,9%)"}}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-white/8">
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-400"/>Appointments</h3>
                  <p className="text-white/40 text-xs mt-0.5">{appointments?.length??0} records</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30"/><Input placeholder="Search…" className="pl-8 h-9 w-40 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm" value={search} onChange={e=>setSearch(e.target.value)}/></div>
                  <Button variant="ghost" size="sm" onClick={()=>rAppts()} className="h-9 text-white/50 hover:text-white hover:bg-white/5 border border-white/10"><RefreshCw className="w-4 h-4"/></Button>
                  <Button size="sm" onClick={()=>setShowAp(true)} className="h-9 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 gap-1"><Plus className="w-4 h-4"/>New</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {apptL ? <Spinner/> : filtered.length===0 ? <p className="text-white/30 text-sm text-center py-10">No appointments found.</p> : (
                  <Table>
                    <TableHeader><TableRow className="border-white/8 hover:bg-transparent"><TableHead className="text-white/40 font-medium">Patient</TableHead><TableHead className="text-white/40 hidden md:table-cell">Therapist</TableHead><TableHead className="text-white/40">Service</TableHead><TableHead className="text-white/40 hidden sm:table-cell">Date</TableHead><TableHead className="text-white/40">Status</TableHead><TableHead className="text-white/40 hidden sm:table-cell">Payment</TableHead><TableHead className="text-white/40">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {filtered.map(a=>(
                        <TableRow key={a.id} className="border-white/5 hover:bg-white/3">
                          <TableCell className="text-white font-medium text-sm">{a.patient?.profile?.full_name??"—"}</TableCell>
                          <TableCell className="text-white/60 text-sm hidden md:table-cell">{a.therapist?.full_name??"—"}</TableCell>
                          <TableCell className="text-white/60 text-sm">{a.service}</TableCell>
                          <TableCell className="text-white/40 text-xs hidden sm:table-cell">{fmtDate(a.scheduled_at)}</TableCell>
                          <TableCell><StatusBadge status={a.status}/></TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {a.payment_status==="paid"
                              ? <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3"/>Paid{a.amount?` ₹${a.amount}`:""}</span>
                              : a.status!=="cancelled"
                                ? <Button size="sm" variant="ghost" className="h-7 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 gap-1 border border-amber-500/20" onClick={()=>markPaid.mutate(a.id)} disabled={markPaid.isPending}><CreditCard className="w-3 h-3"/>Mark Paid</Button>
                                : <span className="text-white/20 text-xs">—</span>}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {a.status==="pending"&&<Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-400 hover:bg-emerald-500/10" title="Confirm" onClick={()=>{updAppt.mutate({id:a.id,status:"confirmed"});toast.success("Confirmed!")}}><CheckCircle className="w-3.5 h-3.5"/></Button>}
                              {(a.status==="pending"||a.status==="confirmed")&&<Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:bg-red-500/10" title="Cancel" onClick={()=>{updAppt.mutate({id:a.id,status:"cancelled"});toast.error("Cancelled.")}}><XCircle className="w-3.5 h-3.5"/></Button>}
                              {a.status==="confirmed"&&<Button size="icon" variant="ghost" className="h-7 w-7 text-sky-400 hover:bg-sky-500/10" title="Complete" onClick={()=>{updAppt.mutate({id:a.id,status:"completed"});toast.success("Completed!")}}><UserCheck className="w-3.5 h-3.5"/></Button>}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Patients */}
          <TabsContent value="patients" className="mt-4">
            <div className="rounded-2xl border border-white/8" style={{background:"hsl(222,40%,9%)"}}>
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <div><h3 className="text-white font-semibold flex items-center gap-2"><Users className="w-4 h-4 text-teal-400"/>Patients</h3><p className="text-white/40 text-xs mt-0.5">{patients?.length??0} registered</p></div>
                <Button size="sm" onClick={()=>setShowPt(true)} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 gap-1"><Plus className="w-4 h-4"/>Add Patient</Button>
              </div>
              <div className="overflow-x-auto">
                {patL ? <Spinner/> : (patients??[]).length===0
                  ? <div className="text-center py-14"><Users className="w-12 h-12 text-white/10 mx-auto mb-3"/><p className="text-white/30 text-sm">No patients yet.</p><Button className="mt-3 bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30" onClick={()=>setShowPt(true)}><Plus className="w-4 h-4 mr-1"/>Add First Patient</Button></div>
                  : <Table><TableHeader><TableRow className="border-white/8 hover:bg-transparent"><TableHead className="text-white/40">Name</TableHead><TableHead className="text-white/40 hidden sm:table-cell">Phone</TableHead><TableHead className="text-white/40 hidden md:table-cell">Therapist</TableHead><TableHead className="text-white/40 hidden md:table-cell">Condition</TableHead><TableHead/></TableRow></TableHeader>
                    <TableBody>{(patients??[]).map(p=><TableRow key={p.id} className="border-white/5 hover:bg-white/3 cursor-pointer" onClick={()=>setSelPt(p)}><TableCell className="text-white font-medium">{p.profile?.full_name??"—"}</TableCell><TableCell className="text-white/50 text-sm hidden sm:table-cell">{p.profile?.phone??"—"}</TableCell><TableCell className="text-white/50 text-sm hidden md:table-cell">{p.therapist?.full_name??<span className="text-white/20 text-xs">Unassigned</span>}</TableCell><TableCell className="text-white/40 text-sm hidden md:table-cell">{p.condition_summary??p.medical_history?.slice(0,40)??"—"}</TableCell><TableCell><ChevronRight className="w-4 h-4 text-white/20"/></TableCell></TableRow>)}</TableBody>
                  </Table>}
              </div>
            </div>
          </TabsContent>

          {/* Staff */}
          <TabsContent value="staff" className="mt-4">
            <div className="rounded-2xl border border-white/8 p-5" style={{background:"hsl(222,40%,9%)"}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2"><Stethoscope className="w-4 h-4 text-teal-400"/>Your Therapy Team</h3>
                <Button size="sm" onClick={()=>setShowStaff(true)} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 gap-1"><Plus className="w-4 h-4"/>Add Therapist</Button>
              </div>
              {(therapists??[]).length===0
                ? <p className="text-white/30 text-sm text-center py-8">No therapists. Add via Supabase → Auth → Invite User.</p>
                : <div className="grid sm:grid-cols-2 gap-3">
                    {(therapists??[]).map(t=>{
                      const cnt=(patients??[]).filter(p=>p.assigned_therapist_id===t.id).length;
                      return(
                        <GlowCard key={t.id} glowColor="teal" customSize className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-300 font-bold text-lg flex-shrink-0">{t.full_name.charAt(0)}</div>
                          <div className="min-w-0 flex-1"><p className="text-white font-semibold text-sm">{t.full_name}</p><p className="text-white/40 text-xs">{t.phone??"No phone"}</p></div>
                          <span className="text-xs text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full px-2.5 py-1 flex-shrink-0">{cnt} pts</span>
                        </GlowCard>
                      );
                    })}
                  </div>}
            </div>
          </TabsContent>

          {/* Contacts */}
          <TabsContent value="contacts" className="mt-4">
            <div className="rounded-2xl border border-white/8" style={{background:"hsl(222,40%,9%)"}}>
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <div><h3 className="text-white font-semibold flex items-center gap-2"><MessageSquare className="w-4 h-4 text-teal-400"/>Enquiries</h3><p className="text-white/40 text-xs mt-0.5">Website contact form submissions</p></div>
                <Button variant="ghost" size="sm" onClick={()=>rCon()} className="text-white/40 hover:text-white hover:bg-white/5 border border-white/10"><RefreshCw className="w-4 h-4"/></Button>
              </div>
              <div className="p-4 space-y-3">
                {conL ? <Spinner/> : (contacts??[]).length===0
                  ? <p className="text-white/30 text-sm text-center py-8">No enquiries yet.</p>
                  : (contacts??[]).map(c=>(
                    <div key={c.id} className={`p-4 rounded-xl border transition-colors ${c.status==="new"?"border-amber-500/30 bg-amber-500/5":"border-white/8 bg-white/3"}`}>
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap"><p className="text-white font-semibold text-sm">{c.name}</p><StatusBadge status={c.status}/></div>
                          <p className="text-white/30 text-xs mt-1">{c.email??""}{c.phone?` · ${c.phone}`:""} · {fmtDate(c.created_at)}</p>
                          <p className="text-white/60 text-sm mt-2">{c.message}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {c.status==="new"&&<Button size="sm" variant="ghost" className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 text-xs" onClick={()=>{updCon.mutate({id:c.id,status:"read"});toast.success("Marked read")}}>Read</Button>}
                          {c.status!=="replied"&&<Button size="sm" className="bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 text-xs" onClick={()=>{updCon.mutate({id:c.id,status:"replied"});toast.success("Marked replied")}}>Replied</Button>}
                          {c.phone&&<Button size="sm" variant="ghost" asChild className="text-green-400 hover:text-green-300 hover:bg-green-500/10 border border-green-500/20 text-xs"><a href={`https://wa.me/${c.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></Button>}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <CreatePatientModal    open={showPt}    onClose={()=>setShowPt(false)}    therapists={therapists??[]} onCreated={()=>{qc.invalidateQueries({queryKey:["patients"]});qc.invalidateQueries({queryKey:["stats"]});}}/>
      <CreateStaffModal      open={showStaff} onClose={()=>setShowStaff(false)} onCreated={()=>qc.invalidateQueries({queryKey:["therapists"]})}/>
      <CreateAppointmentModal open={showAp} onClose={()=>setShowAp(false)} therapists={therapists??[]} patients={patients??[]}/>
      <PatientDetailSheet    patient={selPt} open={!!selPt} onClose={()=>setSelPt(null)} therapists={therapists??[]}/>
    </div>
  );
};

export default AdminDashboard;
