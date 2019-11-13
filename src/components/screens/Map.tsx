import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import CardType from '../common/CardType'
import OfflineRegion from '../common/OfflineRegion'
import Menu from './Menu'

// icons
import ArrowUp from '../../assets/svg/ArrowUp'

import config from '../../utils/config.js'
import NameRegion from '../common/NameRegion'

MapboxGL.setAccessToken(config.get('accessToken'))

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  location: [],
  updateLocation: (location: String) => void,
  user: { location: [], styleURL: String },
}

interface State {
  followUserLocation: boolean,
  menuOpen: boolean,
  downloadOpen: boolean,
  onMapChange: boolean,
  toggleNameRegion: boolean,
  startDownload: boolean,
  reason: String,
  zoomLevel: number,
}
class Map extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      followUserLocation: true,
      menuOpen: true,
      downloadOpen: false,
      onMapChange: false,
      toggleNameRegion: false,
      startDownload: false,
      reason: '',
      zoomLevel: 12,
    }
  }

  onRegionWillChange = (regionFeature) => {
    this.setState({reason: 'will change', regionFeature})
  }

  onRegionIsChanging = (regionFeature) => {
    this.setState({reason: 'is changing', regionFeature})
  }

  onRegionDidChange = (regionFeature) => {
    this.setState({
      reason: 'did change', regionFeature,
      zoomLevel: regionFeature.properties.zoomLevel,
    })
  }

  onToggleCompass = () => {
    console.log('ok')
  }

  onToggleSearch = () => {
    this.props.navigation.navigate('Search')
    this.setState({followUserLocation: false})
  }

  onToggleInfo = () => {
    this.props.navigation.navigate('Info')
  }

  onToggleUserLocation = () => {
    this.setState({followUserLocation: !this.state.followUserLocation})
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  toggleMap = () => {
    this.setState({ onMapChange: !this.state.onMapChange })
  }

  toggleDownload = () => {
    this.setState({ downloadOpen: !this.state.downloadOpen })
    this.toggleMenu()
  }

  startDownload = () => {
    this.setState({ startDownload: ! this.state.startDownload })
  }

  toggleNameRegion = () => {
    this.setState({ toggleNameRegion: !this.state.toggleNameRegion })
  }

  Menu = () => {
    if (this.state.menuOpen) {
      return(
          <Menu
            onToggleCompass={this.onToggleCompass}
            onToggleUserLocation={this.onToggleUserLocation}
            onToggleSearch={this.onToggleSearch}
            toggleDownload={this.toggleDownload}
            toggleMap={this.toggleMap}
            onToggleInfo={this.onToggleInfo}
            toggleMenu={this.toggleMenu}
            MapboxGL={MapboxGL}
          />
      )
    } else {
      return(
        <TouchableOpacity onPress={this.toggleMenu} style={styles.arrowUp}>
          <ArrowUp width='22' height='22' fill='rgba(0,0,0,0.7)'/>
        </TouchableOpacity>
      )
    }
  }

  onMapChange = () => {
    const { onMapChange } = this.state
    if (onMapChange) {
      return(
        <CardType/>
      )
    }
  }

  downloadMap = () => {
    if (this.state.downloadOpen) {
      return(
          <OfflineRegion
            MapboxGL={MapboxGL}
            toggleMenu={this.toggleMenu}
            toggleDownload={this.toggleDownload}
            toggleNameRegion={this.toggleNameRegion}
            startDownload={this.state.startDownload}
            zoomLevel={this.state.zoomLevel}
          />
      )
    }
  }

  nameRegion = () => {
    if (this.state.toggleNameRegion) {
      return(
        <NameRegion
          toggleNameRegion={this.toggleNameRegion}
          startDownload={this.startDownload}
        />
      )
    }
  }

  render() {
    const { followUserLocation } = this.state
    const { styleURL, location } = this.props.user
    return (
      <View style={styles.map}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={styleURL}
          animated={true}
          localizeLabels={true}
          logoEnabled={false}
          compassEnabled={false}
          attributionEnabled={false}
          onRegionWillChange={this.onRegionWillChange}
          onRegionIsChanging={this.onRegionIsChanging}
          onRegionDidChange={this.onRegionDidChange}
        >
          <MapboxGL.UserLocation visible={followUserLocation}/>
          <MapboxGL.Camera
              animationMode='flyTo'
              zoomLevel={12}
              followUserLocation={followUserLocation}
              centerCoordinate={location}
              followHeading={0}
              followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
          />
        </MapboxGL.MapView>
        {this.Menu()}
        {this.downloadMap()}
        {this.onMapChange()}
        {this.nameRegion()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  arrowUp: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(Map)
