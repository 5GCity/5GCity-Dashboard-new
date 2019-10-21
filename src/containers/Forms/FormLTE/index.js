/**
 * FormRAN Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Form from 'components/Form'
import Input from 'components/Input'

class FormLTE extends Component {
  render () {
    const { form, editResource } = this.props
    const { cellIdentity, earfcndl, phyCellId, prachrootseqindex,
            refSignalPower, primaryPlmnId, primaryMMEAddress,
            reservedForOperatorUse, primaryMMEPort, trackingAreaCode
    } = form
    const { change } = this.actions
    return (
      <Wrapper>
        <Title>{editResource.phy.name}</Title>
        <Form labelPosition={'top'} labelWidth='100'>
          <Form.Item
            label='Cell Identity'
            required
            status={!cellIdentity.valid}
          >
            <Input
              value={cellIdentity.value}
              onChange={value => change({cellIdentity: value})}
          />
            <Form.Error>{cellIdentity.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='earfcndl'
            required
            status={!earfcndl.valid}
          >
            <Input
              value={earfcndl.value}
              onChange={value => change({earfcndl: value})}
          />
            <Form.Error>{earfcndl.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='phyCellId'
            required
            status={!phyCellId.valid}
          >
            <Input
              value={phyCellId.value}
              onChange={value => change({phyCellId: value})}
          />
            <Form.Error>{phyCellId.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='prachrootseqindex'
            required
            status={!prachrootseqindex.valid}
          >
            <Input
              value={prachrootseqindex.value}
              onChange={value => change({prachrootseqindex: value})}
            />
            <Form.Error>{prachrootseqindex.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='primaryMMEAddress'
            required
            status={!primaryMMEAddress.valid}
          >
            <Input
              value={primaryMMEAddress.value}
              onChange={value => change({primaryMMEAddress: value})}
            />
            <Form.Error>{primaryMMEAddress.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='primaryMMEPort'
            required
            status={!primaryMMEPort.valid}
          >
            <Input
              value={primaryMMEPort.value}
              onChange={value => change({primaryMMEPort: value})}
            />
            <Form.Error>{primaryMMEPort.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='primaryPlmnId'
            required
            status={!primaryPlmnId.valid}
          >
            <Input
              value={primaryPlmnId.value}
              onChange={value => change({primaryPlmnId: value})}
            />
            <Form.Error>{primaryPlmnId.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='refSignalPower'
            required
            status={!refSignalPower.valid}
          >
            <Input
              value={refSignalPower.value}
              onChange={value => change({refSignalPower: value})}
            />
            <Form.Error>{refSignalPower.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='reservedForOperatorUse'
            required
            status={!reservedForOperatorUse.valid}
          >
            <Input
              value={reservedForOperatorUse.value}
              onChange={value => change({reservedForOperatorUse: value})}
            />
            <Form.Error>{reservedForOperatorUse.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='trackingAreaCode'
            required
            status={!trackingAreaCode.valid}
          >
            <Input
              value={trackingAreaCode.value}
              onChange={value => change({trackingAreaCode: value})}
            />
            <Form.Error>{trackingAreaCode.message}</Form.Error>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormLTE)

const Wrapper = styled.div`

`
const Title = styled.h5`
  color:${({theme}) => theme.primaryColor};
  font-family:${({theme}) => theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 16px;
`
