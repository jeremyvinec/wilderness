import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
// Icons
import ArrowDown from '../../assets/svg/ArrowDown'
import Download from '../../assets/svg/Download'
import Geolocate from '../../assets/svg/Geolocate'
import Info from '../../assets/svg/Info'
import Layers from '../../assets/svg/Layers'
import Search from '../../assets/svg/Search'
import Compass from '../common/Compass'

interface Props {
  onToggleCompass: () => void,
  onToggleUserLocation: () => void,
  onToggleSearch: () => void,
  toggleDownload: () => void,
  toggleMap: () => void,
  onToggleInfo: () => void,
  toggleMenu: () => void,
}

interface State { }
export default class Menu extends React.Component<Props, State> {

  toggleDownload = () => {
    this.props.toggleDownload()
    this.props.toggleMenu()
  }

  render() {
    const { onToggleCompass, onToggleUserLocation, onToggleSearch, toggleMap, onToggleInfo, toggleMenu } = this.props
    return(
        <View style={styles.bar}>
          <TouchableOpacity onPress={onToggleCompass} style={styles.toggle}>
            <Compass/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleUserLocation} style={styles.toggle}>
            <Geolocate width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleSearch} style={styles.toggle}>
            <Search width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleDownload} style={styles.toggle}>
            <Download width='22' height='22' fill='rgba(0,0,0,0.7)'/>
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
    height: 268,
    alignItems: 'center',
  },
  toggle: {
    marginTop: 15,
  },
})
