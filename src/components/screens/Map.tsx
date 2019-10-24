import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Geolocate from '../../assets/svg/Geolocate'
import config from '../../utils/config.js'

MapboxGL.setAccessToken(config.get('accessToken'))

interface Props { }

interface State {
  followUserLocation: boolean,
}
export default class Map extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      followUserLocation: true,
    }
  }

  onToggleUserLocation() {
    this.setState({followUserLocation: !this.state.followUserLocation})
  }

  render() {
    const { followUserLocation } = this.state
    return (
      <View style={styles.map}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Outdoors}
        >
          <MapboxGL.UserLocation visible={followUserLocation}/>
          <MapboxGL.Camera
              zoomLevel={12}
              followUserLocation={followUserLocation}
              followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading || 'normal'}
          />
        </MapboxGL.MapView>
        <TouchableOpacity onPress={this.onToggleUserLocation} style={styles.onToggleUserLocation}>
          <Geolocate width='40' height='40' fill='#000'/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  onToggleUserLocation: {
    position: 'absolute',
    top: '5%',
    right: '1%',
  }
})
