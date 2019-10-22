import firebase from 'react-native-firebase'
import 'react-native-firebase/firestore'

import { API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from 'react-native-dotenv'

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

firebase.initializeApp(config)

export default firebase = firebase.firestore()
