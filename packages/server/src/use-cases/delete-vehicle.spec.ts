import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { VehicleNotFoundError } from './errors/vehicle-not-found-error'
import { DeleteVehicleUseCase } from './delete-vehicle'

let vehiclesRepository: InMemoryVehiclesRepository
let sut: DeleteVehicleUseCase

describe('Delete Vehicle Use Case', () => {
  beforeEach(() => {
    vehiclesRepository = new InMemoryVehiclesRepository()
    sut = new DeleteVehicleUseCase(vehiclesRepository)

  })

  it('should be able to delete existing vehicle', async () => {
    const vehicle = await vehiclesRepository.create({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassis_id: 'abc123',
      fleet_id: '1'
    })

    const { chassisId } = await sut.execute({
      chassisId: vehicle.chassis_id
    })

    expect(chassisId).toEqual(expect.any(String))
  })
  it('should not be able to delete inexistent vehicle', async () => {

    expect(() => sut.execute({
      chassisId: 'inexistent-chassis-id'
    })).rejects.toBeInstanceOf(VehicleNotFoundError)
  })

})
