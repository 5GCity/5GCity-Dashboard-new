/**
 * FormFunctionSDK Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

const newParameter = {
    value: null
  }

export const PLACEHOLDER_CP = `[
  {
    "componentIndex": 0,
    "cpType": "EXTERNAL",
    "id": 0,
    "internalCpId": 0,
    "internalCpName": "string",
    "name": "string",
    "requiredPort": [
     0
    ]
  }
]`

export const PLACEHOLDER_RP = `[
  {
    "connectionPointName": "string",
    "id": 0,
    "ports": [
    0
    ]
  }
]`

export const PLACEHOLDER_SWIMAGE = `{
  "checksum": "string",
  "containerFormat": "string",
  "diskFormat": "string",
  "imgName": "string",
  "imgVersion": "string",
  "minCpu": 0,
  "minDisk": 0,
  "minRam": 0,
  "size": 0
}`
export const PLACEHOLDER_MONITPARAMS = `[
  {
    "id": "string",
    "name": "string",
    "parameterType": "AGGREGATED"
  }
]`

export const PLACEHOLDER_METADATA = `{
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}`

export const AddParameter = state => {
  const newState = { ...state }
  console.log(newState)
  const array = newState.functionParameters.array.concat(newParameter)
  newState.functionParameters.array = array
  return newState
  }

export const GetJsonFunction = (params, form) => {
  const JSONResult = { ...newFunctionJSON }
  const newParameters = []
  if(params.functionConnectPoints)
    JSONResult.connectionPoints = JSON.parse(params.functionConnectPoints)
  JSONResult.description = params.functionDescription
  JSONResult.flavourExpression = params.functionFlavourExp
  JSONResult.instantiationLevelExpression = params.functionInstExp
  if(params.functionMonitParams)
    JSONResult.monitoringParameters = JSON.parse(params.functionMonitParams)
  JSONResult.name = params.functionName
  JSONResult.ownerId = params.functionOwner
  JSONResult.groupId = params.functionGroup
  JSONResult.maxInstancesCount = params.functionMaxInst
  JSONResult.minInstancesCount = params.functionMinInst
  if(params.functionRequiredPorts)
    JSONResult.requiredPorts = JSON.parse(params.functionRequiredPorts)
  if(params.functionSofImaDta)
    JSONResult.swImageData = JSON.parse(params.functionSofImaDta)
  JSONResult.vnfdId = params.functionVNFId
  JSONResult.vendor = params.functionVendor
  JSONResult.version = params.functionVersion
  JSONResult.accessLevel = params.functionAccessLevel
  JSONResult.visibility = params.functionvisibility
  if(params.functionMetaData)
    JSONResult.metadata = JSON.parse(params.functionMetaData)
  form.functionParameters.array.forEach(parameter => {
    newParameters.push(parameter.value)
  })
  JSONResult.parameters = newParameters
  return JSONResult
}

const newFunctionJSON = {
  accessLevel: 0,
  connectionPoints: [
    {
      componentIndex: 0,
      cpType: "EXTERNAL",
      name: null,
      requiredPort: [
        0
      ]
    }
  ],
  description: null,
  flavourExpression: null,
  groupId: null,
  instantiationLevelExpression: null,
  maxInstancesCount: 5,
  metadata: {},
  minInstancesCount: 3,
  monitoringParameters: [
    {
      name: null,
      parameterType: "string"
    }
  ],
  name: null,
  ownerId: null,
  parameters: [
    null
  ],
  requiredPorts: [
    {
      connectionPointName: null,
      ports: [
        0
      ]
    }
  ],
  swImageData: {
    checksum: null,
    containerFormat: null,
    diskFormat: null,
    imgName: null,
    imgVersion: null,
    minCpu: 0,
    minDisk: 0,
    minRam: 0,
    size: 0
  },
  vendor: null,
  version: null,
  visibility: "PUBLIC",
  vnfdId: null
}

export const TransformInForm = data => {
  const array = []
  const form = Object.assign({}, DEFAULT_FORM)
  form.functionName.value = data.name
  form.functionOwner.value = data.ownerId
  form.functionVendor.value = data.vendor
  form.functionVersion.value = data.version
  form.functionVNFId.value = data.vnfdId
  form.functionDescription.value= data.description
  form.functionInstExp.value = data.instantiationLevelExpression
  form.functionFlavourExp.value = data.flavourExpression
  form.functionConnectPoints.value = JSON.stringify(data.connectionPoints)
  form.functionRequiredPorts.value = JSON.stringify(data.requiredPorts)
  form.functionSofImaDta.value = JSON.stringify(data.swImageData)
  // Add array parameters
  data.parameters.forEach(parameter => {
    array.push({value: parameter})
  })
  form.functionParameters.array = array
  form.functionGroup.value = data.groupId
  form.functionMaxInst.value = data.maxInstancesCount
  form.functionMinInst.value = data.minInstancesCount
  form.functionAccessLevel.value = data.accessLevel
  form.functionMonitParams.value = JSON.stringify(data.monitoringParameters)
  form.functionMetaData.value = JSON.stringify(data.metadata)
  form.functionvisibility.value = data.visibility
  return form
}

export const DEFAULT_FORM = {
  functionName: {
    value: null
  },
  functionOwner: {
    value: null
  },
  functionVendor: {
    value: null
  },
  functionVersion: {
    value: null
  },
  functionVNFId: {
    value: null
  },
  functionDescription: {
    value: null
  },
  functionInstExp: {
    value: null
  },
  functionFlavourExp: {
    value: null
  },
  functionConnectPoints: {
    value: null
  },
  functionRequiredPorts: {
    value: null
  },
  functionSofImaDta: {
    value: null
  },
  functionMonitParams: {
    value: null
  },
  functionMetaData: {
    value: null
  },
  functionParameters: {
    array: [
      {value: null}
    ]
  },
  functionGroup: {
    value: null
  },
  functionMaxInst: {
    value: null
  },
  functionMinInst: {
    value: null
  },
  functionAccessLevel: {
    value: null
  },
  functionvisibility: {
    value: null
  }
}
export const DEFAULT_FORM_NEW = {
  functionName: {
    value: null
  },
  functionOwner: {
    value: null
  },
  functionVendor: {
    value: null
  },
  functionVersion: {
    value: null
  },
  functionVNFId: {
    value: null
  },
  functionDescription: {
    value: null
  },
  functionInstExp: {
    value: null
  },
  functionFlavourExp: {
    value: null
  },
  functionConnectPoints: {
    value: null
  },
  functionRequiredPorts: {
    value: null
  },
  functionSofImaDta: {
    value: null
  },
  functionMonitParams: {
    value: null
  },
  functionMetaData: {
    value: null
  },
  functionParameters: {
    array: [
      {value: null}
    ]
  },
  functionGroup: {
    value: null
  },
  functionMaxInst: {
    value: null
  },
  functionMinInst: {
    value: null
  },
  functionAccessLevel: {
    value: null
  },
  functionvisibility: {
    value: null
  }
}

export const VISIBILITY = [{
  id: 1,
  name: "Public",
  value: "PUBLIC"
  },{
  id: 2,
  name: "Private",
  value: "PRIVATE"
  }]
