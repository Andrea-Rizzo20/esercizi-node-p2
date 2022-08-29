module.exports={
    preset: "ts-jest",
    testEnvironment:"node",
    verbose: true,
    clearMock: true,
    setupFilesAfterEnv:['./src/lib/prisma/client.mock.ts']
}