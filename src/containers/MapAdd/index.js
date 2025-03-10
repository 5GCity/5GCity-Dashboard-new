/**
 * MapAdd Container
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
import { NodeMarkerIcon, NodeRanIcon } from 'components/Icons'

class MapAdd extends Component {

   state = {
    viewport: {
      width: this.props.containerWidth,
      height: this.props.containerHeight,
      zoom: 2,
      minZoom: 2,
    }
  }

  componentDidMount() {
    const { location } = this.props
    let viewport = {
      ...this.state.viewport,
      longitude: 0,
      latitude: 0,
      maxPitch: 0,
      minPitch: 0,
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
          padding: 40,
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

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const locationLength = location && location.length
    const prevLocationLength = prevProps.location &&  prevProps.location.length
    const needUpdate = Math.abs(locationLength - prevLocationLength)
      if (needUpdate !== 0) {
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
            padding: 40,
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
  }

  render () {
    const { markers, markerColor, mapClick, markerClick } = this.props
    return (
      <Wrapper>
        <ReactMapGL
          mapStyle={MAPBOX_STYLE}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          onClick={e => mapClick && mapClick(e)}

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
                {!marker.location.resources.rans  &&
                <NodeMarkerIcon
                  key={i}
                  color={marker.color || markerColor}
                  onClick={() => markerClick(marker)}
                />
                }
                {marker.location.resources.rans &&
                <NodeRanIcon
                  key={i}
                  color={marker.color || markerColor}
                  onClick={() => markerClick(marker)}
                />
                }
              </Marker>
            )}
        </ReactMapGL>
      </Wrapper>
    )
  }
}


export default (Dimensions()(MapAdd))


const Wrapper = styled.div`
.mapboxgl-ctrl-bottom-right{
  display:none;
}
`
