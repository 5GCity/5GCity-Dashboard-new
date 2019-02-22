/**
 * Monitoring Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import moment from 'moment'

export const transformMeasurement = (measurement) => {
  const measurementObject = {}
  measurementObject.data = []
  let keyUnit = null, unitSelect = null

  for (const key in measurement.maximum) {
    keyUnit= key
    measurementObject.max = measurement.maximum[key]
  }

  switch (keyUnit) {
    case 'cPU':
      unitSelect = '%'
      break;
      case 'rAM':
      unitSelect = '%'
      break;
      case 'dISK':
      unitSelect = '%'
      break;
      case 'tX':
      unitSelect = 'KB'
      break;
      case 'rX':
      unitSelect = 'KB'
      break;
      default:
      unitSelect = null
      break;
  }
  measurementObject.unit = unitSelect
  measurement.measurements && measurement.measurements.forEach(measurement =>{
    measurementObject.data.push({
      date: moment(measurement.timestamp).format('HH:mm'),
      value: measurement.value,
    })
  })
  return measurementObject;
}
