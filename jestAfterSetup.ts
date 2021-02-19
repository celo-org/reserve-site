import { server } from 'src/mocks/server'
import fetch from "node-fetch"
// import '@testing-library/jest-dom'
// import { createSerializer } from "@emotion/jest"
// import "@testing-library/jest-dom/extend-expect"
// @ts-ignore
global.fetch = fetch
// expect.addSnapshotSerializer(createSerializer())

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
