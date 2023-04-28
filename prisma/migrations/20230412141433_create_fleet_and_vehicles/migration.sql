-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('BUS', 'TRUCK', 'CAR');

-- CreateTable
CREATE TABLE "fleets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "fleets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "chassis_series" TEXT NOT NULL,
    "chassis_number" INTEGER NOT NULL,
    "type" "VehicleType" NOT NULL,
    "passengers" BYTEA NOT NULL,
    "color" TEXT NOT NULL,
    "fleet_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fleet_id_fkey" FOREIGN KEY ("fleet_id") REFERENCES "fleets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
