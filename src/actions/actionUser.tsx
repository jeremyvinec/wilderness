import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
//import storage from '@react-native-firebase/storage'
import { LOGIN, SIGNUP, UPDATE_AVATAR, UPDATE_EMAIL, UPDATE_LOCATION, UPDATE_PASSWORD, UPDATE_STYLE_URL, UPDATE_USERNAME } from './actionTypes'

export const updateUsername = (username: String) => {
  return {
    type: UPDATE_USERNAME,
    playload: username,
  }
}

export const updateEmail = (email: String) => {
  return {
    type: UPDATE_EMAIL,
    playload: email,
  }
}

export const updatePassword = (password: String) => {
  return {
    type: UPDATE_PASSWORD,
    playload: password,
  }
}

export const updateStyleURL = (styleURL: String) => {
  return{
    type: UPDATE_STYLE_URL,
    playload: styleURL,
  }
}

export const updateAvatar = (avatar: String) => {
  return {
    type: UPDATE_AVATAR,
    playload: avatar,
  }
}

export const updateLocation = (location: String) => {
  return {
    type: UPDATE_LOCATION,
    playload: location,
  }
}

export const login = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const { email, password } = getState().user
      const response = await auth().signInWithEmailAndPassword(email, password)
      dispatch(getUser(response.user.uid))
    } catch (e) {
      console.log(e)
    }
  }
}

export const getUser = (uid: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const user = await firestore().collection('users')
        .doc('uid')
        .get()

      dispatch({ type: LOGIN, playload: user.data() })
    } catch (e) {
      console.log(e)
    }
  }
}

export const signup = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const { email, password, username } = getState().user
      const response = await auth().createUserWithEmailAndPassword(email, password)
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email,
          username,
        }

        firestore().collection('users')
        .doc(response.user.uid)
        .set(user)

        dispatch({ type: SIGNUP, playload: user })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
