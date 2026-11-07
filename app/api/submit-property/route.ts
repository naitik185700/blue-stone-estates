import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, createSubmission } from '@/lib/db';

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({ success: true, count: submissions.length, data: submissions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.ownerName || !body.phone || !body.propertyType || !body.intent || !body.location) {
      return NextResponse.json({ success: false, error: 'Required fields missing' }, { status: 400 });
    }

    const submission = await createSubmission({
      ownerName: body.ownerName,
      phone: body.phone,
      email: body.email || '',
      propertyType: body.propertyType,
      intent: body.intent,
      location: body.location,
      bhk: body.bhk || '',
      expectedPrice: body.expectedPrice || '',
      areaSqft: body.areaSqft ? Number(body.areaSqft) : undefined,
      notes: body.notes || '',
    });

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
