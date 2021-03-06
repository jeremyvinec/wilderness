import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

interface State { }

export default class Info extends React.Component<Props, State> {

  account = () => {
    this.props.navigation.navigate('Profile')
  }

  feddback = () => {
    Linking.openURL('mailto:jeremy.yvinec@gmail.com?subject=Feedback')
  }

  render() {
    return(
            <View style={styles.container}>
              <View>
                <View style={styles.label}>
                  <Text>GENERAL</Text>
                </View>
                <TouchableOpacity style={styles.text} onPress={this.account}>
                  <Text>Compte</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.text} onPress={this.feddback}>
                  <Text>Give feddback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                  <Text>Learn how use the map</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.main_container}>
                <View style={styles.label}>
                  <Text>SOCIAL</Text>
                </View>
                <TouchableOpacity style={styles.text}>
                  <Text>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                  <Text>Intagram</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.main_container}>
                <View style={styles.label}>
                  <Text>LEGALS</Text>
                </View>
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
              <View style={styles.infoApp}>
                <Text>Version: 1.0 Production</Text>
                <Text>SDK: 1.0</Text>
              </View>
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
  main_container: {
    marginTop: 20,
  },
  text: {
    marginTop: 10,
  },
  infoApp: {
    marginTop: 100,
    opacity: 0.4,
  },
  label: {
    opacity: 0.4,
  },
})
