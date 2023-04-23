import { Vehicle, Prisma } from "@prisma/client";
import { VehiclesRepository } from "../vehicles-repository";

export class PrismaVehiclesRepository implements VehiclesRepository {
  findByChassisId(chassis_id: string): Promise<Vehicle | null> {
    throw new Error("Method not implemented.");
  }
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle> {
    throw new Error("Method not implemented.");
  }
  deleteByChassisId(chassis_id: string): Promise<boolean | null> {
    throw new Error("Method not implemented.");
  }
  searchManyByFleetId(fleetId: string): Promise<Vehicle[]> {
    throw new Error("Method not implemented.");
  }
  updateColor(chassis_id: string, color: string): Promise<Vehicle> {
    throw new Error("Method not implemented.");
  }

}