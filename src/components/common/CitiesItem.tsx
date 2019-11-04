import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'

import Pin from '../../assets/svg/Pin'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  data: {},
  dispatch: () => void,
}

interface State { }
class CitiesItem extends React.Component<Props, State> {

  onLocation = () => {
    const { center } = this.props.data
    const locationAction = { type: 'UPDATE_LOCATION', playload: center }
    this.props.dispatch(locationAction)
    this.props.navigation.navigate('Map')
  }

  render() {
    const { data } = this.props
    return(
        <TouchableOpacity style={styles.main_container} onPress={this.onLocation}>
            <View>
                <Pin width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            </View>
            <View style={styles.content_container}>
              <View style={styles.citie_container}>
                <Text>{data.text}</Text>
              </View>
              <View style={styles.region_container}>
                <Text>{data.place_name}</Text>
              </View>
            </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  content_container: {
    flex: 1,
    marginLeft: 10,
  },
  citie_container: {
    flexDirection: 'row',
    marginTop: 1,
    justifyContent: 'space-between',
  },
  region_container: {
    flexDirection: 'row',
    marginTop: 1,
    justifyContent: 'space-between',
    opacity: 0.4,
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(CitiesItem)
