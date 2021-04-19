import React, { useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import dayjs from 'dayjs'
import LocalLoader from '../LocalLoader'
import utc from 'dayjs/plugin/utc'
import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'
import Link, { CustomLink } from '../Link'
import { Divider } from '..'
import DoubleTokenLogo from '../DoubleLogo'
import { withRouter } from 'react-router-dom'
import { formattedNum, getPoolLink } from '../../utils'
import { AutoColumn } from '../Column'
import { useEthPrice, useTopUsers, useUsernames } from '../../contexts/GlobalData'
import { RowFixed } from '../Row'
import { ButtonLight } from '../ButtonStyled'
import { TYPE } from '../../Theme'
import FormattedName from '../FormattedName'
import TokenLogo from '../TokenLogo'

dayjs.extend(utc)

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 0.5em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.primary1};
  opacity: ${(props) => (props.faded ? 0.3 : 1)};
  padding: 0 20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

const List = styled(Box)`
  -webkit-overflow-scrolling: touch;
`

const DashGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 5px 0.5fr 1fr 1fr;
  grid-template-areas: 'number name uniswap return';
  align-items: flex-start;
  padding: 20px 0;

  > * {
    justify-content: flex-end;
    width: 100%;

    :first-child {
      justify-content: flex-start;
      text-align: left;
      width: 20px;
    }
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 35px 2.5fr 1fr 1fr;
    grid-template-areas: 'number name uniswap return';
  }

  @media screen and (max-width: 740px) {
    grid-template-columns: 2.5fr 1fr 1fr;
    grid-template-areas: 'name uniswap return';
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 2.5fr 1fr;
    grid-template-areas: 'name uniswap';
  }
`

const ListWrapper = styled.div``

const ClickableText = styled(Text)`
  color: ${({ theme }) => theme.text1};
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  text-align: end;
  user-select: none;
`

const DataText = styled(Flex)`
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.text1};
  & > * {
    font-size: 1em;
  }

  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`

const SORT_FIELD = {
  VALUE: 'VALUE',
  UNISWAP_RETURN: 'UNISWAP_RETURN',
}

function UserBadgesList({ badges }) {
  const below500 = useMedia('(max-width: 500px)')
  const below740 = useMedia('(max-width: 740px)')

  // HACK to get usernames
  const usernames = useUsernames()
  const users = useTopUsers()
  // get the username

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  // sorting
  const [sortDirection, setSortDirection] = useState(true)
  const [sortedColumn, setSortedColumn] = useState(SORT_FIELD.VALUE)

  useEffect(() => {
    setMaxPage(1) // edit this to do modular
    setPage(1)
  }, [badges])

  useEffect(() => {
    if (badges) {
      let extraPages = 1
      if (badges.length % ITEMS_PER_PAGE === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(badges.length / ITEMS_PER_PAGE) + extraPages || 1)
    }
  }, [badges])

  const [ethPrice] = useEthPrice()

  const ListItem = ({ badge, username, index }) => {
    return (
      <DashGrid focus={true}>
        {!below740 && <DataText area="number">{index}</DataText>}
        <DataText area="name" justifyContent="flex-start" alignItems="flex-start">
          <AutoColumn gap="8px" justify="flex-start" align="flex-start">
            <TokenLogo address={badge.address} size={'16px'} />
          </AutoColumn>
          <AutoColumn gap="8px" justify="flex-start" style={{ marginLeft: '20px' }}>
            <CustomLink to={'/badge/' + badge.symbol}>
              <TYPE.main style={{ whiteSpace: 'nowrap' }} to={'/pair/'}>
                <FormattedName text={badge.name} maxCharacters={below740 ? 10 : 30} />
              </TYPE.main>
            </CustomLink>
          </AutoColumn>
        </DataText>
        <DataText area="uniswap">
          <AutoColumn gap="12px" justify="flex-end">
            <RowFixed>
              <TYPE.main color={'green'}>{'uhh'}</TYPE.main>
              <FormattedName text={badge.symbol} maxCharacters={below740 ? 10 : 18} margin={true} fontSize={'11px'} />
            </RowFixed>
          </AutoColumn>
        </DataText>
        {!below500 && (
          <DataText area="return">
            <AutoColumn gap="12px" justify="flex-end">
              <RowFixed>
                <TYPE.main color={'green'}>{badge.paid}</TYPE.main>
                <FormattedName text={badge.symbol} maxCharacters={below740 ? 10 : 18} margin={true} fontSize={'11px'} />
              </RowFixed>
              {badge.valueUSD && (
                <AutoColumn gap="4px" justify="flex-end">
                  <RowFixed>
                    <TYPE.small fontWeight={400}> {formattedNum(badge.paid * badge.valueUSD, true, true)} </TYPE.small>
                  </RowFixed>
                </AutoColumn>
              )}
            </AutoColumn>
          </DataText>
        )}
      </DashGrid>
    )
  }

  const badgesSorted =
    badges &&
    badges
      .sort((b0, b1) => {
        if (sortedColumn === SORT_FIELD.ISSUED) {
          return b0.issued > b1.issued ? (sortDirection ? -1 : 1) : sortDirection ? 1 : -1
        }
        return 1
      })
      .slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE)
      .map((badge, index) => {
        return (
          <div key={index}>
            <ListItem key={index} index={(page - 1) * 10 + index + 1} badge={badge} />
            <Divider />
          </div>
        )
      })

  return (
    <ListWrapper>
      <DashGrid center={true} style={{ height: '32px', padding: 0 }}>
        {!below740 && (
          <Flex alignItems="flex-start" justifyContent="flexStart">
            <TYPE.main area="number">#</TYPE.main>
          </Flex>
        )}
        <Flex alignItems="flex-start" justifyContent="flex-start">
          <TYPE.main area="name">Name</TYPE.main>
        </Flex>
        <Flex alignItems="center" justifyContent="flexEnd">
          <ClickableText
            area="balance"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.VALUE)
              setSortDirection(sortedColumn !== SORT_FIELD.VALUE ? true : !sortDirection)
            }}
          >
            Balance {sortedColumn === SORT_FIELD.VALUE ? (!sortDirection ? '↑' : '↓') : ''}
          </ClickableText>
        </Flex>
        {!below500 && (
          <Flex alignItems="center" justifyContent="flexEnd">
            <ClickableText
              area="earned"
              onClick={() => {
                setSortedColumn(SORT_FIELD.UNISWAP_RETURN)
                setSortDirection(sortedColumn !== SORT_FIELD.UNISWAP_RETURN ? true : !sortDirection)
              }}
            >
              {below740 ? 'Earned' : 'Total Badges Earned'}{' '}
              {sortedColumn === SORT_FIELD.UNISWAP_RETURN ? (!sortDirection ? '↑' : '↓') : ''}
            </ClickableText>
          </Flex>
        )}
      </DashGrid>
      <Divider />
      <List p={0}>{!badgesSorted ? <LocalLoader /> : badgesSorted}</List>
      <PageButtons>
        <div onClick={() => setPage(page === 1 ? page : page - 1)}>
          <Arrow faded={page === 1 ? true : false}>←</Arrow>
        </div>
        <TYPE.body>{'Page ' + page + ' of ' + maxPage}</TYPE.body>
        <div onClick={() => setPage(page === maxPage ? page : page + 1)}>
          <Arrow faded={page === maxPage ? true : false}>→</Arrow>
        </div>
      </PageButtons>
    </ListWrapper>
  )
}

export default withRouter(UserBadgesList)
