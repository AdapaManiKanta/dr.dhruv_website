import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, Calendar, DollarSign, TrendingUp, LogOut, Home, CheckCircle, Clock,
  XCircle, UserCheck, Activity, BarChart3, Settings, Bell
} from "lucide-react";

const stats = [
  { label: "Total Patients", value: "1,247", icon: Users, change: "+12%", color: "text-primary" },
  { label: "Appointments Today", value: "18", icon: Calendar, change: "+3", color: "text-accent" },
  { label: "Revenue (Month)", value: "₹4,85,000", icon: DollarSign, change: "+8.2%", color: "text-green-600" },
  { label: "Active Therapists", value: "12", icon: UserCheck, change: "Full team", color: "text-blue-600" },
];

const appointments = [
  { id: 1, patient: "Rajesh Kumar", therapist: "Dr. Priya Sharma", service: "Stroke Rehab", date: "2026-03-28", time: "10:00 AM", status: "confirmed" },
  { id: 2, patient: "Sunita Devi", therapist: "Dr. Anil Reddy", service: "Pain Relief", date: "2026-03-28", time: "11:30 AM", status: "pending" },
  { id: 3, patient: "Mohammed Ali", therapist: "Dr. Priya Sharma", service: "Post-Surgery", date: "2026-03-28", time: "2:00 PM", status: "confirmed" },
  { id: 4, patient: "Lakshmi Rao", therapist: "Dr. Kavitha", service: "Elderly Care", date: "2026-03-28", time: "3:30 PM", status: "cancelled" },
  { id: 5, patient: "Venkat Rao", therapist: "Dr. Anil Reddy", service: "Home Physio", date: "2026-03-28", time: "5:00 PM", status: "pending" },
];

const users = [
  { id: 1, name: "Dr. Priya Sharma", role: "Therapist", email: "priya@expertphysio.com", status: "active", patients: 45 },
  { id: 2, name: "Dr. Anil Reddy", role: "Therapist", email: "anil@expertphysio.com", status: "active", patients: 38 },
  { id: 3, name: "Dr. Kavitha", role: "Therapist", email: "kavitha@expertphysio.com", status: "active", patients: 32 },
  { id: 4, name: "Rajesh Kumar", role: "Patient", email: "rajesh@email.com", status: "active", patients: 0 },
  { id: 5, name: "Sunita Devi", role: "Patient", email: "sunita@email.com", status: "inactive", patients: 0 },
];

const services = [
  { name: "Home Physiotherapy", price: "₹1,500", sessions: 320, active: true },
  { name: "Stroke Rehabilitation", price: "₹2,000", sessions: 185, active: true },
  { name: "Post-Surgery Recovery", price: "₹1,800", sessions: 142, active: true },
  { name: "Pain Relief Therapy", price: "₹1,200", sessions: 410, active: true },
  { name: "Elderly Care", price: "₹1,500", sessions: 190, active: true },
];

const statusBadge = (status: string) => {
  const map: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    confirmed: { variant: "default", label: "Confirmed" },
    pending: { variant: "secondary", label: "Pending" },
    cancelled: { variant: "destructive", label: "Cancelled" },
    active: { variant: "default", label: "Active" },
    inactive: { variant: "outline", label: "Inactive" },
  };
  const s = map[status] || { variant: "outline" as const, label: status };
  return <Badge variant={s.variant}>{s.label}</Badge>;
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon"><Settings className="w-5 h-5" /></Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <Home className="w-4 h-4" /> Site
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/login")} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="glass-card">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-primary">{s.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="appointments">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Today's Appointments</CardTitle>
                <CardDescription>Manage and track all appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Therapist</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.patient}</TableCell>
                        <TableCell>{a.therapist}</TableCell>
                        <TableCell>{a.service}</TableCell>
                        <TableCell>{a.time}</TableCell>
                        <TableCell>{statusBadge(a.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8"><CheckCircle className="w-4 h-4 text-green-600" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8"><XCircle className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> User Management</CardTitle>
                <CardDescription>Manage therapists and patients</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Patients</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{statusBadge(u.status)}</TableCell>
                        <TableCell>{u.role === "Therapist" ? u.patients : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Services & Pricing</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Price / Session</TableHead>
                      <TableHead>Total Sessions</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((s) => (
                      <TableRow key={s.name}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>{s.price}</TableCell>
                        <TableCell>{s.sessions}</TableCell>
                        <TableCell>{statusBadge(s.active ? "active" : "inactive")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
