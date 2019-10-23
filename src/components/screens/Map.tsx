import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { Component } from 'react'
// import SetUserTrackingModes from './SetUserTrackingModes'
import { StyleSheet } from 'react-native'
import config from '../../utils/config.js'

MapboxGL.setAccessToken(config.get('accessToken'))
export default class Map extends Component {
  render() {
    return (
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Outdoors}
      >
         <MapboxGL.Camera
            centerCoordinate={[6.075870, 44.559860]}
            zoomLevel={12}
         />
      </MapboxGL.MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
