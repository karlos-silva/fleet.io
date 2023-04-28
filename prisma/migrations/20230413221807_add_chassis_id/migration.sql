/*
  Warnings:

  - You are about to drop the column `chassis_number` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `chassis_series` on the `vehicles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chassis_id]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chassis_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "chassis_number",
DROP COLUMN "chassis_series",
ADD COLUMN     "chassis_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_chassis_id_key" ON "vehicles"("chassis_id");
