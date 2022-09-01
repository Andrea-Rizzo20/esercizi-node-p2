import multer from "multer";
import { multerOptions } from "./multer";

jest.mock("./multer", ()=>{
    const originalModule = jest.requireActual("./multer")

    return {
        __esModule:true,
        ...originalModule,
        initMulter: ()=>{
            return multer({
                storage:multer.memoryStorage(),
                ...originalModule.multerOptions
            })
        }

    }
})