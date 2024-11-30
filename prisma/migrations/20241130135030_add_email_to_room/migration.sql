/*
  Warnings:

  - You are about to drop the column `email` on the `User_Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "emails" TEXT[];

-- AlterTable
ALTER TABLE "User_Room" DROP COLUMN "email";
