'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ChevronDown, Briefcase } from 'lucide-react';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  position: z.string().min(2, 'Please select a position'),
  experience: z.string().min(1, 'Please select your experience level'),
  coverLetter: z.string().min(10, 'Please provide some details about your qualifications'),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const jobOpenings = [
  { id: 1, title: 'Senior Project Manager', type: 'Full-time', location: 'Calgary, AB' },
  { id: 2, title: 'Site Supervisor', type: 'Full-time', location: 'Calgary, AB' },
  { id: 3, title: 'Heavy Equipment Operator', type: 'Full-time', location: 'Various Sites' },
  { id: 4, title: 'Journeyman Carpenter', type: 'Full-time', location: 'Various Sites' },
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyClick = (title: string) => {
    setSelectedPosition(title);
    setValue('position', title);
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-natural-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/careers_construction_1784945775570.jpg" 
            alt="Construction workers on site" 
            fill 
            className="object-cover brightness-50"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Join Our Team</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Build your career with Calgary's most trusted construction company.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold text-natural-ink mb-8 flex items-center gap-3">
              <Briefcase className="text-natural-olive" /> Current Openings
            </h2>
            <div className="space-y-4">
              {jobOpenings.map((job) => (
                <div key={job.id} className="border border-natural-ink/10 rounded-sm p-6 hover:border-natural-olive transition-colors bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-natural-ink">{job.title}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-natural-ink/70">
                        <span>{job.type}</span>
                        <span>&bull;</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job.title)}
                    className="text-natural-olive font-bold hover:text-natural-olive/80 text-sm flex items-center gap-1"
                  >
                    Apply Now <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div id="application-form" className="bg-white border border-natural-ink/10 rounded p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-natural-ink mb-6">Submit Your Application</h2>
            
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-natural-olive mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-natural-ink mb-2">Application Received!</h3>
                <p className="text-natural-ink/70">Thank you for your interest. Our HR team will review your application and contact you soon.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 bg-natural-ink text-white px-6 py-2 rounded-sm font-medium uppercase tracking-wide text-sm"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-natural-ink/80 mb-1">Full Name</label>
                    <input 
                      {...register('name')}
                      className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-natural-ink/80 mb-1">Email Address</label>
                    <input 
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none text-sm"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-natural-ink/80 mb-1">Phone Number</label>
                    <input 
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none text-sm"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-natural-ink/80 mb-1">Position Applying For</label>
                    <select 
                      {...register('position')}
                      className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none bg-white text-sm"
                      defaultValue={selectedPosition}
                    >
                      <option value="">Select a position...</option>
                      {jobOpenings.map(job => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                      <option value="Other">Other / General Application</option>
                    </select>
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-ink/80 mb-1">Years of Experience</label>
                  <select 
                    {...register('experience')}
                    className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none bg-white text-sm"
                  >
                    <option value="">Select experience level...</option>
                    <option value="0-2">0-2 years (Entry Level)</option>
                    <option value="3-5">3-5 years (Intermediate)</option>
                    <option value="5-10">5-10 years (Senior)</option>
                    <option value="10+">10+ years (Expert)</option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-ink/80 mb-1">Cover Letter / Details</label>
                  <textarea 
                    {...register('coverLetter')}
                    rows={4}
                    className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none resize-none text-sm"
                    placeholder="Briefly describe your qualifications and why you'd be a good fit..."
                  />
                  {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-natural-ink text-white font-bold py-3 px-4 rounded-sm hover:bg-natural-ink/90 transition-colors disabled:opacity-70 uppercase tracking-wide text-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
