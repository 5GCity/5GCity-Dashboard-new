/**
 * Panelltesview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'


/**
cellIdentity: 256
earfcndl: 41690
phyCellId: 5
prachrootseqindex: 100
primaryMMEAddress: "10.10.201.59"
primaryMMEPort: 3333
primaryPlmnId: "00103"
refSignalPower: -40
reservedForOperatorUse: "not-reserved"
trackingAreaCode: 67
 */

export default class PanelLTEsView extends Component {
  render () {
    const { ltes }= this.props
    return (
      <Wrapper>
        {ltes &&
        <Title>LTE</Title>
        }
        <Name>Box name: {ltes.name}</Name>
        {ltes && ltes.physical.map((lte, i) =>
        <TypeMarker
          className={i === ltes.physical.length - 1 && 'noBorder'}
          key={lte.id}>
          <Name>Name: {lte.name}</Name>
          <Id>{lte.id}</Id>
          <Id>cellIdentity: {lte.config.cellIdentity}</Id>
          <Id>earfcndl: {lte.config.earfcndl}</Id>
          <Id>phyCellId: {lte.config.phyCellId}</Id>
          <Id>prachrootseqindex: {lte.config.prachrootseqindex}</Id>
          <Id>primaryMMEAddress: {lte.config.primaryMMEAddress}</Id>
          <Id>primaryMMEPort: {lte.config.primaryMMEPort}</Id>
          <Id>primaryPlmnId: {lte.config.primaryPlmnId}</Id>
          <Id>refSignalPower: {lte.config.refSignalPower}</Id>
          <Id>reservedForOperatorUse: {lte.config.reservedForOperatorUse}</Id>
          <Id>trackingAreaCode: {lte.config.trackingAreaCode}</Id>
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
