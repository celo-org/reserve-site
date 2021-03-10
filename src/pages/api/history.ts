import { NextApiRequest, NextApiResponse } from 'next'
import {getHistory} from "src/providers/airtable"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const start = Date.now()
      const holdings = await getHistory()
      res.setHeader("Server-Timing", `ms;dur=${Date.now() - start}`)
      res.json(holdings)
    } else {
      res.status(405)
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'unknownError' })
  }
}