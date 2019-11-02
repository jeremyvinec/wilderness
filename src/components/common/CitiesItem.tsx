import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Pin from '../../assets/svg/Pin'

interface Props {
  data: String
}

interface State {

}
export default class CitiesItem extends React.Component<Props, State> {
  render() {
    console.log(this.props.data)
    const { data } = this.props
    return(
        <TouchableOpacity>
            <View>
                <Pin/>
            </View>
            <View>e
              <View>
                <Text>{data.text}</Text>
              </View>
              <View>
                <Text></Text>
              </View>
            </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

})
