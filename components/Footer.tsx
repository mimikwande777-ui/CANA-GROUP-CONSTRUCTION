import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-natural-ink text-white/60 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Cana Group Construction</h3>
            <p className="mb-4">Building excellence in every project. We are committed to quality, safety, and delivering on time.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
            <p>5720 4 St SE #100</p>
            <p>Calgary, AB T2H 1K7</p>
            <p className="mt-2">Email: <a href="mailto:companiescanagroup@gmail.com" className="text-natural-earth hover:underline">companiescanagroup@gmail.com</a></p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/projects" className="hover:text-white transition-colors">Our Projects</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Cana Group Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
