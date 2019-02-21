/**
 * Slicemap Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import ReactMapGL,{ Marker, FlyToInterpolator } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import { MAPBOX_TOKEN , MAPBOX_STYLE } from 'config'
import Dimensions from 'react-dimensions'
import { NodeMarkerIcon, NodeWifiIcon } from 'components/Icons'

class SliceMap extends Component {

   state = {
    viewport: {
      width: this.props.containerWidth,
      height: this.props.containerHeight,
      zoom: 4,
    }
  }

  componentDidMount() {
    const { markers } = this.props
    if(markers) {
      const allPosition = markers.map(marker => [marker.location.longitude, marker.location.latitude])
      if(allPosition.length > 2) {
      const { longitude, latitude } = new WebMercatorViewport(this.state.viewport)
        .fitBounds(allPosition);
        const viewport = {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom: 12,
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator()
        }
        this.setState({viewport})
      } else {
        const viewport = {
          ...this.state.viewport,
          longitude: parseFloat(allPosition[0][0]),
          latitude: parseFloat(allPosition[0][1]),
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator(),
          zoom: 14
        }
        this.setState({viewport})
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.markers !== prevProps.markers) {
    const { markers } = this.props
    if(markers) {
      const allPosition = markers.map(marker => [marker.location.longitude, marker.location.latitude])
      if(allPosition.length > 2) {
      const { longitude, latitude } = new WebMercatorViewport(this.state.viewport)
        .fitBounds(allPosition);
        const viewport = {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom: 10,
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator()
        }
        this.setState({viewport})
      } else {
        const viewport = {
          ...this.state.viewport,
          longitude: parseFloat(allPosition[0][0]),
          latitude: parseFloat(allPosition[0][1]),
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator(),
          zoom: 14
        }
        this.setState({viewport})
      }
    }
  }
  }


  render () {
    const { markers, onClick, markerColor } = this.props
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
