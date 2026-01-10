import { db } from "../lib/db"

async function migrateSchema() {
  console.log("Starting schema migration...")

  try {
    // Update GalleryImage table - add new fields
    console.log("Updating gallery_images table...")
    await db.$executeRaw`
      ALTER TABLE gallery_images 
      ADD COLUMN IF NOT EXISTS alt_text TEXT,
      ADD COLUMN IF NOT EXISTS tags TEXT,
      ALTER COLUMN category SET DEFAULT 'General'
    `

    // Update Location table - remove lat/long, add description and map
    console.log("Updating locations table...")
    await db.$executeRaw`
      ALTER TABLE locations 
      ADD COLUMN IF NOT EXISTS description TEXT,
      ADD COLUMN IF NOT EXISTS map_embed_url TEXT,
      DROP COLUMN IF EXISTS latitude,
      DROP COLUMN IF EXISTS longitude
    `

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

migrateSchema()
