/**
 * Panelresource Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import PanelRight from 'components/PanelRight'
import Button from 'components/Button'
import { CheckIcon } from 'components/Icons'

/* Container */
import PanelResourceInfo from 'containers/Panel/PanelResourceInfo'
import PanelResourceEdition from 'containers/Panel/PanelResourceEdition'
import PanelWifi from 'containers/Panel/PanelWifi'
import PanelLTE from 'containers/Panel/PanelLTE'

class PanelResource extends Component {
  render () {
    const { edition, markerSelect, editResource, panelStatus } = this.props
    const { changeEdition, closePanel, changeModalStatus, submit } = this.actions
    return (
      <PanelRight
        show={panelStatus}
        close={closePanel}
      >
        <Container>
          {edition &&
          <PanelResourceEdition
            data={editResource}
          />
          }
          { !markerSelect.location.isLTE &&
            !markerSelect.location.isWifi &&
            !edition &&
            <PanelResourceInfo
              data={markerSelect}
              deleteItem={(item) => changeModalStatus(item)}
              editItem={(item) => changeEdition(item)}
              addNewItem={(item) => changeEdition(item)}
          />
          }
          {markerSelect.location.isWifi &&
            !edition &&
            <PanelWifi
              data={markerSelect.location.resources.wifi}
              editItem={(item) => changeEdition(item)}
          />
          }
          { markerSelect.location.isLTE &&
            !edition &&
            <PanelLTE
              data={markerSelect.location.resources.LTE}
              editItem={(item) => changeEdition(item)}
          />
          }
        </Container>
        <Bottom>
          <BottomContainer>
            <Button
              width={116}
              height={40}
              text={'Cancel'}
              type={'secondary'}
              onClick={() => closePanel()}
            />
            <Button
              width={116}
              height={40}
              text={'Save'}
              svg={<CheckIcon height={20} />}
              type={'primary'}
              onClick={() => submit()}
            />
          </BottomContainer>
        </Bottom>
      </PanelRight>
    )
  }
}

export default Logic(PanelResource)

const Container = styled.div`
  overflow-y: auto;
  height: 82%;
  `
const Bottom = styled.div`
background-color: rgba(255,255,255,0.05);
height: 80px;
width: 100%;
position: absolute;
bottom: 80px;
`
const BottomContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
`
