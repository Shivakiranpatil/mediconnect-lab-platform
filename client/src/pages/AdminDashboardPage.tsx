import { useUser } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, Users, Calendar, FileText, Settings, 
  TrendingUp, Package, Building2, LogOut, ChevronRight,
  Activity, DollarSign, Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  const stats = [
    { 
      label: 'Total Bookings', 
      value: '1,247', 
      change: '+12.5%', 
      icon: Calendar,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      label: 'Revenue (AED)', 
      value: '245,890', 
      change: '+8.2%', 
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      label: 'Active Labs', 
      value: '24', 
      change: '+2', 
      icon: Building2,
      gradient: 'from-violet-500 to-purple-500'
    },
    { 
      label: 'Avg. Response', 
      value: '2.4h', 
      change: '-15%', 
      icon: Clock,
      gradient: 'from-orange-500 to-amber-500'
    },
  ];

  const recentBookings = [
    { id: 'BK-001', customer: 'Ahmed Al Maktoum', bundle: 'Full Body Checkup', status: 'confirmed', amount: 699 },
    { id: 'BK-002', customer: 'Sarah Johnson', bundle: 'Heart Health Panel', status: 'pending', amount: 349 },
    { id: 'BK-003', customer: 'Mohammed Hassan', bundle: 'Essential Health', status: 'completed', amount: 199 },
    { id: 'BK-004', customer: 'Fatima Al Rashid', bundle: "Women's Wellness", status: 'confirmed', amount: 449 },
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: Calendar, label: 'Bookings', href: '/admin/bookings', active: false },
    { icon: Package, label: 'Catalog', href: '/admin/catalog', active: false },
    { icon: Building2, label: 'Labs', href: '/admin/labs', active: false },
    { icon: Users, label: 'Users', href: '/admin/users', active: false },
    { icon: Settings, label: 'AI Rules', href: '/admin/ai-rules', active: false },
    { icon: FileText, label: 'Reports', href: '/admin/reports', active: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-400';
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="min-h-screen bg-slate-900 flex w-full" data-testid="admin-dashboard">
        <Sidebar className="bg-slate-800/50 border-r border-slate-700" data-testid="admin-sidebar">
          <SidebarHeader className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white">MediConnect</h1>
                <p className="text-xs text-slate-400">Admin Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-500 text-xs uppercase px-4 py-2">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.active}
                        data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                        className={item.active 
                          ? 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white' 
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                        }
                      >
                        <Link href={item.href}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold" data-testid="text-user-avatar">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate" data-testid="text-user-name">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
              <button 
                onClick={() => setLocation('/')}
                data-testid="button-logout"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-slate-800/30 border-b border-slate-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-slate-400 hover:text-white" data-testid="button-sidebar-toggle" />
                <div>
                  <h1 className="text-2xl font-bold text-white" data-testid="text-dashboard-title">Dashboard</h1>
                  <p className="text-slate-400" data-testid="text-welcome-message">Welcome back, {user?.name || 'Admin'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" data-testid="button-export-report">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  data-testid={`stat-card-${stat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-2xl p-6 border border-slate-700"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white" data-testid={`text-stat-value-${i}`}>{stat.value}</p>
                    <p className="text-slate-400">{stat.label}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400" data-testid={`text-stat-change-${i}`}>{stat.change}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700" data-testid="chart-bookings-overview">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Bookings Overview</h3>
                  <select className="bg-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 border-none" data-testid="select-bookings-timeframe">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Chart visualization coming soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700" data-testid="chart-revenue-trend">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                  <select className="bg-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 border-none" data-testid="select-revenue-timeframe">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Chart visualization coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden" data-testid="table-recent-bookings">
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
                <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300" data-testid="button-view-all-bookings">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-700/30">
                      <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Booking ID</th>
                      <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Customer</th>
                      <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Package</th>
                      <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                      <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-700/20 transition-colors" data-testid={`row-booking-${booking.id}`}>
                        <td className="px-6 py-4 text-sm font-medium text-white" data-testid={`text-booking-id-${booking.id}`}>{booking.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-300" data-testid={`text-customer-${booking.id}`}>{booking.customer}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{booking.bundle}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`} data-testid={`status-${booking.id}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white text-right font-medium" data-testid={`text-amount-${booking.id}`}>AED {booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white" data-testid="card-manage-catalog">
                <Package className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">Manage Catalog</h3>
                <p className="text-blue-100 text-sm mb-4">Add or edit test bundles and packages</p>
                <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0" data-testid="button-go-to-catalog">
                  Go to Catalog
                </Button>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white" data-testid="card-ai-config">
                <Settings className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">AI Configuration</h3>
                <p className="text-emerald-100 text-sm mb-4">Configure AI discovery rules and prompts</p>
                <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0" data-testid="button-configure-ai">
                  Configure AI
                </Button>
              </div>

              <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-6 text-white" data-testid="card-lab-partners">
                <Building2 className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">Lab Partners</h3>
                <p className="text-violet-100 text-sm mb-4">Manage partner labs and pricing</p>
                <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0" data-testid="button-view-labs">
                  View Labs
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
