import React, { useEffect } from 'react'
import 'feather-icons'
import { withRouter } from 'react-router-dom'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import { PageWrapper, FullWrapper } from '../components'
import Panel from '../components/Panel'
import LPList from '../components/LPList'
import styled from 'styled-components'
import AccountSearch from '../components/AccountSearch'
import { useTopUsers } from '../contexts/GlobalData'
import LocalLoader from '../components/LocalLoader'
import { RowBetween } from '../components/Row'
import { useMedia } from 'react-use'
import Search from '../components/Search'

const AccountWrapper = styled.div`
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

function AccountLookup() {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // const topLps = useTopLps()
  const topUsers = useTopUsers()
  const below600 = useMedia('(max-width: 600px)')

  return (
    <PageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.6, '#ff007a')} />
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>SourceCred Wallets</TYPE.largeHeader>
          {!below600 && <Search small={true} />}
        </RowBetween>
        <AccountWrapper>
          <AccountSearch />
        </AccountWrapper>
        <TYPE.main fontSize={'1.125rem'} style={{ marginTop: '2rem' }}>
          Contributors
        </TYPE.main>
        <Panel>{topUsers && topUsers.length > 0 ? <LPList lps={topUsers} maxItems={200} /> : <LocalLoader />}</Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default withRouter(AccountLookup)
