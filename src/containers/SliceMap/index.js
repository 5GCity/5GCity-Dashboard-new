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
import ReactMapGL,{ Marker, FlyToInterpolator } from 'react-map-gl'
import DeckGL, { LineLayer } from 'deck.gl'
import WebMercatorViewport from 'viewport-mercator-project'
import Dimensions from 'react-dimensions'
import { NodeMarkerIcon, NodeRanIcon, NodeWifiIcon, NodeBoxLTE } from 'components/Icons'


class SliceMap extends Component {

  state = {
    viewport: {
      width: this.props.containerWidth,
      height: this.props.containerHeight,
      zoom: 3,
      minZoom: 3,
    },
    isMount: false
  }

   componentDidMount () {
    const { location } = this.props
    let viewport = {
      ...this.state.viewport,
      longitude: 0,
      latitude: LOCATION[0],
      maxPitch: LOCATION[1],
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
      this.setState({isMount: false})
    }
        this.setState({viewport})
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { isMount } = this.state
    const locationLength = location && location.length
    const prevLocationLength = prevProps.location && prevProps.location.length
    const needUpdate = Math.abs(locationLength - prevLocationLength)
      if (needUpdate !== 0) {
      let viewport = {
        ...this.state.viewport,
        dragRotate: false,
      }
      if (location) {
      if(location.length === 1) {
        viewport.longitude = location[0][0]
        viewport.latitude = location[0][1]
        viewport.zoom = 16
        viewport.transitionDuration = 4000
        viewport.transitionInterpolator = new FlyToInterpolator()
      } else if (location.length > 1 && !isMount) {
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
        this.setState({viewport, isMount : true})
    }
  }

  componentWillMount () {
    this.setState({isMount: false})
  }




  render () {
    const { markers, markerColor,markerClick, mapClick, links } = this.props
    const allLinks = links === 'undefined' ? [] : links
    const layers = new LineLayer({
      data: allLinks,
      fp64: true,
      getWidth: 5,
      setLineDash: 4,
      getSourcePosition: d => d.coordinates.source,
      getTargetPosition: d => d.coordinates.target,
      widthMaxPixelswidthMaxPixels: 100,
      getColor: [140, 193, 78, 255],
     })
    return (
      <Wrapper>
       <ReactMapGL
          mapStyle={MAPBOX_STYLE}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          onClick={e => mapClick && mapClick(e)}

      >
        <DeckGL
          viewState={this.state.viewport}
          layers={layers}
        />
          {markers && markers.map((marker, i) =>
          <Marker
            key={i}
            draggable={marker.draggable}
            latitude={marker.location.latitude}
            longitude={marker.location.longitude}
            offsetLeft={-24}
            offsetTop={-48}
          >
            {!marker.location.resources.rans &&
             !marker.location.resources.wifi &&
             !marker.location.resources.LTE &&
            <NodeMarkerIcon
              key={marker.id}
              color={marker.location.color || markerColor}
              onClick={() => markerClick(marker)}
            />
            }
            {marker.location.resources.rans &&
            <NodeRAN
              key={marker.id}
              color={marker.location.color || markerColor}
              onClick={() => markerClick(marker)}
            />
            }
            {marker.location.resources.wifi &&
            <NodeWifiIcon
              key={marker.id}
              fill={marker.location.color || markerColor}
              onClick={() => markerClick(marker)}
            />
            }
            {marker.location.resources.LTE &&
            <NodeBoxLTE
              key={marker.id}
              fill={marker.location.color || markerColor}
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

export default (Dimensions()(SliceMap))

const Wrapper = styled.div`
.mapboxgl-ctrl-bottom-right{
  display:none;
}
`
const NodeRAN = styled(NodeRanIcon)`
  background-size: 36px 44px;
`
