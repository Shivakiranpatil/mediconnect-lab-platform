import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string }
  | { name: 'blood-sugar-info' };

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'How It Works', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
    ],
    tests: [
      { name: 'Browse All Tests', href: '#' },
      { name: 'Test Bundles', href: '#', action: () => onNavigate({ name: 'bundles' }) },
      { name: "Women's Health", href: '#' },
      { name: "Men's Health", href: '#' },
      { name: 'Blood Sugar Guide', href: '#', action: () => onNavigate({ name: 'blood-sugar-info' }) },
    ],
    partners: [
      { name: 'Lab Partner Portal', href: '/lab' },
      { name: 'Become a Partner', href: '#' },
      { name: 'Partner Benefits', href: '#' },
      { name: 'Admin Portal', href: '/admin' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Contact Support', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:bg-blue-700' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 relative overflow-hidden mt-8 sm:mt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand Section - Spans 2 columns */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 group cursor-pointer">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-lg sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  LabConnect
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 leading-relaxed max-w-xs">
                AI-powered lab test discovery and booking platform for Dubai, UAE. Get personalized health test recommendations in minutes.
              </p>

              {/* Contact Info - Compact on mobile */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <a href="tel:+97141234567" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span>+971 4 123 4567</span>
                </a>
                <a href="mailto:support@labconnect.ae" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="hidden sm:inline">support@labconnect.ae</span>
                  <span className="sm:hidden">Email Support</span>
                </a>
                <a href="https://wa.me/971412345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-green-400 transition-colors group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span>WhatsApp Support</span>
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className={`w-9 h-9 sm:w-11 sm:h-11 bg-gray-800/50 backdrop-blur rounded-lg sm:rounded-xl flex items-center justify-center ${social.color} hover:scale-110 hover:-translate-y-1 transition-all duration-300 group border border-gray-700 hover:border-transparent shadow-lg`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">Company</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tests Links */}
            <div>
              <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">Tests & Bundles</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {footerLinks.tests.map((link) => (
                  <li key={link.name}>
                    {link.action ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          link.action();
                        }}
                        className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300 cursor-pointer text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Partners Links */}
            <div>
              <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">For Partners</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {footerLinks.partners.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">Support</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-400">
                &copy; {currentYear} LabConnect. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-400">Dubai Healthcare City, UAE</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl sm:rounded-2xl border border-blue-800/30 backdrop-blur">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                <span className="text-amber-400 font-semibold">⚠️ Important Notice:</span> This platform is for educational purposes only and does not provide medical advice, diagnosis, or treatment. 
                All test recommendations are non-clinical suggestions. Please consult with a licensed healthcare professional or contact your chosen lab directly to confirm test appropriateness for your specific health needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}