import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Home as HomeIcon, Menu, X, User, LogOut, Calendar, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useUser();
  const logoutMutation = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Lab Partners', href: '/labs' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    if (href.startsWith('#')) return false;
    return location.startsWith(href);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="px-4 sm:px-6 py-4" data-testid="navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-lg cursor-pointer" data-testid="logo">
            <HomeIcon className="w-5 h-5" />
            <span className="hidden sm:inline">LabTest</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <button
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                data-testid={`nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </nav>

        {/* Auth buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors" data-testid="user-menu-trigger">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    {(user.name || user.username || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name || user.username}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border border-gray-100">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name || user.username}</p>
                  <p className="text-xs text-gray-500">Member</p>
                </div>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  My Appointments
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="gap-2 text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth">
                <button 
                  className="px-4 sm:px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" 
                  data-testid="button-login"
                >
                  Login
                </button>
              </Link>
              <Link href="/auth">
                <button 
                  className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg" 
                  data-testid="button-signup"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-left w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            ))}
          </nav>
          
          {user ? (
            <div className="mt-4 pt-4 border-t border-gray-100 px-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {(user.name || user.username || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name || user.username}</p>
                  <p className="text-xs text-gray-500">Member</p>
                </div>
              </div>
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100 px-4">
              <Link href="/auth">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors text-left"
                >
                  Login
                </button>
              </Link>
              <Link href="/auth">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-center"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
