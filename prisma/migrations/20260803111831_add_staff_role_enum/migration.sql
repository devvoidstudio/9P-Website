/*
  Warnings:

  - You are about to drop the column `isStaff` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StaffRole" AS ENUM ('GUEST', 'HELPER', 'TRYOUT_HOST', 'MODERATOR', 'HEAD_MODERATOR', 'ADMIN', 'HEAD_ADMIN', 'MANAGER', 'CO_OWNER', 'OWNER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isStaff",
ADD COLUMN     "role" "StaffRole" NOT NULL DEFAULT 'GUEST';
