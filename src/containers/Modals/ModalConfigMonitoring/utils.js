/**
 * ModalConfigParameters Container Utils
 * Please write a description
 *
 */

import * as Check from 'validations'
import mapValues from 'lodash/mapValues'

const defaultForm = {
  name: {
    value: null
  },
  actionType: {
    value: null
  },
  monitoringType: {
    value: null
  },
  functionAssociated: {
    value: null
  }
}

export const DEFAULT_FORM = [{
  ...defaultForm
}]

export const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  actionType: [
    Check.isRequired
  ],
  monitoringType: [
    Check.isRequired
  ],
  functionAssociated: [
    Check.isRequired
  ]
}

/**
 * Verify how many parameter has and create form
 * @param {Object} node Node
 */
export const setForm = node => {
  const array = []
  node.monitoring_service.forEach(element =>
    array.push({
      value: null,
      valid: true
    })
  )
  for (let index = 0; index < array.length; index++) {
    const element = node.mapping_expression[index]
    if (element) {
      array[index].value = element
    } else {
      array[index].value = null
    }
  }
  return array
}

export const ACTIONS_OPTIONS = [
  {
    id: 1,
    name: 'Imported',
    value: 'IMPORTED'
  }
]

export const MONITORING_TYPE = [
  {
    id: 1,
    name: 'External',
    value: 'external'
  }
]

/**
 * Set Monitoring as VNF has
 * @param {Ojbect} nodeInfo Node Information
 */
export const SetMonitoringFunc = nodeInfo => {
  let array = null
  if (nodeInfo.monitoringVNF) {
    array = nodeInfo.monitoringVNF.map(monitoring => ({
      name: monitoring.name,
      value: monitoring.id.toString(),
      id: monitoring.id
    }))
  }
  return array
}

export const DisableMonitoring = (state, payload) => {
  const result = [ ...state ]
  result.forEach(monitoring => {
    if (monitoring.id === payload.value) {
      monitoring.disabled = !monitoring.disabled
    } else if (monitoring.id !== payload.value && monitoring.disabled === true) {
      monitoring.disabled = false
    }
  })
  return result
}

/**
 * Add more field to the form
 * @param {array} state State of Form
 */
export const AddMonitoring = state => {
  const result = [ ...state ]
  const newField = Check.checkValidation(DEFAULT_FORM, VALIDATIONS).form[0]
  result.push({...newField})
  return result
}
/**
 * Remove monitoring Form
 * @param {object} state Form
 * @param {object} monitoring object to remove
 */
export const RemoveMonitoring = (state, i) => {
  const result = [ ...state ]
  return result.slice(0, i).concat(result.slice(i + 1, result.length))
}

export const ValidationForm = (state, payload) => {
  const result = [ ...state ]
  let newPayload = null
  if (!payload.field) {
    const field = `{"${payload.key}": ${payload.value}}`
    newPayload = { field: JSON.parse(field) }
  } else {
    newPayload = payload
  }
  const input = state[payload.index]
  const test = Check.setAndCheckValidation(input, newPayload, VALIDATIONS)
  result[payload.index] = test
  return result
}

export const GenerateNode = (monitoring, node) => {
  const newNode = { ...node }
  const result = {extMonitoringParameters: [], intMonitoringParameters: []}
  monitoring.forEach(monitoring => {
    const { functionAssociated, monitoringType, actionType, name } = mapValues(monitoring, ({ value }) => value)
    if (monitoringType === 'external') {
      result.extMonitoringParameters.push({
        componentIndex: nodeId(node),
        importedParameterId: functionAssociated.toString(),
        parameterType: actionType,
        name: name
      })
    } else {
      result.intMonitoringParameters.push({
        componentIndex: nodeId(node),
        importedParameterId: functionAssociated.toString(),
        parameterType: actionType,
        name: name
      })
    }
  })
  newNode.monitoring_service = result
  return newNode
}

const nodeId = node => {
  const item = Object.assign({}, node)
  const id = item.id.split('node')
  return id[1]
}

export const SetForm = node => {
  let form = null
  if (node.monitoring_service) {
    form = []
    node.monitoring_service.extMonitoringParameters &&
    node.monitoring_service.extMonitoringParameters.forEach(ext => {
      form.push({
        name: {value: ext.name},
        actionType: {value: ext.parameterType},
        monitoringType: {value: 'external'},
        functionAssociated: {value: ext.importedParameterId}
      })
    })
    node.monitoring_service.intMonitoringParameters &&
    node.monitoring_service.intMonitoringParameters.forEach(int => {
      form.push({
        name: {value: int.name},
        actionType: {value: int.parameterType},
        monitoringType: {value: 'internal'},
        functionAssociated: {value: ext.importedParameterId}
      })
    })
  } else {
    form = DEFAULT_FORM
  }
  form.map(monitoring =>
    Check.checkValidation(monitoring, VALIDATIONS).form
    )
  return form
}
