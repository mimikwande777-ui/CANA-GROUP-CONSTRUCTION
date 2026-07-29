import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Hammer, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_construction_1784945730474.jpg" 
            alt="Construction site" 
            fill 
            className="object-cover brightness-50"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Building the Future, <br/><span className="text-natural-earth">Restoring the Past.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Calgary's premier construction partner. We deliver excellence in commercial, residential, and industrial projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="bg-natural-olive text-white font-bold px-8 py-4 rounded-sm text-lg hover:bg-natural-olive/90 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
              View Our Work <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="bg-white text-natural-ink font-bold px-8 py-4 rounded-sm text-lg hover:bg-white/90 transition-colors flex items-center justify-center uppercase tracking-wide">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-natural-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-natural-ink mb-4">Why Choose Cana Group?</h2>
            <p className="text-lg text-natural-ink/70 max-w-2xl mx-auto">We bring decades of expertise, unwavering commitment to safety, and exceptional craftsmanship to every site.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-natural-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-natural-olive" />
              </div>
              <h3 className="text-xl font-bold text-natural-ink mb-3">Expert Engineering</h3>
              <p className="text-natural-ink/80">Our team of experienced engineers and architects ensure structural integrity and innovative design.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-natural-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-natural-olive" />
              </div>
              <h3 className="text-xl font-bold text-natural-ink mb-3">Safety First</h3>
              <p className="text-natural-ink/80">We maintain the highest safety standards in the industry, protecting our workers and your investment.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-natural-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Hammer className="w-8 h-8 text-natural-olive" />
              </div>
              <h3 className="text-xl font-bold text-natural-ink mb-3">Quality Craftsmanship</h3>
              <p className="text-natural-ink/80">We source premium materials and employ skilled tradesmen to deliver flawless finishes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
