/**
 * Monitoring Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
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
import { Layout } from 'element-react'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 2400, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 2400, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 2400, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 2400, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 2400, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 2400, amt: 2100,
  },
];


class Monitoring extends Component {

  state = {
    width: this.props.containerWidth / 5,
    height: this.props.containerHeight / 5,
  }

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { date } = this.props

    return (
      <Wrapper>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Monitoring'}
        />
{/*         <Layout.Row gutter="10" justify="center">
          <Layout.Col span="6">
            <DatePicker
              format={'dd-MM-yyyy'}
              value={new Date(date*1000)}
              placeholder="Pick a day"
              disabledDate={time=> time.getTime() > Date.now() - 1}
            />
            </Layout.Col>
            <Layout.Col span="6">
            <Button
              type={'primary'}
              text={'Refresh'}
              //icon={'reload'}
            />
            </Layout.Col>
        </Layout.Row> */}
        <Graph>
        <Layout.Row gutter="10" justify="center">
          <Layout.Col sm="24" md="6" lg="8">
            <Monitor
              data={data}
              max={2000}
              width={600}
              height={350}
              title={'CPU'}
              colorArea={'#8CC14E'}
            />
          </Layout.Col>
          <Layout.Col sm="24" md="6" lg="8">
            <Monitor
              data={data}
              width={600}
              max={2000}
              height={350}
              title={'RAM'}
              colorArea={'#2b7f0c'}
            />
          </Layout.Col>
          <Layout.Col sm="24" md="6" lg="8">
            <Monitor
              data={data}
              width={600}
              max={2000}
              height={350}
              title={'DISK'}
              colorArea={'#16a399'}
            />
          </Layout.Col>
        </Layout.Row>
        </Graph>
        <Graph>
        <Layout.Row gutter="10" justify="center">
          <Layout.Col sm="24" md="12" lg="12">
            <Monitor
              data={data}
              width={800}
              max={2000}
              height={350}
              title={'RX'}
              colorArea={'#edce23'}
            />
          </Layout.Col>
          <Layout.Col sm="24" md="12" lg="12">
            <Monitor
              data={data}
              width={800}
              max={2000}
              height={350}
              title={'TX'}
              colorArea={'#0b7691'}
            />
          </Layout.Col>
        </Layout.Row>
        </Graph>
      </Wrapper>
    )
  }
}


export default withRouter((Logic(Monitoring)))

const Wrapper = styled.div`
  height: calc(100% - 100px) !important;
`
const Form = styled.div`
  margin: 10px 0;
`
const Graph = styled.div`
  margin 20px 0;
`
