import { NextRequest, NextResponse } from 'next/server';
import { getProperties, createProperty } from '@/lib/db';
import { SearchFilters, PropertyType, PropertyIntent } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: SearchFilters = {
      intent: (searchParams.get('intent') as PropertyIntent) || undefined,
      type: (searchParams.get('type') as PropertyType | 'all') || undefined,
      bhk: searchParams.get('bhk') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      status: searchParams.get('status') || undefined,
      keyword: searchParams.get('keyword') || undefined,
    };

    const properties = await getProperties(filters);
    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error: any) {
    console.error('API /api/properties error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.type || !body.price || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory fields: title, type, price, location' },
        { status: 400 }
      );
    }

    const newProperty = await createProperty(body);
    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    console.error('API POST /api/properties error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
