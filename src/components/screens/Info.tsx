import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default class Info extends React.Component {
  render() {
    return(
            <View>
              <TouchableOpacity>
                <Text>Compte</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Give feddback</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Learn how use the map</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Support</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Terms & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Data providers</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Privacy policy</Text>
              </TouchableOpacity>
            </View>
    )
  }
}
