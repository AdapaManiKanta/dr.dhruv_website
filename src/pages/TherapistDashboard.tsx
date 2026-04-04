import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, Calendar, LogOut, Home, CheckCircle, Clock, Activity,
  FileText, Stethoscope, Bell, Settings
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const schedule = [
  { id: 1, patient: "Rajesh Kumar", service: "Stroke Rehab", time: "10:00 AM", address: "Banjara Hills, Hyderabad", status: "upcoming" },
  { id: 2, patient: "Mohammed Ali", service: "Post-Surgery", time: "2:00 PM", address: "Jubilee Hills, Hyderabad", status: "upcoming" },
  { id: 3, patient: "Anita Sharma", service: "Pain Relief", time: "4:00 PM", address: "Madhapur, Hyderabad", status: "completed" },
];

const patients = [
  { id: 1, name: "Rajesh Kumar", condition: "Post-stroke recovery", sessions: 12, nextVisit: "Today, 10:00 AM", progress: "Good" },
  { id: 2, name: "Mohammed Ali", condition: "Knee replacement rehab", sessions: 8, nextVisit: "Today, 2:00 PM", progress: "Excellent" },
  { id: 3, name: "Anita Sharma", condition: "Chronic back pain", sessions: 15, nextVisit: "Mar 30", progress: "Moderate" },
  { id: 4, name: "Lakshmi Rao", condition: "Elderly mobility care", sessions: 20, nextVisit: "Mar 29", progress: "Steady" },
];

const TherapistDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold">Therapist Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome, Dr. Priya Sharma</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2"><Home className="w-4 h-4" /> Site</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/login")} className="gap-2"><LogOut className="w-4 h-4" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Sessions</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Patients</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed This Week</p>
                <p className="text-2xl font-bold">14</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="notes">Treatment Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" /> Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="space-y-1">
                      <p className="font-medium">{s.patient}</p>
                      <p className="text-sm text-muted-foreground">{s.service} • {s.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{s.time}</span>
                      <Badge variant={s.status === "completed" ? "default" : "secondary"}>
                        {s.status === "completed" ? "Done" : "Upcoming"}
                      </Badge>
                      {s.status !== "completed" && (
                        <Button size="sm" variant="outline"><CheckCircle className="w-4 h-4 mr-1" /> Complete</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> My Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Next Visit</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.condition}</TableCell>
                        <TableCell>{p.sessions}</TableCell>
                        <TableCell>{p.nextVisit}</TableCell>
                        <TableCell><Badge variant="outline">{p.progress}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Add Treatment Note</CardTitle>
                <CardDescription>Document session details for your patients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient</label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Rajesh Kumar</option>
                      <option>Mohammed Ali</option>
                      <option>Anita Sharma</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Session Type</label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Regular Session</option>
                      <option>Assessment</option>
                      <option>Follow-up</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea placeholder="Describe the session, exercises performed, patient progress..." rows={4} />
                </div>
                <Button>Save Treatment Note</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TherapistDashboard;
