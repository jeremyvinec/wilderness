import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateLocation } from '../../actions/actionUser'
import Altitude from '../common/Altitude'
import CardType from '../common/CardType'
import MapSnap from '../common/MapSnap'
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
}
class Map extends React.Component<Props, State> {

  private updateLocation = (location: String) => {
    this.props.updateLocation(location)
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      followUserLocation: true,
      menuOpen: true,
      downloadOpen: false,
      onMapChange: false,
      toggleNameRegion: false,
    }
  }

  componentDidMount = () => {
    if (this.props.location !== undefined) {
      this.setState({ followUserLocation: false})
    }
  }

  onRegionDidChange = (regionFeature) => {
    const location = regionFeature.geometry.coordinates
    this.updateLocation(location)
  }

  onToggleCompass = () => {
    console.log('ok')
  }

  onToggleSearch = () => {
    this.props.navigation.navigate('Search')
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
    this.toggleNameRegion()
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
          />
      )
    }
  }

  nameRegion = () => {
    if (this.state.toggleNameRegion) {
      return(
        <NameRegion
          toggleNameRegion={this.toggleNameRegion}
        />
      )
    }
  }

  render() {
    const { followUserLocation } = this.state
    const { location, styleURL } = this.props.user
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
          // onRegionDidChange={this.onRegionDidChange}
        >
          <MapboxGL.UserLocation visible={followUserLocation}/>
          <MapboxGL.Camera
              Mode='flyTo'
              zoomLevel={12}
              followUserLocation={followUserLocation}
              centerCoordinate={location}
              // followPitch={0}
              followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
          />
        </MapboxGL.MapView>
        <Altitude
            MapboxGL={MapboxGL}
        />
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

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateLocation }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
