-- BlueStone Estates - PostgreSQL Database Schema
-- Location: Sector 69, Gurgaon
-- Phone/WhatsApp: 9818014595

-- 1. Enable UUID Extension (optional)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tagline TEXT,
  type VARCHAR(50) NOT NULL,            -- 'flat', 'builder_floor', 'plot', 'commercial', 'penthouse'
  intent VARCHAR(20) NOT NULL,          -- 'sale', 'rent'
  price NUMERIC NOT NULL,
  price_display VARCHAR(50) NOT NULL,
  price_per_sqft NUMERIC,
  bhk INT DEFAULT 0,
  bathrooms INT DEFAULT 1,
  balconies INT DEFAULT 1,
  area_sqft NUMERIC NOT NULL,
  plot_size_yards NUMERIC,
  floor VARCHAR(100),
  furnishing VARCHAR(50),
  facing VARCHAR(50),
  location VARCHAR(150) NOT NULL,       -- e.g. 'Sector 69, Gurgaon'
  sub_locality VARCHAR(200),
  status VARCHAR(50) NOT NULL,          -- 'Ready to Move', 'Under Construction', 'Pre-Launch'
  possession_date VARCHAR(100),
  rera_id VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE,
  is_hot_deal BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT TRUE,
  images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  nearby_places JSONB DEFAULT '[]'::jsonb,
  agent_name VARCHAR(100) DEFAULT 'BlueStone Estate Advisor',
  agent_phone VARCHAR(30) DEFAULT '9818014595',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_intent ON properties(intent);
CREATE INDEX IF NOT EXISTS idx_properties_bhk ON properties(bhk);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(is_featured);

-- 3. Inquiries Table (Site visits, Callbacks, WhatsApp leads)
CREATE TABLE IF NOT EXISTS inquiries (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(150),
  property_id VARCHAR(64) REFERENCES properties(id) ON DELETE SET NULL,
  property_title VARCHAR(255),
  inquiry_type VARCHAR(50) NOT NULL,   -- 'site_visit', 'call_back', 'whatsapp', 'price_breakdown', 'general'
  preferred_date VARCHAR(50),
  preferred_time VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'New',    -- 'New', 'Contacted', 'Site Visit Fixed', 'Closed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- 4. Property Submissions Table (Owners listing for Sale/Rent)
CREATE TABLE IF NOT EXISTS property_submissions (
  id VARCHAR(64) PRIMARY KEY,
  owner_name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(150),
  property_type VARCHAR(50) NOT NULL,
  intent VARCHAR(20) NOT NULL,
  location VARCHAR(150) NOT NULL,
  bhk VARCHAR(30),
  expected_price VARCHAR(50),
  area_sqft NUMERIC,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'Pending Review',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON property_submissions(status);
