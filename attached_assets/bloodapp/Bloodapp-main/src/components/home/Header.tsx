import { Home as HomeIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'How It Works', 'Lab Partners', 'FAQs', 'Contact Us'];

  return (
    <header className="px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand - visible on mobile */}
        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <HomeIcon className="w-5 h-5" />
          <span className="hidden sm:inline">LabTest</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => index === 0 && onNavigate({ name: 'home' })}
              className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                index === 0
                  ? 'text-blue-600 bg-blue-50 px-4 py-2 rounded-lg'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Auth buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <button className="px-4 sm:px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Login
          </button>
          <button className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  if (index === 0) onNavigate({ name: 'home' });
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  index === 0
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            ))}
            <div className="flex flex-col gap-2 mt-2 px-4">
              <button className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors text-left">
                Login
              </button>
              <button className="py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-center">
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}