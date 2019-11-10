import AsyncStorage from '@react-native-community/async-storage'
import { persistCombineReducers } from 'redux-persist'
import offlineRegion from './offlineRegionReducer'
import user from './userReducer'

// configuration de la persistance du state global
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = persistCombineReducers(rootPersistConfig, {
  user, offlineRegion,
})

export default rootReducer
