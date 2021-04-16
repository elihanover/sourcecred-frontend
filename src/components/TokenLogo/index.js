import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils/index.js'
import EthereumLogo from '../../assets/eth.png'
import { useCommunityTokensData } from '../../contexts/GlobalData.js'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  // TODO: CHECK IF COMMUNITY ASSET
  const tokens = useCommunityTokensData()
  console.log(tokens)
  console.log('address ' + address)
  // get the token that matches this address
  const token = address ? tokens.reduce(
    (match, token) => (match ? match : token.address.toLowerCase() === address.toLowerCase() ? token : null),
    null
  ) : null

  if (!token || !token.path || error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          💰
        </span>
      </Inline>
    )
  }

  // const path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
  //   address
  // )}/logo.png`

  console.log(token.path)
  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={token.path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
