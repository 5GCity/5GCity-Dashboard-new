/**
 * Panelresourceinfo Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Button from 'components/Button'
import { CirclePlusIcon, DeleteIcon } from 'components/Icons' // EditIcon

class PanelResourceInfo extends Component {
  render () {
    const { deleteItem, addNewItem, data } = this.props // editItem
    return (
      <Panel>
        <Title>Computing</Title>
        {data.location.resources.computes && data.location.resources.computes.map(compute =>
          <Item key={compute.id}>
            <Name>{compute.name}</Name>
            <StatusColor color={data.location.color} />
            <ContainerIcons>
              <Delete onClick={() => deleteItem({ type: 'compute', id: compute.id, name: compute.name })} />
            </ContainerIcons>
          </Item>
        )}
        {!data.location.resources.computes &&
        <Info>Add your first compute</Info>
        }
        <AddNewBtn
          outline
          type={'primary'}
          text={'Add new'}
          width={236}
          height={48}
          onClick={() => addNewItem({ type: 'compute', id: 0, location: { latitude: data.location.latitude, longitude: data.location.longitude } })}
          svg={<CirclePlusIcon fill={'#8CC14E'} />}
        />
        <Title>Physical network</Title>
        {data.location.resources.network &&
          <Item key={data.location.resources.network}>
            <Name>{data.location.resources.network.name}</Name>
            <ContainerIcons>
              <Delete onClick={() => deleteItem({ type: 'network', id: data.location.resources.network.id, name: data.location.resources.network.name })} />
            </ContainerIcons>
          </Item>
        }
        {!data.location.resources.network && data.location.resources.computes &&
        <Info>Add your first physical network</Info>
        }
        {!data.location.resources.network && !data.location.resources.computes &&
        <Info>First need Compute</Info>
        }
        {data.location.resources.computes && !data.location.resources.network &&
        <AddNewBtn
          outline
          type={'primary'}
          text={'Add new'}
          width={236}
          height={48}
          onClick={() => addNewItem({ type: 'network', id: 0, location: { latitude: data.location.latitude, longitude: data.location.longitude } })}
          svg={<CirclePlusIcon fill={'#8CC14E'} />}
        />
        }
        <Title>RAN Controller</Title>
        {data.location.resources.rans && data.location.resources.rans.map(ran =>
          <Item key={ran.id}>
            <Name>{ran.name}</Name>
            <ContainerIcons>
              <Delete onClick={() => deleteItem({ type: 'ran', id: ran.id, name: ran.name })} />
            </ContainerIcons>
          </Item>
        )}
        {!data.location.resources.rans &&
        <Info>Add your first RAN Controller</Info>
        }
        <AddNewBtn
          outline
          type={'primary'}
          text={'Add new'}
          width={236}
          height={48}
          onClick={() => addNewItem({ type: 'ran', id: 0, location: { latitude: data.location.latitude, longitude: data.location.longitude } })}
          svg={<CirclePlusIcon fill={'#8CC14E'} />}
        />
      </Panel>
    )
  }
}

export default Logic(PanelResourceInfo)

const AddNewBtn = styled(Button)`
  margin-top: 8px;
  border-style: dashed;
  border-color: ${({theme}) => theme.secondaryColor};
`
/* const Separator = styled.div`
  height: 26px;
  width: 1px;
  opacity: 0.1;
  background-color: #EFF2F7;
  margin-left: 14.5px;
  margin-right: 16.5px;
` */
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
const Item = styled.div`
  width: 100%;
  border-bottom: 1px solid #47565E;
  display: inline-flex;
  align-items: center;
`
const ContainerIcons = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`
const Name = styled.span`
  color: #fff;
  font-family:${({theme}) => theme.fontDin};
  font-size: 20px;
  line-height: 24px;
  margin: 16px 8px;
`
const Delete = styled(DeleteIcon)`
  cursor: pointer;
`

/* const Edit = styled(EditIcon)`
  cursor: pointer;
` */
const Info = styled.p`
  font-family:${({theme}) => theme.fontDin};
  color: ${({theme}) => theme.secondaryColor};
  font-size: 14px;
  font-weight: 600;
  line-height: 12px;
  margin-top: 16px;
  margin-bottom: 12px;
  text-align: center;
`
const StatusColor = styled.div`
  background-color: ${({color}) => color || 'transparent'};
  height: 24px;
  width: 24px;
  border-radius: 12px;
`
