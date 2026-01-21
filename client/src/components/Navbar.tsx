import { Link, useLocation } from "wouter";
import { useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Menu, X, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'How It Works', 'Lab Partners', 'FAQs', 'Contact Us'];

  return (
    <header className="px-4 sm:px-6 py-4" data-testid="navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-lg cursor-pointer" data-testid="logo">
            <HomeIcon className="w-5 h-5" />
            <span className="hidden sm:inline">MediConnect</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link 
              key={item} 
              href={index === 0 ? "/" : index === 1 ? "/how-it-works" : index === 2 ? "/labs" : "#"}
            >
              <button
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  (index === 0 && location === "/") 
                    ? 'text-blue-600 bg-blue-50 px-4 py-2 rounded-lg'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                data-testid={`nav-${item.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item}
              </button>
            </Link>
          ))}
        </nav>

        {/* Auth buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{user.name || user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Appointments</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth">
                <button className="px-4 sm:px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" data-testid="button-login">
                  Login
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg" data-testid="button-signup">
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
            {navItems.map((item, index) => (
              <Link 
                key={item} 
                href={index === 0 ? "/" : index === 1 ? "/how-it-works" : index === 2 ? "/labs" : "#"}
              >
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-left w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    (index === 0 && location === "/")
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2 px-4">
              <Link href="/auth">
                <button className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors text-left">
                  Login
                </button>
              </Link>
              <Link href="/auth">
                <button className="py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-center w-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
