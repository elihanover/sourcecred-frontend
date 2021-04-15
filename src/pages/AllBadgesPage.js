import React, { useEffect } from 'react'
import 'feather-icons'

import TopBadgesList from '../components/BadgesList'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import Panel from '../components/Panel'
import { useCommunityBadgesData } from '../contexts/GlobalData'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
// import CheckBox from '../components/Checkbox'
// import QuestionHelper from '../components/QuestionHelper'

function AllBadgesPage() {
  const allBadges = useCommunityBadgesData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  // const [useTracked, setUseTracked] = useState(true)

  return (
    <PageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.6, '#00e5ff')} />
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>SourceCred Badges (ERC721)</TYPE.largeHeader>
          {!below600 && <Search small={true} />}
        </RowBetween>
        {/* <AutoRow gap="4px">
          <CheckBox checked={useTracked} setChecked={() => setUseTracked(!useTracked)} text={'Hide untracked tokens'} />
          <QuestionHelper text="USD amounts may be inaccurate in low liquiidty pairs or pairs without ETH or stablecoins." />
        </AutoRow> */}
        <Panel style={{ marginTop: '6px', padding: below600 && '1rem 0 0 0 ' }}>
          <TopBadgesList badges={allBadges} itemMax={50} />
        </Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default AllBadgesPage
