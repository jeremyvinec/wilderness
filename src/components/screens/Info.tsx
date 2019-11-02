import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

interface State { }

export default class Info extends React.Component<Props, State> {

  account = () => {
    this.props.navigation.navigate('Profile')
  }
  render() {
    console.log(this.props)
    return(
            <View style={styles.container}>
              <TouchableOpacity style={styles.text} onPress={this.account}>
                <Text>Compte</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>Give feddback</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>Learn how use the map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>Terms & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>Data providers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.text}>
                <Text>Privacy policy</Text>
              </TouchableOpacity>
            </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '10%',
    marginTop: '10%',
  },
  text: {
    marginTop: 30,
  }
})
