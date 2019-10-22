import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Map from './components/screens/Map'

export interface Props { }
export interface State { }

export class App extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Map/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
