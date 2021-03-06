import { css } from "@emotion/react"

interface Props {
  date?: string | number
  humanDate?: string
}

export function Updated({ date, humanDate }: Props) {
  return (
    <small css={dateStyle}>
      <strong>Updated </strong>

      {date
        ? new Date(date).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : humanDate}
    </small>
  )
}
const dateStyle = css({ marginBottom: 36, display: "block" })
