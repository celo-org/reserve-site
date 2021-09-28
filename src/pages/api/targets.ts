import { NextApiRequest, NextApiResponse } from "next"
import targets from "src/service/targets"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const targetAllocations = await targets()

      res.json(targetAllocations)
    } else {
      res.status(405)
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "unknownError" })
  }
}
