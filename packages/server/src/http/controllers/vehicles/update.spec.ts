import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createFleet } from "@/utils/test/create-fleet";
import { createVehicle } from "@/utils/test/create-vehicle";

describe('Update Vehicle Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update vehicle', async () => {
    const fleet = await createFleet()
    const vehicle = await createVehicle(fleet.id, 'abc123')

    const response = await request(app.server)
      .post(`/vehicles/${vehicle.chassis_id}`)
      .send({
        color: "red",
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining({ message: "color updated" }))
  })
})