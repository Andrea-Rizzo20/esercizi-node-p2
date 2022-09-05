import { RequestHandler } from "express";

jest.mock("./passport", ()=>{
    const originalModule = jest.requireActual("./passport")

    const checkAuthorization:RequestHandler = (request, response, next)=>{
        next();
    }

    return {
        _esModule:true,
        ...originalModule,
        checkAuthorization,
    }
})