import React, { useEffect } from 'react'
import 'feather-icons'

import TopCredsList from '../components/CredList'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import Panel from '../components/Panel'
import { useAllCredsData } from '../contexts/GlobalData'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
import { ButtonLight } from '../components/ButtonStyled'
// import CheckBox from '../components/Checkbox'
// import QuestionHelper from '../components/QuestionHelper'

function AllCredsPage() {
  const allCreds = useAllCredsData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  // const [useTracked, setUseTracked] = useState(true)

  return (
    <PageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.6, '#ff007a')} />
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>SourceCred Cred Types</TYPE.largeHeader>
          {!below600 && <Search small={true} />}
        </RowBetween>
        {/* <AutoRow gap="4px">
          <CheckBox checked={useTracked} setChecked={() => setUseTracked(!useTracked)} text={'Hide untracked tokens'} />
          <QuestionHelper text="USD amounts may be inaccurate in low liquiidty pairs or pairs without ETH or stablecoins." />
        </AutoRow> */}
        <ButtonLight style={{ width: '64px' }}>New Cred Type</ButtonLight>
        <Panel style={{ marginTop: '6px', padding: below600 && '1rem 0 0 0 ' }}>
          <TopCredsList creds={allCreds} itemMax={50} />
        </Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default AllCredsPage
