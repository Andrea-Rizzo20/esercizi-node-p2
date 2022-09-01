import { generatePhotoFilename } from './multer'

describe("generatePhotoFilename", ()=>{
    test.each([
        ["image/png", "png"],
        ["image/jpeg","jpeg"],
    ])("Generates filename with correct extension when pass mimeType '%s",
        (mimeType, expectedFileExtension)=>{
            const fullFilename = generatePhotoFilename(mimeType)
            const [,fileExtension] = fullFilename.split(".")

            expect(fileExtension).toEqual(expectedFileExtension)
    })
})