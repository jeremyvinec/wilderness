import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

// Icons
import ArrowDown from '../../assets/svg/ArrowDown'
import Compass from '../../assets/svg/Compass'
import Download from '../../assets/svg/Download'
import Geolocate from '../../assets/svg/Geolocate'
import Info from '../../assets/svg/Info'
import Layers from '../../assets/svg/Layers'
import Search from '../../assets/svg/Search'

interface Props {
  onToggleUserLocation: () => void,
  onToggleSearch: () => void,
  onDidFinishLoadingStyle: () => void,
  toggleMap: () => void,
  onToggleInfo: () => void,
  toggleMenu: () => void,
}

interface State { }
export default class Menu extends React.Component<Props, State> {

  render() {
    const { onToggleUserLocation, onToggleSearch, onDidFinishLoadingStyle, toggleMap, onToggleInfo, toggleMenu } = this.props
    console.log(this.props)
    return(
        <View style={styles.bar}>
          <TouchableOpacity onPress={onToggleUserLocation} style={styles.toggle}>
            <Compass width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleUserLocation} style={styles.toggle}>
            <Geolocate width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleSearch} style={styles.toggle}>
            <Search width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDidFinishLoadingStyle} style={styles.toggle}>
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
  percentageText: {
    padding: 8,
    textAlign: 'center',
  },
  offlineRegionStatus: {
    position: 'absolute',
    bottom: 16,
    left: 48,
    right: 48,
    paddingVertical: 16,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
})
