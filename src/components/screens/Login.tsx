import React from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, updateEmail, updatePassword } from '../../actions/actionUser'

interface Props { }

interface State {
  email: String,
  password: String
}

class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleLogin = () => {
    this.props.login()
    this.props.navigation.navigate('Profile')
  }

  render() {
    return(
        <View style={styles.container}>
            <TextInput
              style={styles.inputBox}
              value={this.state.email}
              onChangeText={email => this.props.updateEmail(email)}
              placeholder='Email'
              autoCapitalize='none'
            />
            <TextInput
              style={styles.inputBox}
              value={this.state.password}
              onChangeText={password => this.props.updatePassword(password)}
              placeholder='Password'
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button
              title="Vous n'avez pas encore de compte ? S'inscrire"
              onPress={() => this.props.navigation.navigate('Signup')}
            />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
