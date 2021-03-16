import { server } from 'src/mocks/server'
import MockDate from "mockdate"
import AirtableAPI from 'airtable'

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
