/*
  Warnings:

  - You are about to drop the column `business_license` on the `restaurant_applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurant_applications" DROP COLUMN "business_license";

-- CreateTable
CREATE TABLE "restaurant_application_documents" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "application_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "document_url" TEXT NOT NULL,
    "document_number" TEXT,
    "issued_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_application_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_application_documents_public_id_key" ON "restaurant_application_documents"("public_id");

-- AddForeignKey
ALTER TABLE "restaurant_application_documents" ADD CONSTRAINT "restaurant_application_documents_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "restaurant_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
