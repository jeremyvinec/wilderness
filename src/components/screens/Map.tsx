import geoViewport from '@mapbox/geo-viewport'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import Altitude from '../common/Altitude'
import CardType from '../common/CardType'
import OfflineRegion from '../common/OfflineRegion'
import Menu from './Menu'

// icons
import ArrowUp from '../../assets/svg/ArrowUp'

import config from '../../utils/config.js'

MapboxGL.setAccessToken(config.get('accessToken'))

const MAPBOX_VECTOR_TILE_SIZE = 512

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  location: [],
}

interface State {
  followUserLocation: boolean,
  name: {},
  user: {},
  offlineRegion: {},
  offlineRegionStatus: {},
  isOpen: boolean,
  onMapChange: boolean,
}
class Map extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      followUserLocation: true,
      name: `${Date.now()}`,
      offlineRegion: null,
      offlineRegionStatus: null,
      isOpen: true,
      onMapChange: false,
    }
  }

  componentDidMount() {
    if (this.props.location !== undefined) {
      this.setState({ followUserLocation: false})
    }
  }

  componentWillUnmount() {
    const { name } = this.state
    MapboxGL.offlineManager.deletePack(name)
    MapboxGL.offlineManager.unsubscribe(name)
  }

  onToggleCompass = () => {
    console.log('ok')
  }

  onToggleUserLocation = () => {
    this.setState({followUserLocation: !this.state.followUserLocation})
  }

  onDidFinishLoadingStyle = () => {
    const { location, styleURL } = this.props.user
    const {width, height} = Dimensions.get('window')
    const bounds = geoViewport.bounds(
      location,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    )
    const options = {
      name: this.state.name,
      styleURL,
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 10,
      maxZoom: 20,
    }

    // start download
    MapboxGL.offlineManager.createPack(options, this.onDownloadProgress)

  }

  onDownloadProgress = (offlineRegion: any, offlineRegionStatus: any) => {
    this.setState({
      name: offlineRegion.name,
      offlineRegion,
      offlineRegionStatus,
    })
  }

  getRegionDownloadState = (downloadState: any) => {
    switch (downloadState) {
      case MapboxGL.OfflinePackDownloadState.Active:
        return 'Active'
      case MapboxGL.OfflinePackDownloadState.Complete:
        return 'Complete'
      default:
        return 'Inactive'
    }
  }

  onToggleSearch = () => {
    this.props.navigation.navigate('Search')
  }

  onToggleInfo = () => {
    this.props.navigation.navigate('Info')
  }

  onMapChange = () => {
    const { onMapChange } = this.state
    if (onMapChange) {
      return(
        <CardType/>
      )
    }
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  toggleMap = () => {
    this.setState({ onMapChange: !this.state.onMapChange })
  }

  downloadMap = () => {
    const { offlineRegionStatus } = this.state
    if (offlineRegionStatus !== null) {
      return(
          <OfflineRegion
            offlineRegionStatus={offlineRegionStatus}
            getRegionDownloadState={this.getRegionDownloadState}
          />
      )
    }
    return null
  }

  Menu = () => {
    if (this.state.isOpen) {
      return(
          <Menu
            onToggleCompass={this.onToggleCompass}
            onToggleUserLocation={this.onToggleUserLocation}
            onToggleSearch={this.onToggleSearch}
            onDidFinishLoadingStyle={this.onDidFinishLoadingStyle}
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
        {this.onMapChange()}
        {this.downloadMap()}
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
