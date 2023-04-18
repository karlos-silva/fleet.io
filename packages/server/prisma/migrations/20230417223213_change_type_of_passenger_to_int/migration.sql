/*
  Warnings:

  - Changed the type of `passengers` on the `vehicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "passengers",
ADD COLUMN     "passengers" INTEGER NOT NULL;
