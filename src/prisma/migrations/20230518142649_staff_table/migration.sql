/*
  Warnings:

  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `isStaffMember` on the `User` table. All the data in the column will be lost.
  - Added the required column `applicantId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffMemberId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "userId",
ADD COLUMN     "applicantId" INTEGER NOT NULL,
ADD COLUMN     "staffMemberId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isStaffMember";

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
