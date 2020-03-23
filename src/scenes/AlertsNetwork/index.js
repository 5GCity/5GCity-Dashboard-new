/**
 * Alerts Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { OPTIONS_REACT } from './utils'

/* Container */
import ListAlerts from 'containers/Lists/ListAlerts'
import NavBar from 'containers/Navbar'

/* Components */
import PageTitle from 'components/PageTitle'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'
import Select from 'components/Select'
import DateRangePicker from 'components/DateRangePicker'
import Modal from 'components/Modal'
import { CloseIcon } from 'components/Icons'
import Button from 'components/Button'

const ModalError = props => {
  return (
    <Modal
      size={'tiny'}
      title={'Error'}
      visible={props.visible}
      onCancel={props.action}
    >
      <Modal.Body>
          <Title>
            { props.message && props.message }
        </Title>
      </Modal.Body>
      <Modal.Footer>
        <Button
          text={'Ok'}
          svg={<CloseIcon />}
          type={'secondary'}
          onClick={props.action}
        />
      </Modal.Footer>
    </Modal>
  )
}


class AlertsNetwork extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { networkTitle, alerts, errorFecth, dateRange, SelectStauts, modalError, modalErrorMessage } = this.props
    const { changeDate, changeStatus, setReact, actionModalError } = this.actions
    return (
      <Wrapper>
        <ModalError
          action={actionModalError}
          visible={modalError}
          message={modalErrorMessage}
        />
        <PageTitle
          title={networkTitle}
          buttonBack={() => this.navigateToBack()}
        />
        <ContainerFilters>
        <ContainerDatePicker>
          <DateRangePicker
            label={'Date'}
            isShowTime={true}
            value={dateRange}
            placeholder="Pick a range"
            onChange={date=>{
              changeDate(date)
            }}
          />
        </ContainerDatePicker>
          <Select
            label={'Reacted'}
            type={'default'}
            options={OPTIONS_REACT}
            value={SelectStauts}
            onChange={value => changeStatus(value)}
          />
        </ContainerFilters>
        <NavBar />
        <ListAlerts
          data={alerts && alerts}
          setReact={setReact}
        />
        {!alerts &&
        <NoData
          title={'You don’t have any alerts yet...'}
        />
        }
        {errorFecth &&
        <ErroPage />
        }
      </Wrapper>
    )
  }
}


export default Logic(AlertsNetwork)

const Wrapper = styled.div`
margin-left: 120px;
padding: 0 24px;
`

const ContainerFilters = styled.div`
  display:flex;
  justify-content: flex-end;
  border-bottom : 1px solid rgba(137,151,159,0.2);
  padding: 16px 0px;
`

const ContainerDatePicker = styled.div`
  margin-right: 10px;
  display: block;
`

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
