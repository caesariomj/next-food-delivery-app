/*
  Warnings:

  - You are about to drop the column `rejection_reason` on the `restaurant_applications` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed_at` on the `restaurant_applications` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed_by_id` on the `restaurant_applications` table. All the data in the column will be lost.
  - You are about to drop the column `revision_notes` on the `restaurant_applications` table. All the data in the column will be lost.
  - You are about to drop the column `submitted_at` on the `restaurant_applications` table. All the data in the column will be lost.
  - Added the required column `administrative_area` to the `restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurant_applications" DROP CONSTRAINT "restaurant_applications_reviewed_by_id_fkey";

-- AlterTable
ALTER TABLE "restaurant_applications" DROP COLUMN "rejection_reason",
DROP COLUMN "reviewed_at",
DROP COLUMN "reviewed_by_id",
DROP COLUMN "revision_notes",
DROP COLUMN "submitted_at",
ADD COLUMN     "administrative_area" TEXT,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "locality" TEXT,
ALTER COLUMN "business_name" DROP NOT NULL,
ALTER COLUMN "business_phone" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "administrative_area" TEXT NOT NULL,
ADD COLUMN     "country_code" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "restaurant_application_status_histories" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "reviewed_by_id" TEXT,
    "status" "restaurant_application_status" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_application_status_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "restaurant_application_status_histories_application_id_crea_idx" ON "restaurant_application_status_histories"("application_id", "created_at");

-- AddForeignKey
ALTER TABLE "restaurant_application_status_histories" ADD CONSTRAINT "restaurant_application_status_histories_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "restaurant_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_application_status_histories" ADD CONSTRAINT "restaurant_application_status_histories_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
