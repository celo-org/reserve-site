import { css} from '@emotion/core'
import * as React from 'react'
import Button from 'src/components/Button'
import CopyIcon from 'src/components/CopyIcon'
import { Address, Tokens } from 'src/service/Data'

interface Props {
  addresses: Address[]
}

export default function ReserveAddresses(props: Props) {
  return (
    <>
      {props.addresses.map(({address, label, token}) => {
        return <AddressDisplay key={address} token={token} label={label} hex={address} />
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
interface DisplayProps {
  label: string,
  hex: string,
  token: Tokens
}

const AddressDisplay = React.memo(function AddressDisplay({ label, hex, token }: DisplayProps) {
  const { onPress, justCopied } = useCopy(hex)

  return (
    <div css={rootStyle}>
      <h5 css={labelStyle}><a href={generatelink(token, hex)} target="_blank" rel="noopener">{label}</a></h5>
      <span onClick={onPress} css={iconStyle}>
        {hex} <CopyIcon /> <span className="info">{justCopied ? 'Copied' : 'Copy'}</span>
      </span>
    </div>
  )
})

function generatelink(token: Tokens, address: string) {
  switch (token) {
    case "CELO":
      return `https://explorer.celo.org/address/${address}/coin_balances`
    case "BTC":
      return `https://blockstream.info/address/${address}`
    case "ETH":
      return `https://etherscan.io/address/${address}`
    case  'DAI':
      return `https://ethplorer.io/address/${address}`
  }
}

async function onCopy(text: string) {
  await navigator.clipboard.writeText(text)
}

const labelStyle = css({
  marginBottom: 5,
  marginTop: 10,
  a: {
    textDecoration: "none"
  }
})

const iconStyle = css({
  wordWrap: 'break-word',
  cursor: 'pointer',
  '&:active': {
    svg: {
      transform: 'scale(1.1)',
    },
  },
  '.info': {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '400ms',
  },
  '&:hover': {
    '.info': {
      opacity: 1,
    },
  },
})

const rootStyle = css({
  marginBottom: 24,
})
