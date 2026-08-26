-- CreateEnum
CREATE TYPE "restaurant_status" AS ENUM ('onboarding', 'active', 'suspended', 'closed');

-- CreateEnum
CREATE TYPE "day_of_week" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- CreateEnum
CREATE TYPE "restaurant_application_status" AS ENUM ('draft', 'submitted', 'under_review', 'revision_required', 'resubmitted', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "logo_url" TEXT,
    "cover_image_url" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "status" "restaurant_status" NOT NULL DEFAULT 'onboarding',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_cuisines" (
    "restaurant_id" INTEGER NOT NULL,
    "cuisine_id" INTEGER NOT NULL,

    CONSTRAINT "restaurant_cuisines_pkey" PRIMARY KEY ("restaurant_id","cuisine_id")
);

-- CreateTable
CREATE TABLE "restaurant_operating_hours" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "day_of_week" "day_of_week" NOT NULL,
    "open_time" TIME,
    "close_time" TIME,

    CONSTRAINT "restaurant_operating_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_applications" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "status" "restaurant_application_status" NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_phone" TEXT NOT NULL,
    "business_email" TEXT,
    "business_image" TEXT,
    "address" TEXT NOT NULL,
    "business_license" TEXT,
    "rejection_reason" TEXT,
    "revision_notes" TEXT,
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_application_cuisines" (
    "restaurant_application_id" INTEGER NOT NULL,
    "cuisine_id" INTEGER NOT NULL,

    CONSTRAINT "restaurant_application_cuisines_pkey" PRIMARY KEY ("restaurant_application_id","cuisine_id")
);

-- CreateTable
CREATE TABLE "user_restaurants" (
    "user_id" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "user_restaurants_pkey" PRIMARY KEY ("user_id","restaurant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_public_id_key" ON "restaurants"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_slug_key" ON "restaurants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_operating_hours_restaurant_id_day_of_week_key" ON "restaurant_operating_hours"("restaurant_id", "day_of_week");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_applications_public_id_key" ON "restaurant_applications"("public_id");

-- AddForeignKey
ALTER TABLE "restaurant_cuisines" ADD CONSTRAINT "restaurant_cuisines_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_cuisines" ADD CONSTRAINT "restaurant_cuisines_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "cuisines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_operating_hours" ADD CONSTRAINT "restaurant_operating_hours_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_applications" ADD CONSTRAINT "restaurant_applications_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_application_cuisines" ADD CONSTRAINT "restaurant_application_cuisines_restaurant_application_id_fkey" FOREIGN KEY ("restaurant_application_id") REFERENCES "restaurant_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_application_cuisines" ADD CONSTRAINT "restaurant_application_cuisines_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "cuisines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restaurants" ADD CONSTRAINT "user_restaurants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restaurants" ADD CONSTRAINT "user_restaurants_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
