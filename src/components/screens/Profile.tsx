import auth from '@react-native-firebase/auth'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'

import icon from '../../assets/img/icon.png'
import ArrowRight from '../../assets/svg/ArrowRight'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  user: String,
  email: String,
}

interface State { }
class Profile extends React.Component<Props, State> {

  handleSignout = () => {
    auth().signOut()
    this.props.navigation.navigate('Login')
  }

  render() {
    const { user } = this.props
    return(
        <View style={styles.main_container}>
            <View>
              <Image source={icon}/>
            </View>
           <View style={styles.content_container}>
            <View style={styles.username_container}>
              <Text>{user.username}</Text>
            </View>
            <View style={styles.email_container}>
              <Text>{user.email}</Text>
            </View>
           </View>
           <TouchableOpacity onPress={this.handleSignout}>
              <ArrowRight width='22' height='22' fill='#1F3044'/>
           </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    margin: 15,
    marginTop: 50,
    alignItems: 'center',
  },
  content_container: {
    flex: 1,
  },
  username_container: {
    flexDirection: 'row',
    marginTop: 1,
    justifyContent: 'space-between',
  },
  email_container: {
    flexDirection: 'row',
    marginTop: 1,
    justifyContent: 'space-between',
    opacity: 0.4,
  },
})

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Profile)
