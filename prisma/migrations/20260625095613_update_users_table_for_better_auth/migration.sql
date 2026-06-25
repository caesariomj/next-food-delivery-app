/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_expires_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_token` on the `users` table. All the data in the column will be lost.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_id_key";

-- DropIndex
DROP INDEX "users_password_reset_token_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "password_reset_expires_at",
DROP COLUMN "password_reset_token",
ALTER COLUMN "name" SET NOT NULL;
