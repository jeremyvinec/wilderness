import auth from '@react-native-firebase/auth'
import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from './actionTypes'

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    playload: email,
  }
}

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    playload: password,
  }
}

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user
      const response = await auth().signInWithEmailAndPassword(email, password)
      dispatch({ type: LOGIN, playload: response.user })
    } catch (e) {
      console.log(e)
    }
  }
}

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user
      const response = await auth().createUserWithEmailAndPassword(email, password)
      dispatch({ type: SIGNUP, playload: response.user })
    } catch (e) {
      console.log(e)
    }
  }
}