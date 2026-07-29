'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Failed to submit');
      
      setIsSuccess(true);
      reset();
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-natural-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-natural-ink mb-4">Contact Us</h1>
          <p className="text-lg text-natural-ink/70 max-w-2xl mx-auto">Have a project in mind? Reach out to us for a consultation or quote.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-natural-ink mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-natural-slate p-3 rounded-full text-natural-olive">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-natural-ink">Head Office</h3>
                  <p className="text-natural-ink/70 mt-1">5720 4 St SE #100<br/>Calgary, AB T2H 1K7</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-natural-slate p-3 rounded-full text-natural-olive">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-natural-ink">Email Us</h3>
                  <p className="text-natural-ink/70 mt-1">
                    <a href="mailto:companiescanagroup@gmail.com" className="hover:text-natural-olive">companiescanagroup@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-natural-slate p-3 rounded-full text-natural-olive">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-natural-ink">Call Us</h3>
                  <p className="text-natural-ink/70 mt-1">Available Mon-Fri, 8am-5pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded border border-natural-ink/10 shadow-sm">
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-natural-olive mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-natural-ink mb-2">Message Sent!</h3>
                <p className="text-natural-ink/70 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-natural-ink text-white px-6 py-2 rounded-sm font-medium hover:bg-natural-ink/90 uppercase tracking-wide text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMsg && <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm">{errorMsg}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-natural-ink/80 mb-1">Full Name</label>
                    <input 
                      {...register('name')}
                      className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none transition-shadow text-sm"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-natural-ink/80 mb-1">Email Address</label>
                    <input 
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none transition-shadow text-sm"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-ink/80 mb-1">Phone Number (Optional)</label>
                  <input 
                    {...register('phone')}
                    className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none transition-shadow text-sm"
                    placeholder="(403) 555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-ink/80 mb-1">Subject</label>
                  <input 
                    {...register('subject')}
                    className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none transition-shadow text-sm"
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-ink/80 mb-1">Message</label>
                  <textarea 
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-2 border border-[#D1D1CB] rounded-sm focus:ring-1 focus:ring-natural-olive focus:border-natural-olive outline-none transition-shadow resize-none text-sm"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-natural-olive text-white font-bold py-3 px-4 rounded-sm hover:bg-natural-olive/90 transition-colors disabled:opacity-70 uppercase tracking-wide text-sm"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
