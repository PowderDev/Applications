/*
  Warnings:

  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STAFF', 'USER');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_staffMemberId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Staff";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
