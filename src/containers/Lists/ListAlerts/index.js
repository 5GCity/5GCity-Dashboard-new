/**
 * Listalerts Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { TITLE_LIST, convertDateAndTime } from './utils'

/* Components */
import List from 'components/List'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { EyeIcon, CheckIcon, AlertIcon } from 'components/Icons'


const ModalInfo = props => {
  return (
    <Modal
      size={'small'}
      title={'Details'}
      visible={props.modalInfo}
      onCancel={props.actionModal}
    >
      <Modal.Body>
      {props.networkInfo &&
        <React.Fragment>
          <Field><FieldTitle>Service: </FieldTitle> {props.networkInfo.service}</Field>
          <Field><FieldTitle>Network service ID: </FieldTitle> {props.networkInfo.nsiId}</Field>
          {props.networkInfo.reactedActor &&
            <Field><FieldTitle>React actor: </FieldTitle> {props.networkInfo.reactedActor}</Field>
          }
          {props.networkInfo.reactedTimestamp &&
            <Field><FieldTitle>Reacted date: </FieldTitle> {convertDateAndTime(props.networkInfo.reactedTimestamp)}</Field>
          }
          <Field><FieldTitle>Severity: </FieldTitle> {props.networkInfo.severity}</Field>
          <Field><FieldTitle>Alert Name: </FieldTitle> {props.networkInfo.alertname}</Field>
          <Field><FieldTitle>Description: </FieldTitle> {props.networkInfo.description}</Field>
          <Field><FieldTitle>Instance: </FieldTitle> {props.networkInfo.instance}</Field>
          <Field><FieldTitle>Job:</FieldTitle> {props.networkInfo.job}</Field>
          <Field><FieldTitle>ORG: </FieldTitle> {props.networkInfo.org}</Field>
          <Field><FieldTitle>Generator URL: </FieldTitle> {props.networkInfo.generatorURL}</Field>
        </React.Fragment>
      }
    {!props.networkInfo &&
      <Title>No data</Title>
    }
    </Modal.Body>
      <Modal.Footer>
        <Button
          text={'Done'}
          svg={<CheckIcon />}
          type={'primary'}
          onClick={props.actionModal}
        />
      </Modal.Footer>
    </Modal>
  )
}

class ListAlerts extends Component {
  render () {
    const { data, modalInfo, networkInfo, setReact } = this.props
    const { actionModal } = this.actions

    if(!data) {
      return null
    }
    return (
      <Wrapper>
        <ModalInfo
          modalInfo={modalInfo}
          networkInfo={networkInfo}
          actionModal={actionModal}
        />
        <List>
          <List.Header>
            {TITLE_LIST.map(title => <List.Column size={title.size} key={title.id}>
              {title.name}
            </List.Column>)}
            <List.Column marginLeft />
          </List.Header>
          {data.map(item =>
            <List.Row key={item.internalId}>
              {TITLE_LIST && TITLE_LIST.map(({
                size,
                propItem,
                render
              }) => {
                return [
                  render && item &&
                  <List.Column key={item.internalId} size={size}>
                    {render(item[propItem])}
                  </List.Column>, !render && item &&
                  <List.Column key={item.internalId} size={size}>
                    {item[propItem]}
                  </List.Column>
                ]
              })}
          <ColumnBottons>
            <ContainerButtons>
            {item && !item.reacted &&
              <Button
                type={'secondary'}
                svg={<AlertIcon fill={'#fff'} />}
                onClick={() => setReact(item)}
                text={'React'}
              />
            }
            <Button
              type={'primary'}
              svg={<EyeIcon />}
              onClick={() => actionModal(item)}
              text={'Details'}
            />
            </ContainerButtons>
          </ColumnBottons>
        </List.Row>)}
    </List>
  </Wrapper>
    )
  }
}

export default Logic(ListAlerts)

const Wrapper = styled.div`
  overflow: auto;
  height: calc(100vh - 169px);
`


const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`

const Field = styled.p`
  color: white;
`
const FieldTitle = styled.span`
  font-weight: bold;
`

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
