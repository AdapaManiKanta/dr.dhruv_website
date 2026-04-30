import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TrendingUp, DollarSign, CalendarCheck, Users } from "lucide-react";

// ─── Fetch analytics data ────────────────────────────────────
const fetchAnalytics = async () => {
  // Last 6 months labels
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(d.toLocaleString("en-IN", { month: "short", year: "2-digit" }));
  }

  // All appointments in last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data: appts } = await supabase
    .from("appointments")
    .select("scheduled_at, status, payment_status, amount, service")
    .gte("scheduled_at", sixMonthsAgo.toISOString());

  const allAppts = appts ?? [];

  // Group by month
  const byMonth: Record<string, { appointments: number; revenue: number }> = {};
  months.forEach(m => { byMonth[m] = { appointments: 0, revenue: 0 }; });

  allAppts.forEach(a => {
    const label = new Date(a.scheduled_at).toLocaleString("en-IN", { month: "short", year: "2-digit" });
    if (byMonth[label]) {
      byMonth[label].appointments++;
      if (a.payment_status === "paid") byMonth[label].revenue += a.amount ?? 0;
    }
  });

  const monthlyData = months.map(m => ({
    month: m,
    appointments: byMonth[m].appointments,
    revenue: byMonth[m].revenue,
  }));

  // Service breakdown
  const serviceCounts: Record<string, number> = {};
  allAppts.forEach(a => {
    if (a.service) serviceCounts[a.service] = (serviceCounts[a.service] ?? 0) + 1;
  });
  const serviceData = Object.entries(serviceCounts)
    .map(([name, value]) => ({ name: name.replace(" Physiotherapy", " Physio").replace(" Rehabilitation", " Rehab"), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Summary
  const totalRevenue  = allAppts.filter(a => a.payment_status === "paid").reduce((s, a) => s + (a.amount ?? 0), 0);
  const unpaidCount   = allAppts.filter(a => a.payment_status === "unpaid" && a.status !== "cancelled").length;
  const completedCount = allAppts.filter(a => a.status === "completed").length;

  return { monthlyData, serviceData, totalRevenue, unpaidCount, completedCount, total: allAppts.length };
};

const COLORS = ["hsl(175,70%,40%)", "hsl(38,90%,52%)", "hsl(200,65%,48%)", "hsl(260,60%,55%)", "hsl(330,65%,55%)"];

const AnalyticsTab = () => {
  const { data, isLoading } = useQuery({ queryKey: ["analytics"], queryFn: fetchAnalytics });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const d = data!;

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Revenue (6 mo)",    value: `₹${d.totalRevenue.toLocaleString("en-IN")}`, icon: DollarSign,    color: "text-green-600",  bg: "bg-green-50" },
          { label: "Total Sessions",    value: d.total,                                        icon: CalendarCheck, color: "text-primary",    bg: "bg-primary/10" },
          { label: "Completed",         value: d.completedCount,                               icon: TrendingUp,    color: "text-blue-600",   bg: "bg-blue-50" },
          { label: "Unpaid Sessions",   value: d.unpaidCount,                                  icon: Users,         color: "text-orange-600", bg: "bg-orange-50" },
        ].map(s => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">{s.label}</p>
                <p className="text-lg font-bold">{String(s.value)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly appointments bar chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Monthly Appointments (Last 6 months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="appointments" name="Appointments" fill="hsl(175,70%,40%)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue line chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Monthly Revenue — Paid Sessions (₹)</CardTitle>
          <CardDescription className="text-xs">Only counting sessions marked as paid</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={d.monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v >= 1000 ? `${Math.round(v/1000)}k` : v}`} />
              <Tooltip
                formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="revenue" name="Revenue (₹)"
                stroke="hsl(38,90%,52%)" strokeWidth={2.5} dot={{ fill: "hsl(38,90%,52%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Services pie chart */}
      {d.serviceData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Sessions by Service Type</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie data={d.serviceData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                  paddingAngle={3} dataKey="value">
                  {d.serviceData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {d.serviceData.map((s, idx) => (
                <div key={s.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: COLORS[idx % COLORS.length] }} />
                    <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsTab;
