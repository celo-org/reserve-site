import { NextApiRequest, NextApiResponse } from 'next'
import StableValueTokensAPI from 'src/interfaces/stable-value-tokens'
import getStableValueTokens, {getTotalStableValueInUSD} from "src/service/stables"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const tokens = await getStableValueTokens()
      const totalStableValueInUSD = await getTotalStableValueInUSD()
      const result: StableValueTokensAPI = {tokens, totalStableValueInUSD}
      res.json(result)
    } else {
      res.status(405)
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'unknownError' })
  }
}