import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, Calendar, DollarSign, Users, 
  Building2, Package, Download, FileText
} from "lucide-react";
import { useState } from "react";

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("30");

  const stats = [
    { label: 'Total Revenue', value: 'AED 245,890', change: '+12.5%', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
    { label: 'Total Bookings', value: '1,247', change: '+8.2%', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'New Users', value: '384', change: '+15.3%', icon: Users, color: 'from-violet-500 to-purple-500' },
    { label: 'Active Labs', value: '24', change: '+2', icon: Building2, color: 'from-orange-500 to-amber-500' },
  ];

  const topBundles = [
    { name: 'Full Body Checkup', bookings: 342, revenue: 238858, change: '+18%' },
    { name: 'Essential Health Check', bookings: 289, revenue: 57511, change: '+12%' },
    { name: 'Heart Health Panel', bookings: 198, revenue: 69102, change: '+8%' },
    { name: "Women's Wellness", bookings: 156, revenue: 70044, change: '+22%' },
    { name: 'Diabetes Screening', bookings: 134, revenue: 26666, change: '+5%' },
  ];

  const topLabs = [
    { name: 'HealthFirst Diagnostics', bookings: 412, revenue: 98560, rating: 4.8 },
    { name: 'MediCare Labs', bookings: 356, revenue: 84200, rating: 4.6 },
    { name: 'QuickTest UAE', bookings: 289, revenue: 68430, rating: 4.5 },
    { name: 'ProHealth Center', bookings: 190, revenue: 45700, rating: 4.2 },
  ];

  const bookingsByStatus = [
    { status: 'Completed', count: 856, percentage: 68.6 },
    { status: 'Confirmed', count: 234, percentage: 18.8 },
    { status: 'Pending', count: 98, percentage: 7.9 },
    { status: 'Cancelled', count: 59, percentage: 4.7 },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Completed: 'bg-emerald-500',
      Confirmed: 'bg-blue-500',
      Pending: 'bg-amber-500',
      Cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-slate-500';
  };

  return (
    <AdminLayout title="Reports" subtitle="Analytics and performance insights">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48 bg-slate-800 border-slate-700 text-white" data-testid="select-date-range">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-600 text-slate-300" data-testid="button-export-report">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
              data-testid={`stat-card-${i}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-20 rounded-full -translate-y-1/2 translate-x-1/2`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Top Performing Bundles</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-700/50">
              {topBundles.map((bundle, i) => (
                <div key={i} className="p-4 flex items-center justify-between" data-testid={`bundle-row-${i}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 font-bold text-sm">{i + 1}</span>
                    <div>
                      <p className="font-medium text-white">{bundle.name}</p>
                      <p className="text-sm text-slate-400">{bundle.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">AED {bundle.revenue.toLocaleString()}</p>
                    <p className="text-sm text-emerald-400">{bundle.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Top Partner Labs</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-700/50">
              {topLabs.map((lab, i) => (
                <div key={i} className="p-4 flex items-center justify-between" data-testid={`lab-row-${i}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{i + 1}</span>
                    <div>
                      <p className="font-medium text-white">{lab.name}</p>
                      <p className="text-sm text-slate-400">{lab.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">AED {lab.revenue.toLocaleString()}</p>
                    <Badge className="bg-amber-500/20 text-amber-400 mt-1">{lab.rating} rating</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-teal-400" />
              <h3 className="text-lg font-semibold text-white">Bookings by Status</h3>
            </div>
            <div className="space-y-4">
              {bookingsByStatus.map((item, i) => (
                <div key={i} data-testid={`status-bar-${i}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">{item.status}</span>
                    <span className="text-sm font-medium text-white">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStatusColor(item.status)} rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Quick Reports</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 border-slate-600 text-slate-300 justify-start" data-testid="button-revenue-report">
                <DollarSign className="w-5 h-5 mr-3 text-emerald-400" />
                <div className="text-left">
                  <p className="font-medium">Revenue Report</p>
                  <p className="text-xs text-slate-500">Detailed breakdown</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 border-slate-600 text-slate-300 justify-start" data-testid="button-booking-report">
                <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                <div className="text-left">
                  <p className="font-medium">Booking Report</p>
                  <p className="text-xs text-slate-500">All appointments</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 border-slate-600 text-slate-300 justify-start" data-testid="button-lab-report">
                <Building2 className="w-5 h-5 mr-3 text-purple-400" />
                <div className="text-left">
                  <p className="font-medium">Lab Performance</p>
                  <p className="text-xs text-slate-500">Partner analytics</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 border-slate-600 text-slate-300 justify-start" data-testid="button-user-report">
                <Users className="w-5 h-5 mr-3 text-amber-400" />
                <div className="text-left">
                  <p className="font-medium">User Report</p>
                  <p className="text-xs text-slate-500">Registration trends</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
