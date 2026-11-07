import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    const inquiry = await createInquiry({
      name: body.name,
      phone: body.phone,
      email: body.email,
      propertyId: body.propertyId,
      propertyTitle: body.propertyTitle,
      inquiryType: body.inquiryType || 'general',
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      message: body.message,
    });

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
