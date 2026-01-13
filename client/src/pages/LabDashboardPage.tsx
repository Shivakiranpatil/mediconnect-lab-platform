import { useUser } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, Calendar, MapPin, DollarSign, Clock,
  TrendingUp, CheckCircle2, AlertCircle, LogOut, ChevronRight,
  Beaker, Settings, FileText
} from "lucide-react";
import { motion } from "framer-motion";

export default function LabDashboardPage() {
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  const stats = [
    { 
      label: 'Pending Bookings', 
      value: '12', 
      change: '+3 today', 
      icon: Calendar,
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      label: 'Completed Today', 
      value: '8', 
      change: '+2 from yesterday', 
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      label: 'Revenue (AED)', 
      value: '12,450', 
      change: '+15%', 
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      label: 'Avg. Response', 
      value: '1.8h', 
      change: '-20%', 
      icon: Clock,
      gradient: 'from-violet-500 to-purple-500'
    },
  ];

  const pendingBookings = [
    { id: 'BK-101', customer: 'Ahmed Hassan', bundle: 'Full Body Checkup', time: '9:00 AM', address: 'Business Bay, Dubai', status: 'pending' },
    { id: 'BK-102', customer: 'Sara Ali', bundle: 'Heart Health Panel', time: '10:30 AM', address: 'Marina, Dubai', status: 'confirmed' },
    { id: 'BK-103', customer: 'Khalid Omar', bundle: 'Essential Health', time: '2:00 PM', address: 'JBR, Dubai', status: 'pending' },
    { id: 'BK-104', customer: 'Maryam Ahmed', bundle: "Women's Wellness", time: '4:30 PM', address: 'Downtown, Dubai', status: 'confirmed' },
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/lab/dashboard', active: true },
    { icon: Calendar, label: 'Bookings', href: '/lab/bookings' },
    { icon: MapPin, label: 'Service Zones', href: '/lab/zones' },
    { icon: DollarSign, label: 'Pricing', href: '/lab/pricing' },
    { icon: Clock, label: 'Working Hours', href: '/lab/hours' },
    { icon: FileText, label: 'Reports', href: '/lab/reports' },
    { icon: Settings, label: 'Settings', href: '/lab/settings' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900 flex" data-testid="lab-dashboard">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/30 backdrop-blur-xl border-r border-slate-700/50 flex flex-col" data-testid="lab-sidebar">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Beaker className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">MediConnect</h1>
              <p className="text-xs text-teal-300">Lab Partner Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <div 
                data-testid={`nav-lab-${item.label.toLowerCase().replace(' ', '-')}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                  item.active 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold" data-testid="text-lab-user-avatar">
              {user?.name?.charAt(0) || 'L'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate" data-testid="text-lab-user-name">{user?.name || 'Lab Manager'}</p>
              <p className="text-xs text-teal-300">Lab Partner</p>
            </div>
            <button 
              onClick={() => setLocation('/')}
              data-testid="button-lab-logout"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/20 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white" data-testid="text-lab-dashboard-title">Lab Dashboard</h1>
              <p className="text-teal-300" data-testid="text-lab-welcome">Welcome back, {user?.name || 'Lab Manager'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30" data-testid="status-online">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Online & Accepting Bookings</span>
              </div>
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
                data-testid={`lab-stat-card-${stat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white" data-testid={`text-lab-stat-value-${i}`}>{stat.value}</p>
                  <p className="text-slate-400">{stat.label}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-400" data-testid={`text-lab-stat-change-${i}`}>{stat.change}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Today's Schedule */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden" data-testid="table-todays-bookings">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div>
                <h3 className="text-lg font-semibold text-white">Today's Bookings</h3>
                <p className="text-sm text-slate-400">Manage your scheduled collections</p>
              </div>
              <button className="text-teal-400 text-sm font-medium flex items-center gap-1 hover:text-teal-300" data-testid="button-view-calendar">
                View Calendar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-700/50">
              {pendingBookings.map((booking, i) => (
                <motion.div 
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 hover:bg-slate-700/20 transition-colors"
                  data-testid={`row-lab-booking-${booking.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 font-bold" data-testid={`text-booking-time-${booking.id}`}>
                        {booking.time.split(':')[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-white" data-testid={`text-lab-customer-${booking.id}`}>{booking.customer}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`} data-testid={`status-lab-${booking.id}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-1">{booking.bundle}</p>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span data-testid={`text-address-${booking.id}`}>{booking.address}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700" data-testid={`button-view-details-${booking.id}`}>
                        View Details
                      </Button>
                      {booking.status === 'pending' && (
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white" data-testid={`button-confirm-${booking.id}`}>
                          Confirm
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white" data-testid="card-service-zones">
              <MapPin className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Service Zones</h3>
              <p className="text-teal-100 text-sm mb-4">Manage your coverage areas</p>
              <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0" data-testid="button-edit-zones">
                Edit Zones
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white" data-testid="card-pricing">
              <DollarSign className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Pricing</h3>
              <p className="text-blue-100 text-sm mb-4">Update package pricing</p>
              <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0" data-testid="button-manage-pricing">
                Manage Pricing
              </Button>
            </div>

            <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-6 text-white" data-testid="card-working-hours">
              <Clock className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Working Hours</h3>
              <p className="text-violet-100 text-sm mb-4">Set availability schedule</p>
              <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0" data-testid="button-set-hours">
                Set Hours
              </Button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50" data-testid="card-performance">
              <h3 className="text-lg font-semibold text-white mb-4">This Week's Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Completion Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-[95%] h-full bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-emerald-400 font-medium" data-testid="text-completion-rate">95%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">On-Time Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-[88%] h-full bg-blue-500 rounded-full" />
                    </div>
                    <span className="text-blue-400 font-medium" data-testid="text-ontime-rate">88%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Customer Rating</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-amber-500 rounded-full" />
                    </div>
                    <span className="text-amber-400 font-medium" data-testid="text-customer-rating">4.6/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50" data-testid="card-alerts">
              <h3 className="text-lg font-semibold text-white mb-4">Alerts & Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20" data-testid="alert-confirmation-needed">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium">2 bookings need confirmation</p>
                    <p className="text-xs text-slate-400">Please confirm within 30 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20" data-testid="alert-pricing-update">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium">New pricing update available</p>
                    <p className="text-xs text-slate-400">3 bundles have updated base prices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
