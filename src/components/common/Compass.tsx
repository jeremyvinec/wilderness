import React from 'react'
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'
import {magnetometer, SensorTypes, setUpdateIntervalForType} from 'react-native-sensors'

const {height, width} = Dimensions.get('window')

interface Props {

}

interface State {
  magnetometer: String,
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

  _subscribe = async () => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 100)
    this._subscription = magnetometer.subscribe(
      sensorData => this.setState({magnetometer: this._angle(sensorData)}),
      error => console.log('The sensor is not available'),
    )
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.unsubscribe()
    this._subscription = null
  }

  _angle = (magnetometer: number) => {
    let angle = 0
    if (magnetometer) {
      const {x, y} = magnetometer
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI)
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
      }
    }
    return Math.round(angle)
  }

  _direction = (degree: number) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE'
    } else if (degree >= 67.5 && degree < 112.5) {
      return 'E'
    } else if (degree >= 112.5 && degree < 157.5) {
      return 'SE'
    } else if (degree >= 157.5 && degree < 202.5) {
      return 'S'
    } else if (degree >= 202.5 && degree < 247.5) {
      return 'SW'
    } else if (degree >= 247.5 && degree < 292.5) {
      return 'W'
    } else if (degree >= 292.5 && degree < 337.5) {
      return 'NW'
    } else {
      return 'N'
    }
  }

  _degree = (magnetometer: number) => {
    return magnetometer - 90 >= 0
      ? magnetometer - 90
      : magnetometer + 271
  }

  render() {
    const { magnetometer } = this.state
    return(
        <View>
            <Text syle={styles.direction}>
                {this._direction(this._degree(magnetometer))}
            </Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  direction: {
    color: '#fff',
    fontSize: height / 26,
    fontWeight: 'bold',
  },
})
