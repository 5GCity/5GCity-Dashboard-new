/**
 * Panellte Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Theme } from 'globalStyles'
import isEmpty from 'lodash/isEmpty'

/* Components */
import { EditIcon } from 'components/Icons'
import Button from 'components/Button'

class PanelLTE extends Component {
  render () {
    const { data, editItem } = this.props
    return (
      <Panel>
        <Title>LTE</Title>
        {data.map(box =>
          <React.Fragment key={box.id}>
            <BoxName key={box.id}>Box name: {box.name}</BoxName>
            {box.physical.map(phy =>
              <React.Fragment key={phy.id}>
                <PhysName key={phy.id}>Name: {phy.name}</PhysName>
                {isEmpty(phy.config)
          ? <Btn
            outline
            type={'primary'}
            text={'Add configure'}
            width={236}
            height={48}
            onClick={() => editItem({ type: 'LTE', ranId: box.ranId, phy: phy })}
            svg={<EditIcon fill={'#8CC14E'} />}
          />
          : <Btn
            outline
            type={'primary'}
            text={'Configure'}
            width={236}
            height={48}
            onClick={() => editItem({ type: 'LTE', ranId: box.ranId, phy: phy })}
            svg={<EditIcon fill={'#8CC14E'} />}
          />
          }
              </React.Fragment>
          )}
          </React.Fragment>
        )}
      </Panel>
    )
  }
}

export default Logic(PanelLTE)

const Panel = styled.div`
.noBorder {
  border-bottom: none;
}
  margin: 0 24px 0 24px;
`

const Title = styled.h5`
  color:${({theme}) => theme.primaryColor};
  font-family:${({theme}) => theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 16px;
`

const PhysName = styled.p`
  color: #fff;
  font-family:${({theme}) => theme.fontDin};
  font-size: 20px;
  line-height: 24px;
  margin: 16px 8px;
`

const BoxName = styled.p`
  margin: 12px 0;
  font-size: 18px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${Theme.fontFamily};
`

const Btn = styled(Button)`
  margin-top: 8px;
  border-style: dashed;
  border-color: ${({theme}) => theme.secondaryColor};
`
