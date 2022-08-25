module.exports={
    preset: "ts-jest",
    testEnvironment:"node",
    verbose: true,
    clearMock: true,
    setupFilesAfterEnv:['./src/es-07/lib/prisma/client.mock.ts']
}