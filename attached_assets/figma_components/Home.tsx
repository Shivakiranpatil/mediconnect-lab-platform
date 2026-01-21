import { Header } from './home/Header';
import { Hero } from './home/Hero';
import { Features } from './home/Features';
import { Steps } from './home/Steps';
import { TestBundles } from './home/TestBundles';
import { Partners } from './home/Partners';
import { Footer } from './home/Footer';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#grad1)" />
          <path d="M0,200 Q300,150 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#grad1)" opacity="0.5" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <Header onNavigate={onNavigate} />
        <Hero onNavigate={onNavigate} />
        <Features />
        <Steps onNavigate={onNavigate} />
        <TestBundles onNavigate={onNavigate} />
        <Partners />
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}