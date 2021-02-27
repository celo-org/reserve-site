import { NextApiRequest, NextApiResponse } from 'next'
import getRates from "src/service/rates"
export default async function(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rates = await getRates()
      res.json({rates})
    } else {
      res.status(405)
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'unknownError' })
  }
}