/*
  Warnings:

  - You are about to drop the column `link` on the `Room` table. All the data in the column will be lost.
  - Added the required column `endingAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_timeId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "link",
ADD COLUMN     "endingAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("timeId") ON DELETE CASCADE ON UPDATE CASCADE;
