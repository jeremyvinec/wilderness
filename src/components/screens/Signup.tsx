import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Firebase from '../../utils/Firebase'

interface Props { }

interface State {
  name: String,
  email: String,
  password: String
}
export default class Signup extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSignup = () => {
    const { email, password } = this.state
    Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate('Profile'))
    .catch(error => console.log(error))
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={this.state.name}
          onChange={ name => this.setState({ name }) }
          placeholder='Nom complet'
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChange={ email => this.setState({ email }) }
          placeholder='Email'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChange={ password => this.setState({ password }) }
          placeholder='Password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
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
