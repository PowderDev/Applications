-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_staffMemberId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "staffMemberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
