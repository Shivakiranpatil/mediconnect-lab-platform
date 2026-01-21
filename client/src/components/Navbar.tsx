import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Home as HomeIcon } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useUser();
  const logoutMutation = useLogout();

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
            <span>LabTest</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <button
                className={`text-sm font-medium transition-colors ${
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

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">{user.name || user.username}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                data-testid="button-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth">
                <button 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" 
                  data-testid="button-login"
                >
                  Login
                </button>
              </Link>
              <Link href="/auth">
                <button 
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg" 
                  data-testid="button-signup"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
