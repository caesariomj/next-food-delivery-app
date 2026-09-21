-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "administrative_area" TEXT,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "latitude" DECIMAL(9,6),
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "longitude" DECIMAL(9,6);
