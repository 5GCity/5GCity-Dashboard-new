/**
 * Panelltesview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

export default class PanelLTEsView extends Component {
  render () {
    const { ltes }= this.props
    return (
      <Wrapper>
        {ltes && ltes.map((lte, i) =>
        <Fragment key={lte.id}>
          <Title>LTE</Title>
          <Name>Box name: {lte.name}</Name>
          {lte.physical && lte.physical.map((physical, i)  =>
          <TypeMarker
            className={i === lte.physical.length - 1 && 'noBorder'}
            key={physical.id}>
            <Name>Name: {physical.name}</Name>
            <Id>{physical.id}</Id>
            {physical.config &&
              <Fragment key={i}>
                <Id>cellIdentity: {physical.config.cellIdentity}</Id>
                <Id>earfcndl: {physical.config.earfcndl}</Id>
                <Id>phyCellId: {physical.config.phyCellId}</Id>
                <Id>prachrootseqindex: {physical.config.prachrootseqindex}</Id>
                <Id>primaryMMEAddress: {physical.config.primaryMMEAddress}</Id>
                <Id>primaryMMEPort: {physical.config.primaryMMEPort}</Id>
                <Id>primaryPlmnId: {physical.config.primaryPlmnId}</Id>
                <Id>refSignalPower: {physical.config.refSignalPower}</Id>
                <Id>reservedForOperatorUse: {physical.config.reservedForOperatorUse}</Id>
                <Id>trackingAreaCode: {physical.config.trackingAreaCode}</Id>
              </Fragment>
            }
          </TypeMarker>
          )}
        </Fragment>
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
