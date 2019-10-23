import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'

interface State {
  showUserLocation: boolean,
}

interface Props {

}

export default class SetUserTrackingModes extends React.Component<State, Props> {

  constructor(props: Props) {
    super(props)
    this.state = {
      showUserLocation: true,

    }
  }

  render() {
    const { showUserLocation } = this.state
    return(
            <MapboxGL.UserLocation visible={showUserLocation}/>
    )
  }
}
