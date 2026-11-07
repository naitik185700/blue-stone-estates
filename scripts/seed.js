import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://bluestone:bluestone_password_2026@localhost:5432/bluestone_estates';
const pool = new Pool({ connectionString });

async function seed() {
  console.log('Connecting to PostgreSQL...');
  try {
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Executing schema.sql...');
    await pool.query(schemaSql);
    console.log('Schema created successfully.');

    const propertiesPath = path.join(process.cwd(), 'data', 'properties.json');
    const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

    console.log(`Seeding ${properties.length} properties...`);
    for (const prop of properties) {
      await pool.query(
        `INSERT INTO properties (
          id, title, slug, tagline, type, intent, price, price_display, price_per_sqft,
          bhk, bathrooms, balconies, area_sqft, plot_size_yards, floor, furnishing,
          facing, location, sub_locality, status, possession_date, rera_id,
          is_featured, is_hot_deal, is_verified, images, description, highlights,
          amenities, nearby_places, agent_name, agent_phone, created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          price = EXCLUDED.price,
          price_display = EXCLUDED.price_display,
          updated_at = NOW();`,
        [
          prop.id, prop.title, prop.slug, prop.tagline, prop.type, prop.intent,
          prop.price, prop.priceDisplay, prop.pricePerSqft, prop.bhk, prop.bathrooms,
          prop.balconies, prop.areaSqft, prop.plotSizeYards || null, prop.floor,
          prop.furnishing, prop.facing, prop.location, prop.subLocality, prop.status,
          prop.possessionDate, prop.reraId, prop.isFeatured, prop.isHotDeal,
          prop.isVerified, JSON.stringify(prop.images), prop.description,
          JSON.stringify(prop.highlights), JSON.stringify(prop.amenities),
          JSON.stringify(prop.nearbyPlaces), prop.agentName, prop.agentPhone,
          prop.createdAt
        ]
      );
    }

    console.log('✅ PostgreSQL seeding completed successfully!');
  } catch (err) {
    console.error('Error during PostgreSQL seed:', err);
  } finally {
    await pool.end();
  }
}

seed();
