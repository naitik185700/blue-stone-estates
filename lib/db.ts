import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { Property, Inquiry, PropertySubmission, SearchFilters } from './types';

// Read JSON fallback datasets
const dataDir = path.join(process.cwd(), 'data');
const propertiesFilePath = path.join(dataDir, 'properties.json');
const inquiriesFilePath = path.join(dataDir, 'inquiries.json');
const submissionsFilePath = path.join(dataDir, 'submissions.json');

// Ensure data folder and fallback files exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readJsonFile<T>(filePath: string, fallback: T[]): T[] {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
    return fallback;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// PostgreSQL Connection configuration
const connectionString = process.env.DATABASE_URL || 'postgresql://bluestone:bluestone_password_2026@localhost:5432/bluestone_estates';

let pool: Pool | null = null;
let isPostgresAvailable: boolean | null = null;

export function getPgPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function checkPostgresConnection(): Promise<boolean> {
  if (isPostgresAvailable !== null) return isPostgresAvailable;
  try {
    const p = getPgPool();
    const res = await p.query('SELECT 1');
    if (res) {
      isPostgresAvailable = true;
      console.log('✅ Connected to PostgreSQL database successfully.');
      return true;
    }
  } catch (err) {
    isPostgresAvailable = false;
    console.warn('ℹ️ PostgreSQL not active locally. Using high-speed JSON persistent store seamlessly.');
  }
  return false;
}

// 1. GET PROPERTIES
export async function getProperties(filters?: SearchFilters): Promise<Property[]> {
  const usePg = await checkPostgresConnection();
  let properties: Property[] = [];

  if (usePg && pool) {
    try {
      let query = 'SELECT * FROM properties WHERE 1=1';
      const params: any[] = [];
      let idx = 1;

      if (filters?.intent) {
        query += ` AND intent = $${idx++}`;
        params.push(filters.intent);
      }
      if (filters?.type && filters.type !== 'all') {
        query += ` AND type = $${idx++}`;
        params.push(filters.type);
      }
      if (filters?.bhk && filters.bhk !== 'all') {
        query += ` AND bhk = $${idx++}`;
        params.push(parseInt(filters.bhk, 10));
      }
      if (filters?.minPrice) {
        query += ` AND price >= $${idx++}`;
        params.push(filters.minPrice);
      }
      if (filters?.maxPrice) {
        query += ` AND price <= $${idx++}`;
        params.push(filters.maxPrice);
      }
      if (filters?.status && filters.status !== 'all') {
        query += ` AND status = $${idx++}`;
        params.push(filters.status);
      }
      if (filters?.keyword) {
        query += ` AND (title ILIKE $${idx} OR location ILIKE $${idx} OR sub_locality ILIKE $${idx} OR description ILIKE $${idx})`;
        params.push(`%${filters.keyword}%`);
        idx++;
      }

      query += ' ORDER BY is_featured DESC, price DESC';

      const res = await pool.query(query, params);
      return res.rows.map(row => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        tagline: row.tagline,
        type: row.type,
        intent: row.intent,
        price: parseFloat(row.price),
        priceDisplay: row.price_display,
        pricePerSqft: parseFloat(row.price_per_sqft),
        bhk: row.bhk,
        bathrooms: row.bathrooms,
        balconies: row.balconies,
        areaSqft: parseFloat(row.area_sqft),
        plotSizeYards: row.plot_size_yards ? parseFloat(row.plot_size_yards) : undefined,
        floor: row.floor,
        furnishing: row.furnishing,
        facing: row.facing,
        location: row.location,
        subLocality: row.sub_locality,
        status: row.status,
        possessionDate: row.possession_date,
        reraId: row.rera_id,
        isFeatured: row.is_featured,
        isHotDeal: row.is_hot_deal,
        isVerified: row.is_verified,
        images: Array.isArray(row.images) ? row.images : JSON.parse(row.images || '[]'),
        description: row.description,
        highlights: Array.isArray(row.highlights) ? row.highlights : JSON.parse(row.highlights || '[]'),
        amenities: Array.isArray(row.amenities) ? row.amenities : JSON.parse(row.amenities || '[]'),
        nearbyPlaces: Array.isArray(row.nearby_places) ? row.nearby_places : JSON.parse(row.nearby_places || '[]'),
        agentName: row.agent_name,
        agentPhone: row.agent_phone,
        createdAt: row.created_at,
      }));
    } catch (err) {
      console.error('Error querying PostgreSQL, falling back to local storage:', err);
    }
  }

  // Fallback
  properties = readJsonFile<Property>(propertiesFilePath, []);

  // Filter in-memory
  return properties.filter(p => {
    if (filters?.intent && p.intent !== filters.intent) return false;
    if (filters?.type && filters.type !== 'all' && p.type !== filters.type) return false;
    if (filters?.bhk && filters.bhk !== 'all' && p.bhk !== parseInt(filters.bhk, 10)) return false;
    if (filters?.minPrice && p.price < filters.minPrice) return false;
    if (filters?.maxPrice && p.price > filters.maxPrice) return false;
    if (filters?.status && filters.status !== 'all' && p.status !== filters.status) return false;
    if (filters?.keyword) {
      const q = filters.keyword.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.subLocality.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

// 2. GET PROPERTY BY ID OR SLUG
export async function getPropertyById(idOrSlug: string): Promise<Property | null> {
  const properties = await getProperties();
  return properties.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

// 3. CREATE PROPERTY
export async function createProperty(prop: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
  const newProp: Property = {
    ...prop,
    id: `bs-prop-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  const usePg = await checkPostgresConnection();
  if (usePg && pool) {
    try {
      await pool.query(
        `INSERT INTO properties (
          id, title, slug, tagline, type, intent, price, price_display, price_per_sqft,
          bhk, bathrooms, balconies, area_sqft, plot_size_yards, floor, furnishing,
          facing, location, sub_locality, status, possession_date, rera_id,
          is_featured, is_hot_deal, is_verified, images, description, highlights,
          amenities, nearby_places, agent_name, agent_phone, created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33)`,
        [
          newProp.id, newProp.title, newProp.slug, newProp.tagline, newProp.type, newProp.intent,
          newProp.price, newProp.priceDisplay, newProp.pricePerSqft, newProp.bhk, newProp.bathrooms,
          newProp.balconies, newProp.areaSqft, newProp.plotSizeYards || null, newProp.floor,
          newProp.furnishing, newProp.facing, newProp.location, newProp.subLocality, newProp.status,
          newProp.possessionDate, newProp.reraId, newProp.isFeatured, newProp.isHotDeal,
          newProp.isVerified, JSON.stringify(newProp.images), newProp.description,
          JSON.stringify(newProp.highlights), JSON.stringify(newProp.amenities),
          JSON.stringify(newProp.nearbyPlaces), newProp.agentName, newProp.agentPhone,
          newProp.createdAt,
        ]
      );
    } catch (err) {
      console.error('Error inserting to PostgreSQL, writing to JSON:', err);
    }
  }

  const existing = readJsonFile<Property>(propertiesFilePath, []);
  existing.unshift(newProp);
  writeJsonFile(propertiesFilePath, existing);
  return newProp;
}

// 4. INQUIRIES
export async function getInquiries(): Promise<Inquiry[]> {
  const usePg = await checkPostgresConnection();
  if (usePg && pool) {
    try {
      const res = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email,
        propertyId: r.property_id,
        propertyTitle: r.property_title,
        inquiryType: r.inquiry_type,
        preferredDate: r.preferred_date,
        preferredTime: r.preferred_time,
        message: r.message,
        status: r.status,
        createdAt: r.created_at,
      }));
    } catch (err) {
      console.error('Error getting inquiries from PostgreSQL:', err);
    }
  }
  return readJsonFile<Inquiry>(inquiriesFilePath, []);
}

export async function createInquiry(data: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  const usePg = await checkPostgresConnection();
  if (usePg && pool) {
    try {
      await pool.query(
        `INSERT INTO inquiries (id, name, phone, email, property_id, property_title, inquiry_type, preferred_date, preferred_time, message, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          newInquiry.id,
          newInquiry.name,
          newInquiry.phone,
          newInquiry.email || null,
          newInquiry.propertyId || null,
          newInquiry.propertyTitle || null,
          newInquiry.inquiryType,
          newInquiry.preferredDate || null,
          newInquiry.preferredTime || null,
          newInquiry.message || null,
          newInquiry.status,
          newInquiry.createdAt,
        ]
      );
    } catch (err) {
      console.error('Error saving inquiry to PostgreSQL:', err);
    }
  }

  const existing = readJsonFile<Inquiry>(inquiriesFilePath, []);
  existing.unshift(newInquiry);
  writeJsonFile(inquiriesFilePath, existing);
  return newInquiry;
}

// 5. PROPERTY SUBMISSIONS (Post Property Free)
export async function getSubmissions(): Promise<PropertySubmission[]> {
  const usePg = await checkPostgresConnection();
  if (usePg && pool) {
    try {
      const res = await pool.query('SELECT * FROM property_submissions ORDER BY created_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        ownerName: r.owner_name,
        phone: r.phone,
        email: r.email,
        propertyType: r.property_type,
        intent: r.intent,
        location: r.location,
        bhk: r.bhk,
        expectedPrice: r.expected_price,
        areaSqft: r.area_sqft ? parseFloat(r.area_sqft) : undefined,
        notes: r.notes,
        status: r.status,
        createdAt: r.created_at,
      }));
    } catch (err) {
      console.error('Error fetching submissions from PostgreSQL:', err);
    }
  }
  return readJsonFile<PropertySubmission>(submissionsFilePath, []);
}

export async function createSubmission(data: Omit<PropertySubmission, 'id' | 'status' | 'createdAt'>): Promise<PropertySubmission> {
  const newSubmission: PropertySubmission = {
    ...data,
    id: `sub-${Date.now()}`,
    status: 'Pending Review',
    createdAt: new Date().toISOString(),
  };

  const usePg = await checkPostgresConnection();
  if (usePg && pool) {
    try {
      await pool.query(
        `INSERT INTO property_submissions (id, owner_name, phone, email, property_type, intent, location, bhk, expected_price, area_sqft, notes, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          newSubmission.id,
          newSubmission.ownerName,
          newSubmission.phone,
          newSubmission.email || null,
          newSubmission.propertyType,
          newSubmission.intent,
          newSubmission.location,
          newSubmission.bhk,
          newSubmission.expectedPrice,
          newSubmission.areaSqft || null,
          newSubmission.notes || null,
          newSubmission.status,
          newSubmission.createdAt,
        ]
      );
    } catch (err) {
      console.error('Error inserting submission into PostgreSQL:', err);
    }
  }

  const existing = readJsonFile<PropertySubmission>(submissionsFilePath, []);
  existing.unshift(newSubmission);
  writeJsonFile(submissionsFilePath, existing);
  return newSubmission;
}
