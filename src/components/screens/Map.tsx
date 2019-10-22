import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || ''
MapboxGL.setAccessToken('pk.eyJ1IjoiamVyZW15dmluZWMiLCJhIjoiY2sxdWxuZjBmMDdtNjNxbXc3cWhrd2swcyJ9.Tg1YMAL4jWG0FWmbPQRmvw')

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})

export default class Map extends Component {
  render() {
    console.log('ok')
    return (
      <MapboxGL.MapView style={styles.map}>

      </MapboxGL.MapView>
    )
  }
}