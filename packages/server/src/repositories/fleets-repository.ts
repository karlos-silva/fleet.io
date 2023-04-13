import { Fleet, Prisma } from '@prisma/client'

export interface FleetsRepository {
  findByName(name: string): Promise<Fleet | null>
  create(data: Prisma.FleetCreateInput): Promise<Fleet>
}
