import auth from '@react-native-firebase/auth'
import React from 'react'
import { Image, Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'

import profile from '../../assets/img/profile.png'
import ArrowRight from '../../assets/svg/ArrowRight'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  user: String,
  username: String,
  email: String,
}

interface State { 
  login: boolean,
  activities: String,
}
class Profile extends React.Component<Props, State> {

  constructor(props: Props){
    super(props)
    this.state = {
      login: true,
      activities: '',
    }
  }

  handleSignout = () => {
    auth().signOut()
    this.props.navigation.navigate('Login')
  }

  toggleLogOut = () => {
    this.setState({ login: !this.state.login })
  }

  logOut = () => {
    const { user } = this.props
    if (this.state.login) {
      return (
        <View>
          <View style={styles.username_container}>
            <Text>{user.username}</Text>
          </View>
          <View style={styles.email_container}>
            <Text>{user.email}</Text>
          </View>
        </View>
      )
    } else {
      return(
        <TouchableOpacity style={styles.email_container} onPress={this.handleSignout}>
          <Text style={{ color: '#D22D2D' }}>Log Out</Text>
        </TouchableOpacity>
      )
    }
  }

  updateActivities = (activities: String) => {
    this.setState({ activities })
  }

  render() {
    const { activities } = this.state
    const { user } = this.props
    return(
        <View style={styles.container}>
            <View style={styles.main_container}>
              <View>
                <Image source={profile}/>
              </View>
              <TouchableOpacity style={styles.content_container} onPress={this.toggleLogOut}>
                {this.logOut()}
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleSignout} style={styles.signOut}>
                  <ArrowRight width='22' height='22' fill='rgba(0,0,0,0.7)'/>
              </TouchableOpacity>
            </View>
            <View style={styles.activities}>
              <Text>My activities</Text>
              <View>
                <Picker
                  style={styles.picker}
                  selectedValue={activities}
                  onValueChange={this.updateActivities}
                >
                  <Picker.Item label='Cyclisme' value='cyclisme'/>
                  <Picker.Item label='course à pied' value='course à pied'/>
                </Picker>
              </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main_container: {
    flexDirection: 'row',
    margin: 15,
    marginTop: 50,
    alignItems: 'center',
  },
  content_container: {
    flex: 1,
    marginLeft: 15,
  },
  username_container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 1,
  },
  email_container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 1,
    opacity: 0.4,
  },
  activities: {
    marginTop: 50,
    marginLeft: 20,
  },
  signOut: {
    padding: 10,
  },
  picker: {
    margin: 0,
    width: '80%',
    height: 50,
    opacity: 0.4,
  },
})

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Profile)
