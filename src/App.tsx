import MapboxGL from '@react-native-mapbox-gl/maps'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation'
import configureStore from './store/configureStore'
import { IS_ANDROID } from './utils/index'

// Persister et réhydrater un magasin Redux
import { persistStore } from 'redux-persist'
// Ce component se charge de réhydrater ses components enfants, c'est-à-dire toute notre application ici
import { PersistGate } from 'redux-persist/es/integration/react'

export interface Props { }

export interface State {
  isFetchingAndroidPermission: {},
  isAndroidPermissionGranted: boolean
}

const store = configureStore()

export class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
    }
  }

  async componentDidMount() {
    if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions()
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      })
    }
  }

  render() {
    const persistor = persistStore(store)
    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null
      }
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.noPermissionsText}>
            Vous devez accepter les autorisations d'emplacement pour utiliser cet exemple d'applications.
          </Text>
        </View>
      )
    }
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigation/>
          </PersistGate>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
