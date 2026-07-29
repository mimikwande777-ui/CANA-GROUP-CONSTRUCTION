import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Downtown Commercial Hub',
    category: 'Commercial',
    image: '/images/project_commercial_1784945743789.jpg',
    description: 'A modern 15-story office building with energy-efficient glass facades and open-plan workspaces.',
  },
  {
    id: 2,
    title: 'Luxury Estate Renovation',
    category: 'Residential',
    image: '/images/project_residential_1784945754648.jpg',
    description: 'Complete framing and structural overhaul of a 5,000 sq ft luxury home in the suburbs.',
  },
  {
    id: 3,
    title: 'Northside Logistics Warehouse',
    category: 'Industrial',
    image: '/images/project_industrial_1784945765935.jpg',
    description: 'A 100,000 sq ft industrial facility featuring heavy-duty steel framing and advanced loading docks.',
  }
];

export default function ProjectsGallery() {
  return (
    <div className="py-16 bg-natural-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-natural-ink mb-4">Our Featured Projects</h1>
          <p className="text-lg text-natural-ink/70 max-w-2xl mx-auto">Explore some of our recent construction projects across various sectors. We take pride in our versatility and craftsmanship.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded shadow-sm border border-natural-ink/5 overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-bold text-natural-earth uppercase tracking-wider">{project.category}</span>
                <h3 className="text-xl font-bold text-natural-ink mt-2 mb-3">{project.title}</h3>
                <p className="text-natural-ink/70 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
