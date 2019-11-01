import AsyncStorage from '@react-native-community/async-storage'
import { persistCombineReducers } from 'redux-persist'
import search from './searchReducer'
import user from './userReducer'

// configuration de la persistance du state global
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = persistCombineReducers(rootPersistConfig, {
  user, search,
})

export default rootReducer
