import consensus from "./consensus"


describe(`consensus()`, () => {
  describe("when both parties agree", () => {
    it("returns value and indicts the agreement", async () => {
      const result = await consensus()
      expect(result).toEqual({value: 0, time: 0, status: "consensus"})
    })
  })
  describe("when both parties return but results differ", () => {
    it("most recent wins", async () => {
      const result = await consensus()
      expect(result).toEqual({value: 0, time: 0, status: "divergence"})
    })
  })
  describe("when one party doesnt respond or has error", () => {
    it("use the other one and indicates so", async () => {
      const result = await consensus()
      expect(result).toEqual({value: 0, time: 0, status: ""})
    })
  })
  describe("when neither party responds", () => {
    it("returns invalid", async () => {
      const result = await consensus()
      expect(result).toEqual({value: 0, time: 0, status: "invalid"})
    })
  })
})