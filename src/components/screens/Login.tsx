import auth from '@react-native-firebase/auth'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, login, updateEmail, updatePassword } from '../../actions/actionUser'

import Person from '../../assets/svg/Person'
import Edit from '../../assets/svg/Edit'
interface Props {
  getUser: (user: String) => void,
  login: () => void,
  updateEmail: (email: String) => void,
  updatePassword: (password: String) => void,
  user: String,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  email: String,
  password: String
}

interface State { }

class Login extends React.Component<Props, State> {

  componentDidMount = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid)
        if (this.props.user !== null) {
          this.props.navigation.navigate('Profile')
        }
      }
    })
  }

  private updateEmail = (email: String) => {
    this.props.updateEmail(email)
  }

  private updatePassword = (password: String) => {
    this.props.updatePassword(password)
  }

  private login = () => {
    this.props.login()
  }

  private Signup = () => {
    this.props.navigation.navigate('Signup')
  }

  render() {
    const { user } = this.props
    return(
        <View style={styles.container}>
            <View style={styles.input_content}>
              <View style={styles.main_container}>
                <Person width='22' height='22' fill='#1F3044'/>
                <TextInput
                  style={styles.inputBox}
                  value={user.email}
                  onChangeText={this.updateEmail}
                  placeholder='Email'
                  autoCapitalize='none'
                />
              </View>
              <View style={styles.main_container}>
                <Edit width='22' height='22' fill='#1F3044'/>
                <TextInput
                  style={styles.inputBox}
                  value={user.password}
                  onChangeText={this.updatePassword}
                  placeholder='Password'
                  secureTextEntry={true}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.Signup}>
              <Text>Vous n'avez pas encore de compte ? S'inscrire</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    alignItems: 'center',
  },
  content_container: {
    flex: 1,
  },
  input_content: {
    marginLeft: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    fontSize: 15,
    marginLeft: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    color: '#2BB573',
  },
  buttonSignup: {
    fontSize: 12,
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ getUser, updateEmail, updatePassword, login }, dispatch)
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
