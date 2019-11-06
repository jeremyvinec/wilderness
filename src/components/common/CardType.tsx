import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateStyleURL } from '../../actions/actionUser'
import { onSortOptions } from '../../utils'

import dark from '../../assets/img/dark.png'
import icon from '../../assets/img/icon.png'
import openstreetmap from '../../assets/img/openstreetmap.png'
import satellite from '../../assets/img/satellite.png'
import street from '../../assets/img/street.png'
import traffic from '../../assets/img/traffic.png'

interface Props {
  updateStyleURL: (styleURL: String) => void,
  styleURL: String
}

interface State { }
class CardType extends React.Component<Props, State> {

  private updateStyleURL = (styleURL: String) => {
    this.props.updateStyleURL(styleURL)
  }

  constructor(props: Props) {
    super(props)
    this._mapOptions = Object.keys(MapboxGL.StyleURL).map(key => {
      return {
        label: key,
        data: MapboxGL.StyleURL[key],
      }
    }).sort(onSortOptions)
  }

  outdoors = () => {
    this.updateStyleURL(this._mapOptions[2].data)
  }

  street = () => {
    this.updateStyleURL(this._mapOptions[5].data)
  }

  satellite = () => {
    this.updateStyleURL(this._mapOptions[4].data)
  }

  dark = () => {
    this.updateStyleURL(this._mapOptions[0].data)
  }

  traffic = () => {
    this.updateStyleURL(this._mapOptions[7].data)
  }

  render() {
    return(
        <View style={styles.changeMap}>
            <View style={styles.content_container}>
                <View>
                    <Text>Type de carte</Text>
                </View>
                <View style={styles.main_container}>
                    <TouchableOpacity style={styles.card} onPress={this.outdoors}>
                        <Image source={openstreetmap} style={styles.icon}/>
                        <Text style={styles.text}>Outdoors</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={this.street}>
                        <Image source={street} style={styles.icon}/>
                        <Text style={styles.text}>Street</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={this.satellite}>
                        <Image source={satellite} style={styles.icon}/>
                        <Text style={styles.text}>Satellite</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text>Détails de la carte</Text>
                </View>
                <View style={styles.main_container}>
                    <TouchableOpacity style={styles.card} onPress={this.dark}>
                        <Image source={dark} style={styles.icon}/>
                        <Text style={styles.text}>Dark</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={this.traffic}>
                        <Image source={traffic} style={styles.icon}/>
                        <Text style={styles.text}>Traffic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={this.outdoors}>
                        <Image source={icon} style={styles.icon}/>
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
  icon: {
    width: 50,
    height: 50,
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateStyleURL }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardType)
