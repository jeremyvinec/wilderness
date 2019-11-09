import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class DownloadItem extends React.Component {
  render() {
    return(
        <View style={styles.modal}>
          <View style={styles.newRegion}>
            <Text>Name new region</Text>
            <TextInput
              style={styles.inputBox}
              placeholder='Try "Hautes Alpes"'
              autoCapitalize='none'
              onChangeText={this.loadCities}
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Validate</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newRegion: {
    borderRadius: 10,
    width: 250,
    height: 150,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#2BB573',
  },
})
