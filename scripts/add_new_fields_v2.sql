-- Script para agregar los nuevos campos a la base de datos existente

-- Agregar campos a GalleryImage
ALTER TABLE gallery_images 
ADD COLUMN IF NOT EXISTS date_taken TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS photographer VARCHAR(255),
ADD COLUMN IF NOT EXISTS location VARCHAR(255);

-- Agregar campos a Testimonial
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS response TEXT,
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);

-- Agregar campos a SiteSettings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS sensei_rank VARCHAR(100) DEFAULT '5to Dan',
ADD COLUMN IF NOT EXISTS sensei_experience_years INTEGER DEFAULT 20,
ADD COLUMN IF NOT EXISTS sensei_specialties VARCHAR(500) DEFAULT 'Kata, Kumite, Bunkai',
ADD COLUMN IF NOT EXISTS sensei_achievements TEXT,
ADD COLUMN IF NOT EXISTS dojo_founded_year INTEGER DEFAULT 2010,
ADD COLUMN IF NOT EXISTS dojo_description TEXT DEFAULT 'Escuela de Karate Shotokan tradicional JKA',
ADD COLUMN IF NOT EXISTS dojo_mission TEXT,
ADD COLUMN IF NOT EXISTS dojo_vision TEXT;

-- Mensaje de confirmación
SELECT 'Campos adicionales agregados correctamente' AS status;
