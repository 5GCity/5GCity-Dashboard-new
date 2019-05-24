/**
 * Slicemap Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import ReactMapGL,{ Marker, FlyToInterpolator } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import { MAPBOX_TOKEN , MAPBOX_STYLE } from 'config'
import Dimensions from 'react-dimensions'
import { NodeMarkerIcon, NodeWifiIcon } from 'components/Icons'
//import MyMapController from './mapController'

class SliceMap extends Component {

   state = {
    viewport: {
      width: this.props.containerWidth,
      height: this.props.containerHeight,
    }
  }

  componentDidMount() {
    const { location } = this.props
    console.log(location)
    let viewport = {
      ...this.state.viewport,
      longitude: 0,
      latitude: 0,
      zoom: 2,
      maxPitch: 0,
      minPitch: 0,
      minZoom: 2,
      dragRotate: false,
    }
    if (location) {
    if(location.length === 1) {
      viewport.longitude = location[0][0]
      viewport.latitude = location[0][1]
      viewport.zoom = 16
      viewport.transitionDuration = 4000
      viewport.transitionInterpolator = new FlyToInterpolator()
    } else if (location.length > 1) {
      const bounds = location.reduce(function(bounds, coord) {
      return bounds.extend(coord)
      }, new mapboxgl.LngLatBounds(location[0], location[0]))
      const coordinates = []
      coordinates.push([bounds._ne.lng, bounds._ne.lat])
      coordinates.push([bounds._sw.lng, bounds._sw.lat])

      const {longitude, latitude, zoom} = new WebMercatorViewport(this.state.viewport)
        .fitBounds(coordinates, {
          padding: 20,
          offset: [0, -100]
        })
        viewport = {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom,
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator()
        }
      }
    }
        this.setState({viewport})
  }

 //mapController = new MyMapController()

  render () {
    const { markers, onClick, markerColor, mapClick } = this.props
    return (
      <Wrapper>
        <ReactMapGL
          mapStyle={MAPBOX_STYLE}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          //interactiveLayerIds={this.state.interactiveLayerIds}
          onViewportChange={(viewport) => this.setState({viewport})}
          onClick={(e) => mapClick && mapClick(e)}
          //controller={this.mapController}
        >
            { markers && markers.map((marker, i) =>
               <Marker
                key={i}
                draggable={marker.draggable}
                latitude={marker.location.latitude}
                longitude={marker.location.longitude}
                offsetLeft={-10}
                offsetTop={-20}
              >
                { !marker.location.resources.sdnWifi  &&
                <NodeMarkerIcon
                  key={i}
                  color={marker.color || markerColor}
                  onClick={() => onClick(marker)}
                />
                }
                { marker.location.resources.sdnWifi &&
                <NodeWifiIcon
                  key={i}
                  color={marker.color || markerColor}
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


export default (Dimensions()(SliceMap))


const Wrapper = styled.div`
.mapboxgl-ctrl-bottom-right{
  display:none;
}
`
