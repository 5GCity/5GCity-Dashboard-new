/**
 * Panelcomputesview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

export default class PanelComputesView extends Component {
  render () {
    const { computes }= this.props
    return (
      <Wrapper>
        {computes &&
        <Title>Computing</Title>
        }
        {computes && computes.map((compute, i) =>
          <TypeMarker
          key={compute.id}
            className={i === computes.length - 1 && 'noBorder'}
          >
            <Name>{compute.name}</Name>
            <Id>{compute.id}</Id>
            <Id>Status: {compute.status}</Id>
            {compute.computeData &&
              <Fragment>
                <Container>
                  <div>
                    <Id>CPU Provisioned: {compute.computeData.cpus.provisioned} cores </Id>
                    <Id>CPU Total: {compute.computeData.cpus.total} cores </Id>
                  </div>
                  <StatusColor color={compute.computeData.cpus.color} />
                </Container>
                <Container>
                  <div>
                    <Id>RAM Total: {compute.computeData.ram.total} {compute.computeData.ram.units} </Id>
                    <Id>RAM Provisioned: {compute.computeData.ram.provisioned} {compute.computeData.ram.units} </Id>
                  </div>
                    <StatusColor color={compute.computeData.ram.color} />
                </Container>
                <Container>
                  <div>
                    <Id>DISK Total: {compute.computeData.storage.total} {compute.computeData.storage.units} </Id>
                    <Id>DISK Provisioned: {compute.computeData.storage.provisioned} {compute.computeData.storage.units} </Id>
                  </div>
                    <StatusColor color={compute.computeData.storage.color} />
                </Container>
              </Fragment>
            }
          </TypeMarker>
        )}
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`

`

const Title = styled.h5`
  color: ${Theme.primaryColor};
  font-family: ${Theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
`

const TypeMarker = styled.div`
  border-bottom: 1px solid rgba(239,242,247,0.1);
  `

const Name = styled.p`
  margin: 12px 0;
  font-size: 18px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${Theme.fontFamily};
`

const Id = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${Theme.fontFamily};
  color: #89979F;
`

const StatusColor = styled.div`
  background-color: ${({color}) => color || 'transparent'};
  height: 24px;
  width: 24px;
  border-radius: 12px;
  margin-right: 20px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

