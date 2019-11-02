import geoViewport from '@mapbox/geo-viewport'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import Menu from './Menu'

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
}
export default class Map extends React.Component<Props, State> {
  _mapOptions: string[]

  constructor(props: Props) {
    super(props)
    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => {
        return {
          label: key,
          data: MapboxGL.StyleURL[key],
        }
      })
      .sort(onSortOptions)

    this.state = {
      followUserLocation: true,
      name: `${Date.now()}`,
      offlineRegion: null,
      offlineRegionStatus: null,
      StyleURL: this._mapOptions[0].data,
    }
  }

  componentWillUnmount() {
    MapboxGL.offlineManager.deletePack(this.state.name)
    MapboxGL.offlineManager.unsubscribe('test')
  }
  onToggleUserLocation = () => {
    this.setState({followUserLocation: !this.props.followUserLocation})
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

  _getRegionDownloadState = (downloadState: any) => {
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

  onMapChange = (styleURL: any) => {
    const { offlineRegionStatus } = this.state
    if (offlineRegionStatus !== null) {
      return(
        <View style={styles.offlineRegionStatus}>
          <Text>Type de carte</Text>
          <Text>Par défault</Text>
        </View>
      )
    }
    this.setState({styleURL})
  }

  handleMenuClick() {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  downloadMap = () => {
    if (this.state.offlineRegionStatus !== null) {
      return(
          <View style={styles.offlineRegionStatus}>
            <Text>
              Download State:{' '}
              {this._getRegionDownloadState(offlineRegionStatus.state)}
            </Text>
            <Text>Download Percent: {offlineRegionStatus.percentage} </Text>
          </View>
      )
      return null
    }
  }

  render() {
    const { followUserLocation } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.map}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Outdoors}
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
        <Menu
          onToggleUserLocation={this.onToggleUserLocation}
          onToggleSearch={this.onToggleSearch}
          onDidFinishLoadingStyle={this.onDidFinishLoadingStyle}
          onMapChange={this.onMapChange}
          onToggleInfo={this.onToggleInfo}
          handleMenuClick={this.handleMenuClick}
        />
        {this.downloadMap()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  bar: {
    backgroundColor: '#fff',
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
