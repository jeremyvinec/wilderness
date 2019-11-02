import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class CardType extends React.Component {
  render() {
    return(
        <View style={styles.changeMap}>
            <View>
            <Text>Type de carte</Text>
            </View>
            <TouchableOpacity>

            </TouchableOpacity>
            <View>
            <Text>Par défault</Text>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  changeMap: {
    position: 'absolute',
    bottom: 16,
    left: 48,
    right: 48,
    paddingVertical: 16,
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
})
