import auth from '@react-native-firebase/auth'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  user: String,
  email: String
}

interface State { }
class Profile extends React.Component<Props, State> {

  handleSignout = () => {
    auth().signOut()
    this.props.navigation.navigate('Login')
  }

  render() {
    return(
        <View> style={styles.container}
            <Text>Profile Screen</Text>
            <Text>{this.props.user.email}</Text>
            <Button title='Logout' onPress={this.handleSignout}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Profile)
