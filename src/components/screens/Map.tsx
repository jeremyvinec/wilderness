import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || ''
MapboxGL.setAccessToken(MAPBOX_TOKEN)
export default class Map extends Component {
  render() {
    return (
      <MapboxGL.MapView
        style={styles.map}
        //styleURL='asset://style.json'
      >
      </MapboxGL.MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
