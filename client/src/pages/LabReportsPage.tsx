import LabLayout from "@/components/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { 
  TrendingUp, TrendingDown, DollarSign, Calendar, Users,
  Clock, Star, Download, BarChart3, PieChart
} from "lucide-react";
import { motion } from "framer-motion";

export default function LabReportsPage() {
  const [period, setPeriod] = useState('week');

  const stats = [
    { label: 'Total Revenue', value: '45,230 AED', change: '+12.5%', isPositive: true, icon: DollarSign },
    { label: 'Completed Tests', value: '156', change: '+8', isPositive: true, icon: Calendar },
    { label: 'Unique Customers', value: '89', change: '+15', isPositive: true, icon: Users },
    { label: 'Avg. Response Time', value: '1.8h', change: '-0.3h', isPositive: true, icon: Clock },
    { label: 'Customer Rating', value: '4.8', change: '+0.1', isPositive: true, icon: Star },
    { label: 'Cancellation Rate', value: '3.2%', change: '-0.5%', isPositive: true, icon: TrendingDown },
  ];

  const topBundles = [
    { name: 'Full Body Checkup', count: 45, revenue: 29250, percentage: 35 },
    { name: 'Heart Health Panel', count: 38, revenue: 12920, percentage: 25 },
    { name: 'Essential Health Check', count: 52, revenue: 9880, percentage: 22 },
    { name: "Women's Wellness", count: 21, revenue: 10290, percentage: 18 },
  ];

  const recentActivity = [
    { date: 'Today', bookings: 12, completed: 8, revenue: '5,840 AED' },
    { date: 'Yesterday', bookings: 15, completed: 14, revenue: '7,250 AED' },
    { date: 'Jan 11', bookings: 10, completed: 10, revenue: '4,890 AED' },
    { date: 'Jan 10', bookings: 18, completed: 16, revenue: '8,120 AED' },
    { date: 'Jan 9', bookings: 14, completed: 13, revenue: '6,340 AED' },
  ];

  return (
    <LabLayout title="Reports" subtitle="Analytics and performance insights">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white" data-testid="select-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-slate-600 text-slate-300" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-slate-800/40 border-slate-700" data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm ${stat.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500">vs last {period}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/40 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-teal-400" />
                  Top Bundles
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topBundles.map((bundle, i) => (
                <div key={bundle.name} className="space-y-2" data-testid={`bundle-stat-${i}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{bundle.name}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-400">{bundle.count} tests</span>
                      <span className="text-teal-400 font-medium">{bundle.revenue.toLocaleString()} AED</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                      style={{ width: `${bundle.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Daily Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((day, i) => (
                  <div 
                    key={day.date} 
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                    data-testid={`activity-${i}`}
                  >
                    <span className="text-white font-medium">{day.date}</span>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-slate-400">Bookings:</span>
                        <span className="text-white ml-1">{day.bookings}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Completed:</span>
                        <span className="text-emerald-400 ml-1">{day.completed}</span>
                      </div>
                      <div className="text-teal-400 font-medium">{day.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/40 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2 px-4" data-testid="revenue-chart">
              {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-teal-500 to-emerald-500 rounded-t-lg transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-slate-400">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  );
}
