import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup, updateEmail, updatePassword, updateUsername } from '../../actions/actionUser'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  signup: () => void,
  updateUsername: (username: String) => void,
  updateEmail: (email: String) => void,
  updatePassword: (password: String) => void,
  user: String,
  email: String,
  username: String,
  password: String
}

interface State { }
class Signup extends React.Component<Props, State> {

  handleSignUp = () => {
    this.props.signup()
    this.props.navigation.navigate('Profile')
  }

  private updateUsername = (username: String) => {
    this.props.updateUsername(username)
  }

  private updateEmail = (email: String) => {
    this.props.updateEmail(email)
  }

  private updatePassword = (password: String) => {
    this.props.updatePassword(password)
  }

  render() {
    console.log(this.props.user)
    const { user } = this.props
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={user.username}
          onChangeText={this.username}
          placeholder='Username'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.inputBox}
          value={user.email}
          onChangeText={this.updateEmail}
          placeholder='Email'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.inputBox}
          value={user.password}
          onChangeText={this.updatePassword}
          placeholder='Password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Singup</Text>
        </TouchableOpacity>
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
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateEmail, updatePassword, signup, updateUsername }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
