import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Pin from '../../assets/svg/Pin'

interface Props {
  data: {},
}

interface State {

}
export default class CitiesItem extends React.Component<Props, State> {
  render() {
    const { data } = this.props
    return(
        <TouchableOpacity style={styles.main_container}>
            <View>
                <Pin width='22' height='22' fill='#1F3044'/>
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
  },
  content_container: {
    flex: 1,
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
