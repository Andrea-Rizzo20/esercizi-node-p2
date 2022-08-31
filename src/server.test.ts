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
});

describe("GET /planet/:id", ()=>{
  test("Valid request", async () => {
    const planet ={
        id: 1,
        name: "Mercury",
        description: null,
        diameter: 1234,
        moons: 12,
        createdAt: "2022-08-24T23:49:07.699Z",
        updatedAt: "2022-08-24T23:48:54.084Z",
      }

    //@ts-ignore
    prismaMock.planet.findUnique.mockResolvedValue(planet);

    const response = await request
      .get("/planets/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
  });

  test("Planet does not exist",async ()=>{
    //@ts-ignore
    prismaMock.planet.findUnique.mockResolvedValue(null);

    const response = await request
    .get("/planets/23")
    .expect(404)
    .expect("Content-Type", /text\/html/)

    expect(response.text).toContain("Cannot GET /planets/23")
  });

  test("Invalid Planet Id",async ()=>{

    const response = await request
    .get("/planets/asd")
    .expect(404)
    .expect("Content-Type", /text\/html/)

    expect(response.text).toContain("Cannot GET /planets/asd")
  })
})


describe("POST /planets", () => {
  test("Valid request", async () => {
      const planet = {
        id: 3,
        name: "Mercury",
        description: null,
        diameter: 1234,
        moons: 12,
        createdAt: "2022-08-30T01:41:28.808Z",
        updatedAt: "2022-08-30T01:41:28.811Z"
    }

    //@ts-ignore
     prismaMock.planet.create.mockResolvedValue(planet);

    const response = await request
      .post("/planets")
      .send({
        name: "Mercury",
        diameter: 1234,
        moons: 12
      })
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

describe("PUT /planets/:id", () => {
  test("Valid request", async () => {
      const planet = {
        id: 3,
        name: "Mercury",
        description: "Best Planet",
        diameter: 1234,
        moons: 12,
        createdAt: "2022-08-30T01:41:28.808Z",
        updatedAt: "2022-08-30T01:41:28.811Z"
    }

    //@ts-ignore
     prismaMock.planet.update.mockResolvedValue(planet);

    const response = await request
      .put("/planets/3")
      .send({
        name: "Mercury",
        description:"Best Planet",
        diameter: 1234,
        moons: 12
      })
      .expect(200)
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
      .put("/planets/23")
      .send(planet)
      .expect(422)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({
      errors:{
        body: expect.any(Array)
      }});
  });

  test("Planet does not exist",async ()=>{
    //@ts-ignore
    prismaMock.planet.update.mockRejectedValue(new Error("Error"));

    const response = await request
    .put("/planets/23")
    .send({
      name: "Mercury",
      description:"Best Planet",
      diameter: 1234,
      moons: 12
    })
    .expect(404)
    .expect("Content-Type", /text\/html/)

    expect(response.text).toContain("Cannot PUT /planets/23")
  });

  test("Invalid Planet Id",async ()=>{

    const response = await request
    .put("/planets/asd")
    .send({
      name: "Mercury",
      description:"Best Planet",
      diameter: 1234,
      moons: 12
    })
    .expect(404)
    .expect("Content-Type", /text\/html/)

    expect(response.text).toContain("Cannot PUT /planets/asd")
  })
});

describe("DELETE /planet/:id", ()=>{
  test("Valid request", async () => {

    const response = await request
      .delete("/planets/1")
      .expect(204);

    expect(response.text).toEqual("");
  });

  test("Planet does not exist",async ()=>{
    //@ts-ignore
    prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

    const response = await request
    .delete("/planets/23")
    .expect(404)
    .expect("Content-Type", /text\/html/)

    expect(response.text).toContain("Cannot DELETE /planets/23")
  });

  test("Invalid Planet Id",async ()=>{

    const response = await request
    .delete("/planets/asd")
    .expect(404)
    .expect("Content-Type", /text\/html/)

    expect(response.text).toContain("Cannot DELETE /planets/asd")
  })
})


