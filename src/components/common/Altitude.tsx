import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
interface Props {
  MapboxGL: { locationManager: { _lastKnownLocation: { coords: { altitude: number } } } }
}

interface State { }

export default class Altitude extends React.Component<Props, State> {

  elevation = () => {
    const { MapboxGL } = this.props
    if (MapboxGL.locationManager !== null) {
      return(
        <Text style={styles.altitude}>{Math.round(MapboxGL.locationManager._lastKnownLocation.coords.altitude)}</Text>
      )
    }
  }

  render() {
    return(
        <View style={styles.container}>
            <Text>Alt</Text>
            {this.elevation()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  altitude: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: -5,
  },
})
