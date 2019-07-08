/**
 * Slicemap Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl'
import { MAPBOX_TOKEN , MAPBOX_STYLE, LOCATION } from 'config'
import ReactMapboxGl, { Marker, Layer, Feature } from 'react-mapbox-gl'
import Dimensions from 'react-dimensions'
import { NodeMarkerIcon, NodeRanIcon, NodeWifiIcon } from 'components/Icons'

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  minZoom: 2,
  maxZoom: 20,
  logoPosition: 'bottom-right',
  dragRotate: false,
  pitchWithRotate: false,
  touchZoomRotate: false,
})

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
}
const linePaint = {
  'line-color': '#8CC14E',
  'line-width': 4,
  "line-dasharray": [3.2,3.2],
 }


class SliceMap extends Component {

   state = {
    mapConfig: {
      containerStyle: {
        width: this.props.containerWidth,
        height: this.props.containerHeight,
      },
      center:LOCATION,
      fitBounds: null,
    }
  }

  componentDidMount() {
    const { location } = this.props
    let mapConfig = {
      ...this.state.mapConfig,
    }
    if (location) {
      if(location.length === 1) {
        mapConfig.center = location[0]
      } else if (location.length > 1) {
        var bounds = location.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(location[0], location[0]))
        let boundsTemp =[[bounds._sw.lng, bounds._sw.lat], [bounds._ne.lng, bounds._ne.lat]]
        mapConfig.fitBounds = boundsTemp
      }
    }
    setTimeout(() => {
      this.setState({mapConfig})
    }, 200);
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      const { location } = this.props
      let mapConfig = {
        ...this.state.mapConfig,
      }
      if (location) {
        if(location.length === 1) {
          mapConfig.center = location[0]
        } else if (location.length > 1) {
          var bounds = location.reduce(function(bounds, coord) {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(location[0], location[0]))
          let boundsTemp =[[bounds._sw.lng, bounds._sw.lat], [bounds._ne.lng, bounds._ne.lat]]
          mapConfig.fitBounds = boundsTemp
        }
      }
      this.setState({mapConfig})
    }
  }

  render () {
    const { markers, markerColor,markerClick, links } = this.props
    return (
      <Wrapper>
        <Map
          style={MAPBOX_STYLE}
          {...this.state.mapConfig}
          fitBoundsOptions={{ padding: { top: 20, bottom: 20, left: 40, right: 40 }, linear: false }}
          bounds={this.state.mapConfig.fitBounds}
        >
          <Layer
            type="line"
            id="physicalNetworkLine"
            paint={linePaint}
            layout={lineLayout}
          >
            {links && links.map(link =>
            <Feature
              key={link.id}
              coordinates={link.coordinates}
            />
            )}
          </Layer>
          {markers && markers.map((marker, i) =>
          <Marker
            key={i}
            draggable={marker.draggable}
            coordinates={[marker.location.longitude,marker.location.latitude]}
            offset={[-16,-45]}
            onClick={() => markerClick(marker)}
          >
            {!marker.location.resources.rans  &&
            <NodeMarkerIcon
              key={marker.id}
              color={marker.color || markerColor}
            />
            }
            {marker.location.resources.rans &&
            <NodeRAN
              key={marker.id}
              color={marker.color || markerColor}
            />
            }
            {marker.location.resources.isChunkete &&
            <NodeWifiIcon
              key={marker.id}
              color={marker.color || markerColor}
            />
            }
          </Marker>
          )}
        </Map>
      </Wrapper>
    )
  }
}


export default (Dimensions()(SliceMap))


const Wrapper = styled.div`
.mapboxgl-ctrl-bottom-right{
  display:none;
}
`
const AddIcon = styled.button`
  position: absolute;
  top: 10px;
  left: 50%;
  width: 26px;
  height: 26px;
  background-color: rgb(249, 249, 249);
  opacity: 0.95;
  cursor: pointer;
  border: 0px;
  background-position: 0px -26px;
  outline: 0px;
  border-radius: 2px;
`
const NodeRAN = styled(NodeRanIcon)`
  background-size: 36px 44px;
`
