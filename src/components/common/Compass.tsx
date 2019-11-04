import React from 'react'
import { View } from 'react-native'
import {Text, View, Image, Dimensions} from "react-native";
import {magnetometer, SensorTypes, setUpdateIntervalForType} from "react-native-sensors"

const {height, width} = Dimensions.get("window")

interface Props {

}

interface State {

}

export default class Compass extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      magnetometer: '0',
    }
  }

  componentDidMount() {
    this._toggle()
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe()
    } else {
      this._subscribe()
    }
  }

  render() {
    return(
        <View>

        </View>
    )
  }
}
