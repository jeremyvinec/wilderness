import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import icon from '../../assets/img/icon.png'

interface Props {
  updateStyle: (style: String) => void,
  style: String
}

interface State { }
export default class CardType extends React.Component<Props, State> {

  render() {
    return(
        <View style={styles.changeMap}>
            <View style={styles.content_container}>
                <View>
                    <Text>Type de carte</Text>
                </View>
                <View style={styles.main_container}>
                    <TouchableOpacity style={styles.card} onPress={this.outdoors}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Par défault</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={this.street}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Street</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Relief</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text>Détails de la carte</Text>
                </View>
                <View style={styles.main_container}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Transport</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Traffic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={icon}/>
                        <Text style={styles.text}>Vélo</Text>
                    </TouchableOpacity>
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
    right: '15%',
    paddingVertical: 16,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 30,
  },
  content_container: {
    marginLeft: 30,
  },
  main_container: {
    flexDirection: 'row',
    marginTop: 15,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  card: {
    marginRight: 15,
  },
  title: {
    marginTop: 15,
  },
})