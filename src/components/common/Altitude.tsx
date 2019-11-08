import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AltitudeIcon from '../../assets/svg/AltitudeIcon'
interface Props {
  MapboxGL: {}
}

interface State { }

export default class Altitude extends React.Component<Props, State> {
  render() {
    const { MapboxGL } = this.props
    //console.log(MapboxGL.locationManager._lastKnownLocation.coords)
    return(
        <View style={styles.container}>
            <AltitudeIcon width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            <Text style={styles.altitude}>2000</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10,
    position: 'absolute',
    top: '5%',
    right: '5%',
    width: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altitude: {
    fontSize: 8,
    textAlign: 'center',
  },
})
