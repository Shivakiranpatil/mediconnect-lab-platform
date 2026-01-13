import { Link, useLocation } from "wouter";
import { useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sparkles, User, Menu } from "lucide-react";
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

  const navLinks = [
    { href: "/tests", label: "Browse Tests" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/labs", label: "Partner Labs" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
            Medi<span className="text-blue-600">Connect</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/how-it-works", label: "How it Works" },
            { href: "/labs", label: "Lab Partners" },
            { href: "/faqs", label: "FAQs" },
            { href: "/contact", label: "Contact Us" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`text-sm font-bold transition-colors cursor-pointer ${
                  location === link.href
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
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
                <Button variant="ghost" className="text-slate-900 font-bold hover:bg-slate-50 rounded-xl px-6 h-11">
                  Login
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all rounded-xl px-6 h-11 font-bold">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div 
                className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </div>
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100">
             <Link href="/auth">
               <Button className="w-full justify-center bg-blue-600 text-white rounded-xl py-6">
                 Sign In / Register
               </Button>
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
