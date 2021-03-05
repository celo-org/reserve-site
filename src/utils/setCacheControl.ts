import { ServerResponse } from "http"

export default function setCacheControl(res: ServerResponse) {
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Cache-Control", "max-age=20, stale-while-revalidate=60")
  } else {
    res.setHeader("Cache-Control", "max-age=2")
  }
}
