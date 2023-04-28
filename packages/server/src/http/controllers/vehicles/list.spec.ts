import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createFleet } from "@/utils/test/create-fleet";
import { createVehicle } from "@/utils/test/create-vehicle";

describe('List Vehicles Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all vehicles of fleet', async () => {
    const fleet = await createFleet()
    await createVehicle(fleet.id, 'abc123')
    await createVehicle(fleet.id, 'def123')
    await createVehicle(fleet.id, 'ghi123')

    const response = await request(app.server)
      .get(`/vehicles/${fleet.id}`)
      .send()

    console.log(response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([
      expect.objectContaining({
        chassis_id: 'abc123',
        fleet_id: fleet.id
      }),
      expect.objectContaining({
        chassis_id: 'def123',
        fleet_id: fleet.id
      }),
      expect.objectContaining({
        chassis_id: 'ghi123',
        fleet_id: fleet.id
      }),
    ])
  })
})