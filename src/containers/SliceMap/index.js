/**
 * Slicemap Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import { connect } from 'kea'
import Logic from './logic'
import styled from 'styled-components'
import ReactMapGL,{ Marker } from 'react-map-gl'
import { MAPBOX_TOKEN , MAPBOX_STYLE } from 'config'
import Dimensions from 'react-dimensions';
import { NodeMarkerIcon, NodeWifiIcon } from 'components/Icons';

class SliceMap extends Component {

  state = {
    viewport: {
      width: this.props.containerWidth,
      height: this.props.containerHeight,
      latitude: 41.39695180342038,
      longitude: 2.1569907609795886,
      zoom: 4
    }
  }

  render () {
    const { markers, onClick } = this.props
    return (
      <Wrapper>
        <ReactMapGL
          mapStyle={MAPBOX_STYLE}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})} >
            { markers && markers.map((marker, i) => 
               <Marker 
                key={i} 
                draggable={marker.draggable} 
                latitude={marker.location.latitude} 
                longitude={marker.location.longitude} 
                offsetLeft={-10} 
                offsetTop={-20} >
                {!marker.location.resources.hotspots  &&
                <NodeMarkerIcon 
                  key={i} 
                  color={marker.color}
                  onClick={() => onClick(marker)}  
                />
                }
                {marker.location.resources.hotspots &&
                <NodeWifiIcon 
                  key={i} 
                  color={marker.color}
                  onClick={() => onClick(marker)}  
                />
                }
              </Marker> 
            )}
        </ReactMapGL>
      </Wrapper>
    )
  }
}


export default connect({
  props: [
    Logic, [

    ]
  ],

  actions: [
    Logic, [

    ]
  ]
})(Dimensions()(SliceMap))


const Wrapper = styled.div`
.mapboxgl-ctrl-bottom-right{
  display:none;  
}
`
