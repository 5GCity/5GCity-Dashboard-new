/**
 * Modalconfigurationslicelist Container
 * Please write a description
 *
 */

import React, { Component } from 'react'
import Logic from './logic'

/* Container */
import FormChunkAll from 'containers/Forms/FormChunkAll'
import FormChunkWifi from 'containers/Forms/FormChunkWifi'
import FormChunkLte from 'containers/Forms/FormChunkLte'

/* Component */
import Modal from 'components/Modal'
import { CheckIcon, CloseIcon } from 'components/Icons'
import Button from 'components/Button'

class ModalConfigurationSliceList extends Component {
  render () {
    const { loading, modalStatus, formType } = this.props
    const { actionModal, submit } = this.actions
    return (
      <Modal
        size={'tiny'}
        showClose
        onCancel={() => actionModal()}
        title='Configuration'
        visible={modalStatus}
      >
        <Modal.Body>
          {formType === 'all' &&
            <FormChunkAll />
          }
          {formType === 'wifi' &&
            <FormChunkWifi />
          }
          {formType === 'lte' &&
            <FormChunkLte />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            text={'Yes'}
            svg={<CheckIcon />}
            type={'primary'}
            loading={loading}
            onClick={() => submit()}
        />
          <Button
            text={'No'}
            svg={<CloseIcon />}
            type={'secondary'}
            onClick={() => actionModal()}
        />
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Logic(ModalConfigurationSliceList)
