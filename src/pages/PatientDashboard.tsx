import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar, LogOut, Home, Clock, Heart, Phone, MessageSquare,
  Bell, User, FileText, CalendarPlus
} from "lucide-react";

const appointments = [
  { id: 1, therapist: "Dr. Priya Sharma", service: "Stroke Rehab", date: "2026-03-28", time: "10:00 AM", status: "confirmed" },
  { id: 2, therapist: "Dr. Priya Sharma", service: "Stroke Rehab", date: "2026-03-25", time: "10:00 AM", status: "completed" },
  { id: 3, therapist: "Dr. Priya Sharma", service: "Stroke Rehab", date: "2026-03-22", time: "10:00 AM", status: "completed" },
  { id: 4, therapist: "Dr. Anil Reddy", service: "Pain Relief", date: "2026-03-18", time: "3:00 PM", status: "completed" },
];

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold">My Health Portal</h1>
              <p className="text-xs text-muted-foreground">Welcome, Rajesh Kumar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2"><Home className="w-4 h-4" /> Site</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/login")} className="gap-2"><LogOut className="w-4 h-4" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass-card cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarPlus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Book Appointment</p>
                <p className="text-sm text-muted-foreground">Schedule a new session</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.open("tel:+918309506151")}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium">Call Therapist</p>
                <p className="text-sm text-muted-foreground">+91 83095 06151</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.open("https://wa.me/918309506151")}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Chat with us</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="book">Book New</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Appointment History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {appointments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="space-y-1">
                      <p className="font-medium">{a.service}</p>
                      <p className="text-sm text-muted-foreground">{a.therapist}</p>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <p className="text-sm font-medium">{a.date}</p>
                        <p className="text-xs text-muted-foreground">{a.time}</p>
                      </div>
                      <Badge variant={a.status === "confirmed" ? "default" : a.status === "completed" ? "secondary" : "outline"}>
                        {a.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="book" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarPlus className="w-5 h-5" /> Book an Appointment</CardTitle>
                <CardDescription>Fill in the details to schedule a session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home-physio">Home Physiotherapy</SelectItem>
                        <SelectItem value="stroke-rehab">Stroke Rehabilitation</SelectItem>
                        <SelectItem value="post-surgery">Post-Surgery Recovery</SelectItem>
                        <SelectItem value="pain-relief">Pain Relief Therapy</SelectItem>
                        <SelectItem value="elderly-care">Elderly Care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Time</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="10am">10:00 AM</SelectItem>
                        <SelectItem value="11am">11:00 AM</SelectItem>
                        <SelectItem value="2pm">2:00 PM</SelectItem>
                        <SelectItem value="3pm">3:00 PM</SelectItem>
                        <SelectItem value="4pm">4:00 PM</SelectItem>
                        <SelectItem value="5pm">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea placeholder="Describe your condition or special requirements..." rows={3} />
                </div>
                <Button size="lg">Book Appointment</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="Rajesh Kumar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="rajesh@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input defaultValue="Banjara Hills, Hyderabad" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientDashboard;
