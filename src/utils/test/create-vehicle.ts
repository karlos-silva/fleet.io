import { prisma } from '@/lib/prisma'

export async function createVehicle(fleetId: string, chassis_id: string) {
  const vehicle = await prisma.vehicle.create({
    data: {
      type: 'CAR',
      passengers: 4,
      color: 'red',
      chassis_id,
      fleet_id: fleetId,
    },
  })

  return vehicle
}
