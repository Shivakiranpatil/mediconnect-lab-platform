import { useUser } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
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
  Package, Building2, LogOut, Activity
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

import { Brain, Cog } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: Package, label: 'Catalog', href: '/admin/catalog' },
  { icon: Building2, label: 'Labs', href: '/admin/labs' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Brain, label: 'AI Rules', href: '/admin/ai-rules' },
  { icon: FileText, label: 'Reports', href: '/admin/reports' },
  { icon: Cog, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { data: user } = useUser();
  const [location, setLocation] = useLocation();

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="min-h-screen bg-slate-900 flex w-full">
        <Sidebar className="bg-slate-800/50 border-r border-slate-700">
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
                  {navItems.map((item) => {
                    const isActive = location === item.href;
                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                        >
                          <Link 
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                              isActive 
                                ? 'bg-blue-600 text-white font-medium' 
                                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                            }`}
                          >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                            <span className={isActive ? 'text-white font-medium' : ''}>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
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

        <main className="flex-1 overflow-auto">
          <header className="bg-slate-800/30 border-b border-slate-700 px-8 py-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-slate-400 hover:text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                {subtitle && <p className="text-slate-400">{subtitle}</p>}
              </div>
            </div>
          </header>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
