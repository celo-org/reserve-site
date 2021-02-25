import { NextApiRequest, NextApiResponse } from 'next'
import getStableValueTokens from "src/service/stables"
export default async function(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const liabilities = await getStableValueTokens()
      res.json(liabilities)
    } else {
      res.status(405)
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'unknownError' })
  }
}