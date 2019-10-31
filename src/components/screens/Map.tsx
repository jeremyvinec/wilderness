import geoViewport from '@mapbox/geo-viewport'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Download from '../../assets/svg/Download'
import Geolocate from '../../assets/svg/Geolocate'
import Compass from '../../assets/svg/Compass'
import Search from '../../assets/svg/Search'
import Layers from '../../assets/svg/Layers'
import Info from '../../assets/svg/Info'
import ArrowDown from '../../assets/svg/ArrowDown'
import config from '../../utils/config.js'

MapboxGL.setAccessToken(config.get('accessToken'))

const CENTER_COORD = [-73.970895, 40.723279]
const MAPBOX_VECTOR_TILE_SIZE = 512

interface Props { }

interface State {
  followUserLocation: boolean,
  name: {},
  offlineRegion: {},
  offlineRegionStatus: {},
}
export default class Map extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      followUserLocation: true,
      name: `${Date.now()}`,
      offlineRegion: null,
      offlineRegionStatus: null,
    }
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

  render() {
    const { followUserLocation, offlineRegionStatus } = this.state
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
          />
        </MapboxGL.MapView>
        <View style={styles.bar}>
          <TouchableOpacity onPress={this.onToggleUserLocation} style={styles.onToggleUserLocation}>
            <Compass width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.offlineRegion}>
            <Geolocate width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.offlineRegion}>
            <Search width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.offlineRegion}>
            <Download width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.offlineRegion}>
            <Layers width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.offlineRegion}>
            <Info width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.offlineRegion}>
            <ArrowDown width='22' height='22' fill='#1F3044'/>
          </TouchableOpacity>
        </View>
        { offlineRegionStatus !== null ? (
          <View style={styles.offlineRegionStatus}>
            <Text>
              Download State:{' '}
              {this._getRegionDownloadState(offlineRegionStatus.state)}
            </Text>
            <Text>Download Percent: {offlineRegionStatus.percentage} </Text>
          </View>
        ) : null }
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
    borderRadius: 4,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: 30,
    height: 253,
    alignItems: 'center',
    justifyContent: 'space-between',
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
