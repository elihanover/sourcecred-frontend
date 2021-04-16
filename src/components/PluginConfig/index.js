import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'feather-icons'
import Panel from '../Panel'
import { TYPE } from '../../Theme'

function PluginConfig({ plugin }) {
  const weight = useState('') // Weight of the plugin

  return (
    <Panel style={{ marginTop: '20px' }}>
      <TYPE.header>{plugin}</TYPE.header>
    </Panel>
  )
}

export default PluginConfig
