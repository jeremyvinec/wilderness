import React from 'react'
import { StyleSheet, View } from 'react-native'
import AltitudeIcon from '../../assets/svg/AltitudeIcon'
interface Props {

}

interface State { }

export default class Altitude extends React.Component<Props, State> {
  render() {
      // console.log(this.props.MapboxGL)
      // console.log(MapboxGL.locationManager._lastKnownLocation.coords)
    return(
            <View>
                <AltitudeIcon/>
            </View>
      )
  }
}

const styles = StyleSheet.create({

})
