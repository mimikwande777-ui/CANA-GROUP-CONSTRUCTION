import Link from 'next/link';
import { Menu, X, HardHat } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-natural-ink text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 border-b border-white/20 pb-1">
            <HardHat className="h-8 w-8 text-natural-olive" />
            <Link href="/" className="font-bold text-xl tracking-tighter uppercase">
              Cana Group <span className="text-natural-olive">Construction</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 text-sm font-semibold tracking-wide uppercase">
              <Link href="/" className="text-white/60 hover:text-white transition-colors px-3 py-2">Home</Link>
              <Link href="/projects" className="text-white/60 hover:text-white transition-colors px-3 py-2">Projects</Link>
              <Link href="/careers" className="text-white/60 hover:text-white transition-colors px-3 py-2">Careers</Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors px-3 py-2">Contact</Link>
              <Link href="/admin/dashboard" className="bg-natural-olive text-white hover:bg-natural-olive/90 transition-colors px-4 py-2 rounded-sm ml-4">Admin</Link>
            </div>
          </div>
          {/* Mobile menu button could go here - simplified for now */}
        </div>
      </div>
    </nav>
  );
}
