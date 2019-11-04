import geoViewport from '@mapbox/geo-viewport'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import CardType from '../common/CardType'
import Menu from './Menu'
import OfflineRegion from '../common/OfflineRegion'
import { connect } from 'react-redux'

// icons
import ArrowUp from '../../assets/svg/ArrowUp'

import { onSortOptions } from '../../utils'
import config from '../../utils/config.js'

MapboxGL.setAccessToken(config.get('accessToken'))

const CENTER_COORD = [-73.970895, 40.723279]
const MAPBOX_VECTOR_TILE_SIZE = 512

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

interface State {
  followUserLocation: boolean,
  name: {},
  offlineRegion: {},
  offlineRegionStatus: {},
  isOpen: boolean,
  onMapChange: {}
  styleURL: {},
}
class Map extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this._mapOptions = Object.keys(MapboxGL.StyleURL).map(key => {
        return {
          label: key,
          data: MapboxGL.StyleURL[key],
        }
      }).sort(onSortOptions)

    this.state = {
      followUserLocation: true,
      name: `${Date.now()}`,
      offlineRegion: null,
      offlineRegionStatus: null,
      isOpen: true,
      onMapChange: false,
      styleURL: this._mapOptions[0].data,
    }

    this.styleMap = this.styleMap.bind(this)
  }

  componentWillUnmount() {
    MapboxGL.offlineManager.deletePack(this.state.name)
    MapboxGL.offlineManager.unsubscribe('test')
  }
  onToggleUserLocation = () => {
    this.setState({followUserLocation: !this.state.followUserLocation})
  }

  onDidFinishLoadingStyle = () => {
    const {width, height} = Dimensions.get('window')
    const bounds = geoViewport.bounds(
      CENTER_COORD,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    )

    const options = {
      name: this.state.name,
      styleURL: MapboxGL.StyleURL.Street,
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

  styleMap = (index, styleURL) => {
    this.setState({styleURL})
  }

  onMapChange = () => {
    const { onMapChange } = this.state
    if (onMapChange) {
      return(
        <CardType
          styleMap={this.styleMap}
        />
      )
    }
    return null
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
    const { followUserLocation, styleURL } = this.state
    console.log(this.props)
    return (
      <View style={styles.map}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={styleURL}
        >
          <MapboxGL.UserLocation visible={followUserLocation}/>
          <MapboxGL.Camera
              zoomLevel={12}
              followUserLocation={followUserLocation}
              centerCoordinate={CENTER_COORD}
              followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
              compassEnabled={false}
          />
        </MapboxGL.MapView>
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
  percentageText: {
    padding: 8,
    textAlign: 'center',
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
