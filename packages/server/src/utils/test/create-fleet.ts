import { prisma } from "@/lib/prisma";

export async function createFleet() {
  const fleet = await prisma.fleet.create({
    data: {
      name: 'Fleet Test'
    }
  })

  return fleet
}