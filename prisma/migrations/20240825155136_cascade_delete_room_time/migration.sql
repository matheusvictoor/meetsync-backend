-- DropForeignKey
ALTER TABLE "Time" DROP CONSTRAINT "Time_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;
