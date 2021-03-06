import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup, updateAvatar, updateEmail, updatePassword, updateUsername } from '../../actions/actionUser'

import Edit from '../../assets/svg/Edit'
import Person from '../../assets/svg/Person'
import Email from '../../assets/svg/Email'
import PersonProfile from '../../assets/svg/PersonProfile'

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  signup: () => void,
  updateUsername: (username: String) => void,
  updateEmail: (email: String) => void,
  updatePassword: (password: String) => void,
  updateAvatar: (avatar: {}) => void,
  user: String,
  email: String,
  username: String,
  password: String,
  avatar: {},
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

  private updateAvatar = (avatar: {}) => {
    this.props.updateAvatar(avatar)
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        alert('You cancelled image picker 😟')
      } else if (response.error) {
        alert('And error occured: ', response.error)
        console.log(response.error)
      } else {
        const avatar = { uri: response.uri }
        this.updateAvatar(avatar)
      }
    })
  }

  displayAvatar = () => {
    const { avatar } = this.props.user
    if (avatar) {
      return(
        <View style={styles.content_avatar}>
          <Image
            source={avatar}
            style={styles.avatar}
          />
        </View>
      )
    } else {
      return(
        <TouchableOpacity style={styles.button} onPress={this.pickImage}>
          <PersonProfile width='60' height='60' fill='#1F3044'/>
          <Text style={[{marginTop: 30},styles.buttonText]}>Pick image</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { user } = this.props
    return(
      <View style={styles.container}>
        {this.displayAvatar()}
        <View style={styles.input_content}>
          <View style={styles.main_container}>
            <Person width='22' height='22' fill='#1F3044'/>
            <TextInput
              style={styles.inputBox}
              value={user.username}
              onChangeText={this.updateUsername}
              placeholder='Username'
              autoCapitalize='none'
            />
          </View>
          <View style={styles.main_container}>
            <Email width='22' height='22' fill='#1F3044'/>
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
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Singup</Text>
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
    marginBottom: 30,
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
  content_avatar: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateEmail, updatePassword, signup, updateUsername, updateAvatar }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
