import {MapController} from 'react-map-gl'

export default class MyMapController extends MapController {
  // Override the default handler in MapController
  handleEvent (event) {
    console.log(event.type)
    if (!event.type) {
      'pointer'
    }
    return super.handleEvent(event)
  }
}
