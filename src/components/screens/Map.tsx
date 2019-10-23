import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import config from '../../utils/config.js'
import Bubble from '../common/Bubble'

MapboxGL.setAccessToken(config.get('accessToken'))

interface State {
  showUserLocation: boolean,
}

interface Props { }
export default class Map extends React.Component<State, Props>{

  constructor(props: Props) {
    super(props)
    this.state = {
      showUserLocation: true,

    }
  }

  onToggleUserLocation() {
    this.setState({showUserLocation: !this.state.showUserLocation});
  }

  render() {
    const { showUserLocation } = this.state
    return (
      <View style={styles.map}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Outdoors}
        >
          <MapboxGL.UserLocation visible={showUserLocation}/>
          <MapboxGL.Camera
              centerCoordinate={[6.075870, 44.559860]}
              zoomLevel={12}
          />
        </MapboxGL.MapView>
        <Bubble onPress={this.onToggleUserLocation} style={{bottom: 180}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
