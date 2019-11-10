import AsyncStorage from '@react-native-community/async-storage'
import { persistCombineReducers } from 'redux-persist'
import nameRegion from './offlineRegionReducer'
import user from './userReducer'

// configuration de la persistance du state global
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = persistCombineReducers(rootPersistConfig, {
  user, nameRegion,
})

export default rootReducer
