/* eslint-disable @typescript-eslint/no-var-requires */
import { server } from "src/mocks/server"
import fetch from "node-fetch"
import MockDate from "mockdate"

// import '@testing-library/jest-dom'
// import { createSerializer } from "@emotion/jest"
// import "@testing-library/jest-dom/extend-expect"
// @ts-nocheck
global.fetch = window.fetch = fetch
global.Request = window.Request = fetch.Request
global.Response = window.Response = fetch.Response
// must require not import airtable so that the global fetch lines above run first
const AirtableAPI = require("airtable")
AirtableAPI.apiKey = "TEST_AIRTABLE_KEY"
// Establish API mocking before all tests.
beforeAll(() => {
  MockDate.set("2020-04-24")
  server.listen()
})
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => {
  MockDate.reset()
  server.close()
})
