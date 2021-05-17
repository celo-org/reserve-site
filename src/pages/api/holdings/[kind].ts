import { NextApiRequest, NextApiResponse } from "next"
import { getHoldingsCelo, getHoldingsOther } from "src/service/holdings"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const start = Date.now()
      if (req.query.kind === "celo") {
        const holdings = await getHoldingsCelo()
        res.setHeader("Server-Timing", `ms;dur=${Date.now() - start}`)
        res.json(holdings)
      } else if (req.query.kind === "other") {
        const holdings = await getHoldingsOther()
        res.setHeader("Server-Timing", `ms;dur=${Date.now() - start}`)
        res.json(holdings)
      } else {
        res.status(404)
      }
    } else {
      res.status(405)
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "unknownError" })
  }
}
