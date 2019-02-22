/**
 * Monitoring Scene
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

/* Container */
import Monitor from 'containers/Monitor'

/* Components */
import HeaderNav from 'components/HeaderNav'
import { BackIcon } from 'components/Icons'
import DatePicker from 'components/DatePicker'
import Button from 'components/Button'



class Monitoring extends Component {

  state = {
    width: this.props.containerWidth / 5,
    height: this.props.containerHeight / 5,
  }

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  componentDidMount () {
    const { refreshAction } = this.actions
    setInterval(() => {
      refreshAction()
    }, 60000)
  }

  render () {
    const type = this.props.match.params.type
    const { date, CPU, RAM, DISK, TX, RX } = this.props
    const { setValue, refreshAction } = this.actions
    return (
      <Wrapper>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Monitoring'}
        />
        <ContainerDatePicker>
          <DatePicker
            format={'dd-MM-yyyy'}
            value={new Date(date * 1000)}
            placeholder="Pick a day"
            disabledDate={time=> time.getTime() > Date.now() - 1}
            onChange={date =>{console.log(date); setValue(date) }}
            isShowTrigger={false}
          />
          <WrapperButton>
            <Button
              type={'primary'}
              text={'Refresh'}
              //icon={'reload'}
              onClick={() => refreshAction()}
            />
          </WrapperButton>
        </ContainerDatePicker>
        <ContainerParentMonitor>
        <ContainerMonitor>
            <Monitor
              datakeyAxis={'date'}
              dataKeyArea={CPU && 'value'}
              data={CPU && CPU.data}
              max={CPU && CPU.max}
              unit={CPU && CPU.unit}
              width={600}
              height={350}
              title={type === 'slice' ? 'Average CPU' : 'CPU'}
              colorArea={'#8CC14E'}
            />
          </ContainerMonitor>
          <ContainerMonitor>
            <Monitor
              datakeyAxis={'date'}
              dataKeyArea={RAM && 'value'}
              data={RAM && RAM.data}
              max={RAM && RAM.max}
              unit={RAM && RAM.unit}
              width={600}
              height={350}
              title={type === 'slice' ? 'Average RAM' : 'RAM'}
              colorArea={'#2b7f0c'}
            />
            </ContainerMonitor>
          <ContainerMonitor>
            <Monitor
              datakeyAxis={'date'}
              dataKeyArea={DISK && 'value'}
              data={DISK && DISK.data}
              max={DISK && DISK.max}
              unit={DISK && DISK.unit}
              width={600}
              height={350}
              title={type === 'slice' ? 'Average DISK' : 'DISK'}
              colorArea={'#16a399'}
            />
        </ContainerMonitor>
        <ContainerMonitor>
            <Monitor
              datakeyAxis={'date'}
              dataKeyArea={RX && 'value'}
              data={RX && RX.data}
              max={RX && RX.max}
              unit={RX && RX.unit}
              width={600}
              height={350}
              title={type === 'slice' ? 'Average RX' : 'RX'}
              colorArea={'#edce23'}
            />
          </ContainerMonitor>
          <ContainerMonitor>
            <Monitor
              datakeyAxis={'date'}
              dataKeyArea={TX && 'value'}
              data={TX && TX.data}
              max={TX && TX.max}
              width={600}
              height={350}
              title={type === 'slice' ? 'Average TX' : 'TX'}
              colorArea={'#0b7691'}
              unit={TX && TX.unit}
            />
          </ContainerMonitor>
          </ContainerParentMonitor>
      </Wrapper>
    )
  }
}


export default withRouter((Logic(Monitoring)))

const Wrapper = styled.div`
  height: calc(100% - 80px) !important;
  width: 100%;
`
const ContainerDatePicker = styled.div`
  margin: 20px auto;
  width: 300px;
  display: block;
`
const ContainerParentMonitor = styled.div`
  margin: 10px auto;
  width: 100%;
  text-align: center;
`
const ContainerMonitor = styled.div`
  width: 600px;
  display: inline-block;
`
const WrapperButton = styled.div`
  display: inline;
  margin-left: 10px;
`
