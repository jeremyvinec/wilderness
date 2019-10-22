import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import test from './testReducer'

// configuration de la persistance du state global
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const rootReducer = persistCombineReducers(rootPersistConfig, {
    test
})

export default rootReducer
