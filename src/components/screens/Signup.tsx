import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// tslint:disable-next-line:ordered-imports
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup, updateEmail, updatePassword } from '../../actions/actionUser'

interface Props {
  navigation: {},
  navigate: () => void,
  signup: () => void,
  updateEmail: (email: String) => void,
  updatePassword: (password: String) => void,
  user: String,
  email: String,
  password: String
}

interface State {
  name: String,
  email: String,
  password: String
}
class Signup extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSignUp = () => {
    this.props.signup()
    this.props.navigation.navigate('Profile')
  }

  private updateEmail = () => {
    this.props.updateEmail(this.props.email)
  }

  private updatePassword = () => {
    this.props.updatePassword(this.props.password)
  }

  render() {
    console.log(this.props)
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={this.props.user.email}
          onChange={this.updateEmail}
          placeholder='Email'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.inputBox}
          value={this.props.user.password}
          onChange={this.updatePassword}
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
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
