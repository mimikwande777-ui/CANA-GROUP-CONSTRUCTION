import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { z } from 'zod';

const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  position: z.string().min(2),
  experience: z.string(),
  coverLetter: z.string().min(10),
});

export type Application = z.infer<typeof applicationSchema> & {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'interviewing' | 'rejected';
};

export async function GET() {
  const apps = await readData<Application>('applications.json');
  return NextResponse.json(apps);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = applicationSchema.parse(body);
    
    const newApp: Application = {
      ...validatedData,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    
    const apps = await readData<Application>('applications.json');
    apps.push(newApp);
    await writeData('applications.json', apps);
    
    return NextResponse.json({ success: true, application: newApp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
  }
}
