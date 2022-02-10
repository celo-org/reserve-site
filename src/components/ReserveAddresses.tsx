import { css } from "@emotion/react"
import * as React from "react"
import { ReserveCrypto, generateLink } from "src/addresses.config"
import Button from "src/components/Button"
import CopyIcon from "src/components/CopyIcon"
import { Tokens } from "src/service/Data"

interface Props {
  addresses: ReserveCrypto[]
}

export default function ReserveAddresses(props: Props) {
  return (
    <>
      {props.addresses.map(({ addresses, label, token }) => {
        return <TokenDisplay key={label} token={token} label={label} addresses={addresses} />
      })}
      <Button href="https://docs.celo.org/command-line-interface/reserve">
        Query Reserve Holdings
      </Button>
    </>
  )
}
const MILLISECONDS = 5000

function useCopy(hex: string) {
  const [justCopied, setCopied] = React.useState(false)

  function onPress() {
    onCopy(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), MILLISECONDS)
  }

  return { onPress, justCopied }
}

const TokenDisplay = React.memo(function _TokenDisplay({ label, addresses, token }: ReserveCrypto) {
  return (
    <div css={rootStyle}>
      <h5 css={labelStyle}>{label}</h5>
      {addresses.map((address) => (
        <AddressDisplay key={address} token={token} hex={address} />
      ))}
    </div>
  )
})

function AddressDisplay({ token, hex }: { token: Tokens; hex: string }) {
  const { onPress, justCopied } = useCopy(hex)

  return (
    <div css={entryCss}>
      <a css={addressStyle} href={generateLink(token, hex)} target="_blank" rel="noopener">
        {hex}
      </a>
      <span css={iconStyle} onClick={onPress}>
        <CopyIcon />
        <span className="info">{justCopied ? "Copied" : "Copy"}</span>
      </span>
    </div>
  )
}

const entryCss = css({
  margin: "8px 0px",
})

async function onCopy(text: string) {
  await navigator.clipboard.writeText(text)
}

const clickable = css({ cursor: "pointer" })

const labelStyle = css({
  marginBottom: 5,
  marginTop: 10,
  a: {
    textDecoration: "none",
  },
})

const addressStyle = css({
  wordWrap: "break-word",
  textDecoration: "none",
})

const iconStyle = css(clickable, {
  marginLeft: "0.5em",
  padding: 1,
  "&:active": {
    svg: {
      transform: "scale(1.1)",
    },
  },
  ".info": {
    marginLeft: 3,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "400ms",
  },
  "&:hover": {
    ".info": {
      opacity: 1,
    },
  },
})

const rootStyle = css({
  marginBottom: 30,
})
