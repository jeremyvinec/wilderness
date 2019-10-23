import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Geolocate from '../../assets/svg/Geolocate'
import config from '../../utils/config.js'

MapboxGL.setAccessToken(config.get('accessToken'))

interface State {
  followUserLocation: boolean,
}

interface Props { }
export default class Map extends React.Component<State, Props> {

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
        <TouchableOpacity onPress={this.onToggleUserLocation} style={{bottom: 100}}>
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
})
