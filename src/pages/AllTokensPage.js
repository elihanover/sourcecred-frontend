import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'feather-icons'

import TopTokenList from '../components/TokenList'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import Panel from '../components/Panel'
import { useAllCredsData, useCommunityTokensData } from '../contexts/GlobalData'
import { PageWrapper, FullWrapper } from '../components'
import Row, { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
import { ButtonDark, ButtonLight } from '../components/ButtonStyled'
import PluginConfig from '../components/PluginConfig'
import DropdownSelect from '../components/DropdownSelect'
// import CheckBox from '../components/Checkbox'
// import QuestionHelper from '../components/QuestionHelper'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme, small, open }) => (small ? (open ? theme.bg6 : 'none') : transparentize(0.4, theme.bg6))};
  border-bottom-right-radius: ${({ open }) => (open ? '0px' : '12px')};
  border-bottom-left-radius: ${({ open }) => (open ? '0px' : '12px')};
  z-index: 9999;
  width: 100%;
  min-width: 300px;
  box-sizing: border-box;
  box-shadow: ${({ open, small }) =>
    !open && !small
      ? '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04) '
      : 'none'};
  @media screen and (max-width: 500px) {
    background: ${({ theme }) => theme.bg6};
    box-shadow: ${({ open }) =>
      !open
        ? '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04) '
        : 'none'};
  }
`

const Input = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text1};
  font-size: ${({ large }) => (large ? '16px' : '14px')};

  ::placeholder {
    color: ${({ theme }) => theme.text3};
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    ::placeholder {
      font-size: 1rem;
    }
  }
`

function AllTokensPage() {
  const allCreds = useAllCredsData()
  const CRED_TYPES = allCreds.reduce((credTypes, { name, symbol }) => Object.assign(credTypes, { [symbol]: name }), { DEFAULT: '' })

  const communityTokens = useCommunityTokensData()
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [description, setDescription] = useState('')
  const [credType, setCredType] = useState(CRED_TYPES.DEFAULT)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  // const [useTracked, setUseTracked] = useState(true)

  return (
    <PageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.6, '#40ff00')} />
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>SourceCred Tokens (ERC20)</TYPE.largeHeader>
          {!below600 && <Search small={true} />}
        </RowBetween>
        {/* <AutoRow gap="4px">
          <CheckBox checked={useTracked} setChecked={() => setUseTracked(!useTracked)} text={'Hide untracked tokens'} />
          <QuestionHelper text="USD amounts may be inaccurate in low liquiidty pairs or pairs without ETH or stablecoins." />
        </AutoRow> */}
        <Panel style={{ marginTop: '6px', padding: below600 && '1rem 0 0 0 ' }}>
          <TopTokenList tokens={communityTokens} itemMax={50} />
        </Panel>
        <Panel>
          <TYPE.largeHeader style={{ marginBottom: '20px' }}>New Token (ERC20)</TYPE.largeHeader>
          <TYPE.main style={{ marginBottom: '30px' }}>Issue a new community token.</TYPE.main>

          <TYPE.header style={{ marginBottom: '10px' }}>Name</TYPE.header>
          <Wrapper open={false} shadow={true} small={false} style={{ marginBottom: '20px' }}>
            <Input
              large={true}
              type={'text'}
              // ref={wrapperRef}
              placeholder={'Distopic digital culture points'}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Wrapper>
          <TYPE.header style={{ marginBottom: '10px' }}>Symbol</TYPE.header>
          <Wrapper open={false} shadow={true} small={false} style={{ marginBottom: '20px' }}>
            <Input
              large={true}
              type={'text'}
              // ref={wrapperRef}
              placeholder={'DDCP'}
              value={symbol}
              onChange={(e) => {
                setSymbol(e.target.value)
              }}
            />
          </Wrapper>
          <TYPE.header style={{ marginBottom: '10px' }}>Description</TYPE.header>
          <Wrapper open={false} shadow={true} small={false} style={{ marginBottom: '20px' }}>
            <Input
              large={true}
              type={'text'}
              // ref={wrapperRef}
              placeholder={'...'}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </Wrapper>
          <TYPE.header style={{ marginBottom: '10px' }}>Cred Data</TYPE.header>
          <DropdownSelect options={CRED_TYPES} active={credType} setActive={setCredType} />
          <ButtonDark style={{ width: '100px', marginTop: '10px' }}>Mint</ButtonDark>
        </Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default AllTokensPage
