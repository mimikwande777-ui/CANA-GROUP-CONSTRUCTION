'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Inbox, Briefcase, Mail, Calendar, User, Phone } from 'lucide-react';
import type { Inquiry } from '@/app/api/inquiries/route';
import type { Application } from '@/app/api/applications/route';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'applications'>('inquiries');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [inqRes, appRes] = await Promise.all([
          fetch('/api/inquiries'),
          fetch('/api/applications')
        ]);
        
        if (inqRes.ok) setInquiries(await inqRes.json());
        if (appRes.ok) setApplications(await appRes.json());
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-natural-bg py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-natural-ink">Admin Dashboard</h1>
          <p className="text-natural-ink/70 mt-2">Manage customer inquiries and job applications.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded border border-natural-ink/10 shadow-sm flex items-center gap-4">
            <div className="bg-natural-slate p-4 rounded text-natural-olive">
              <Inbox className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-natural-ink/60">Total Inquiries</p>
              <h3 className="text-3xl font-bold text-natural-ink">{inquiries.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded border border-natural-ink/10 shadow-sm flex items-center gap-4">
            <div className="bg-natural-slate p-4 rounded text-natural-olive">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-natural-ink/60">Job Applications</p>
              <h3 className="text-3xl font-bold text-natural-ink">{applications.length}</h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-natural-ink/10">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-4 px-2 font-bold text-sm tracking-wide uppercase border-b-2 transition-colors ${activeTab === 'inquiries' ? 'border-natural-olive text-natural-ink' : 'border-transparent text-natural-ink/50 hover:text-natural-ink/80'}`}
          >
            Contact Inquiries
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-4 px-2 font-bold text-sm tracking-wide uppercase border-b-2 transition-colors ${activeTab === 'applications' ? 'border-natural-olive text-natural-ink' : 'border-transparent text-natural-ink/50 hover:text-natural-ink/80'}`}
          >
            Job Applications
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded border border-natural-ink/10 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-natural-ink/60">Loading data...</div>
          ) : activeTab === 'inquiries' ? (
            inquiries.length === 0 ? (
              <div className="p-12 text-center text-natural-ink/60">No inquiries received yet.</div>
            ) : (
              <ul className="divide-y divide-natural-ink/10">
                {inquiries.slice().reverse().map((inq) => (
                  <li key={inq.id} className="p-6 hover:bg-natural-bg transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-natural-ink">{inq.subject}</h4>
                      <span className="text-sm text-natural-ink/60 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(inq.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <div className="flex gap-4 mb-4 text-sm text-natural-ink/70">
                      <span className="flex items-center gap-1"><User className="w-4 h-4"/> {inq.name}</span>
                      <span className="flex items-center gap-1"><Mail className="w-4 h-4"/> <a href={`mailto:${inq.email}`} className="text-natural-olive hover:underline">{inq.email}</a></span>
                      {inq.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4"/> {inq.phone}</span>}
                    </div>
                    <div className="bg-natural-bg p-4 rounded-sm text-natural-ink/80 text-sm whitespace-pre-wrap border border-natural-ink/5">
                      {inq.message}
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            applications.length === 0 ? (
              <div className="p-12 text-center text-natural-ink/60">No job applications received yet.</div>
            ) : (
              <ul className="divide-y divide-natural-ink/10">
                {applications.slice().reverse().map((app) => (
                  <li key={app.id} className="p-6 hover:bg-natural-bg transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="inline-block px-2 py-1 bg-natural-slate text-natural-ink text-xs font-bold uppercase tracking-wide rounded-sm mb-2">{app.position}</span>
                        <h4 className="text-lg font-bold text-natural-ink">{app.name}</h4>
                      </div>
                      <span className="text-sm text-natural-ink/60 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(app.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-natural-ink/70">
                      <span className="flex items-center gap-1"><Mail className="w-4 h-4"/> <a href={`mailto:${app.email}`} className="text-natural-olive hover:underline">{app.email}</a></span>
                      <span className="flex items-center gap-1"><Phone className="w-4 h-4"/> {app.phone}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> Exp: {app.experience} years</span>
                    </div>
                    <div className="bg-natural-bg p-4 rounded-sm text-natural-ink/80 text-sm whitespace-pre-wrap border border-natural-ink/5">
                      <span className="font-bold block mb-1">Cover Letter:</span>
                      {app.coverLetter}
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
}
