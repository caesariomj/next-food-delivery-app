/*
  Warnings:

  - You are about to drop the column `reviewed_by` on the `restaurant_applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurant_applications" DROP COLUMN "reviewed_by",
ADD COLUMN     "business_cover_image" TEXT,
ADD COLUMN     "business_description" TEXT,
ADD COLUMN     "latitude" DECIMAL(9,6),
ADD COLUMN     "longitude" DECIMAL(9,6),
ADD COLUMN     "reviewed_by_id" TEXT;

-- AddForeignKey
ALTER TABLE "restaurant_applications" ADD CONSTRAINT "restaurant_applications_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
