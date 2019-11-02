import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

import icon from '../../assets/img/icon.png'
export default class CardType extends React.Component {
  render() {
    return(
        <View style={styles.changeMap}>
            <View style={styles.content_container}>
                <View>
                    <Text>Type de carte</Text>
                </View>
                <View style={styles.main_container}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Par défault</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Satellite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Relief</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <Text>Détails de la carte</Text>
                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  changeMap: {
    position: 'absolute',
    bottom: '5%',
    left: 48,
    right: 48,
    paddingVertical: 16,
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  content_container: {
    marginLeft: 20,
  },
  main_container: {
    flexDirection: 'row',
    marginTop: 15,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
  card: {
    marginRight: 15,
  },
})
