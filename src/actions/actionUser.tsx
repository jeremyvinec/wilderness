import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { LOGIN, SEARCHED_TEXT, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from './actionTypes'

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

export const searchedText = (search: String) => {
  return{
    type: SEARCHED_TEXT,
    playload: search,
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
      const { email, password } = getState().user
      const response = await auth().createUserWithEmailAndPassword(email, password)
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email,
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
