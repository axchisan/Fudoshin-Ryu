/*
  Warnings:

  - You are about to drop the column `latitude` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `locations` table. All the data in the column will be lost.
  - Made the column `category` on table `gallery_images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gallery_images" ADD COLUMN     "alt_text" TEXT,
ADD COLUMN     "tags" TEXT,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'General';

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "map_embed_url" TEXT;
