import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
// Icons
import ArrowDown from '../../assets/svg/ArrowDown'
import Geolocate from '../../assets/svg/Geolocate'
import Info from '../../assets/svg/Info'
import Layers from '../../assets/svg/Layers'
import Search from '../../assets/svg/Search'
import Altitude from '../common/Altitude'
import Compass from '../common/Compass'

interface Props {
  onToggleCompass: () => void,
  onToggleUserLocation: () => void,
  onToggleAltitude: () => void,
  onToggleSearch: () => void,
  toggleMap: () => void,
  onToggleInfo: () => void,
  toggleMenu: () => void,
  MapboxGL: {},
  followUserLocation: boolean,
}

interface State { }
export default class Menu extends React.Component<Props, State> {

  render() {
    const { onToggleCompass, onToggleUserLocation, onToggleAltitude, onToggleSearch, toggleMap, onToggleInfo, toggleMenu, MapboxGL } = this.props
    return(
        <View style={styles.bar}>
          <TouchableOpacity onPress={onToggleAltitude} style={styles.toggle}>
            <Altitude
              MapboxGL={MapboxGL}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleCompass} style={styles.toggle}>
            <Compass/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleUserLocation} style={styles.toggle}>
            <Geolocate width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleSearch} style={styles.toggle}>
            <Search width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMap} style={styles.toggle}>
            <Layers width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleInfo} style={styles.toggle}>
            <Info width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.toggle}>
            <ArrowDown width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: 30,
    height: 273,
    alignItems: 'center',
  },
  toggle: {
    marginTop: 15,
  },
})
