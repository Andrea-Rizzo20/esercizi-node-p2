import supertest from "supertest";
import app from "./app";

import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);
describe("GET /planets", ()=>{
  test("Valid request", async () => {
    const planets = [
      {
        id: 1,
        name: "Mercury",
        description: null,
        diameter: 1234,
        moons: 12,
        createdAt: "2022-08-24T23:49:07.699Z",
        updatedAt: "2022-08-24T23:48:54.084Z",
      },
      {
        id: 2,
        name: "Mars",
        description: null,
        diameter: 1234,
        moons: 8,
        createdAt: "2022-08-24T23:49:34.468Z",
        updatedAt: "2022-08-24T23:49:15.820Z",
      },
    ];


    //@ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const response = await request
      .get("/planets")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planets);
  });
})


describe("POST /planets", () => {
  test("Valid request", async () => {
    const planet =
      {
        name: "Mercury",
        diameter: 1234,
        moons: 12
      }


    //@ts-ignore
    // prismaMock.planet.findMany.mockResolvedValue(planet);

    const response = await request
      .post("/planets")
      .send(planet)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
  });

  test("Invalid request", async () => {
    const planet =
      {
        diameter: 1234,
        moons: 12
      }


    //@ts-ignore
    // prismaMock.planet.findMany.mockResolvedValue(planet);

    const response = await request
      .post("/planets")
      .send(planet)
      .expect(422)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({
      errors:{
        body: expect.any(Array)
      }});
  });
})


