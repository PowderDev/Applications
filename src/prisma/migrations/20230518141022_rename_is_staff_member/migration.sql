/*
  Warnings:

  - You are about to drop the column `is_staff_member` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_staff_member",
ADD COLUMN     "isStaffMember" BOOLEAN NOT NULL DEFAULT false;
