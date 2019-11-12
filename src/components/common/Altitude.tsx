import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Triangle from '../../assets/svg/Triangle'
interface Props {
  MapboxGL: { locationManager: { _lastKnownLocation: { coords: { altitude: number } } } }
}

interface State { }

export default class Altitude extends React.Component<Props, State> {

  elevation = () => {
    const { MapboxGL } = this.props
    return(
      <Text style={styles.altitude}>{Math.round(MapboxGL.locationManager._lastKnownLocation.coords.altitude)}</Text>
    )
  }

  render() {
    return(
        <View style={styles.container}>
            <Triangle width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            {this.elevation()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  altitude: {
    fontSize: 8,
    textAlign: 'center',
    //lineHeight: 15,
  },
})
