import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export type Inquiry = z.infer<typeof inquirySchema> & {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed';
};

export async function GET() {
  const inquiries = await readData<Inquiry>('inquiries.json');
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = inquirySchema.parse(body);
    
    const newInquiry: Inquiry = {
      ...validatedData,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    
    const inquiries = await readData<Inquiry>('inquiries.json');
    inquiries.push(newInquiry);
    await writeData('inquiries.json', inquiries);
    
    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
  }
}
