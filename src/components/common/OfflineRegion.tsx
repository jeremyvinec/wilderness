import geoViewport from '@mapbox/geo-viewport'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import ArrowCircleDown from '../../assets/svg/ArrowCircleDown'
import List from '../../assets/svg/List'

const MAPBOX_VECTOR_TILE_SIZE = 512

interface Props {
  offlineRegionStatus: {},
  getRegionDownloadState: () => void,
  MapboxGL: {},
}

interface State {
  toggleDownload: boolean,
  toggleList: boolean,
  name: {},
  offlineRegion: {},
  offlineRegionStatus: {},
}

class OfflineRegion extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      toggleDownload: false,
      toggleList: false,
      name: `${Date.now()}`,
      offlineRegion: null,
      offlineRegionStatus: null,
    }
  }

  componentWillUnmount() {
    const { name } = this.state
    const { MapboxGL } = this.props
    MapboxGL.offlineManager.deletePack(name)
    MapboxGL.offlineManager.unsubscribe(name)
  }

  toggleDownload = () => {
    this.setState({ toggleDownload: !this.state.toggleDownload })
  }

  toggleList = () => {
    this.setState({ toggleList: !this.state.toggleList })
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
    const { MapboxGL } = this.props
    console.log(downloadState)
    switch (downloadState) {
      case MapboxGL.OfflinePackDownloadState.Active:
        return 'Active'
      case MapboxGL.OfflinePackDownloadState.Complete:
        return 'Complete'
      default:
        return 'Inactive'
    }
  }

  downloadMap = () => {
    const { offlineRegionStatus } = this.state
    if (this.state.offlineRegionStatus) {
      return(
          <TouchableOpacity style={styles.offlineRegionStatus}>
              <Text>
              Download State:{' '}
              {this.getRegionDownloadState(offlineRegionStatus.state)}
              </Text>
              <Text style={styles.percentageText}>Download Percent: {offlineRegionStatus.percentage} </Text>
          </TouchableOpacity>
      )
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onDidFinishLoadingStyle} style={styles.main_container}>
            <ArrowCircleDown width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.main_container}>
            <List width='22' height='22' fill='rgba(0,0,0,0.7)'/>
        </TouchableOpacity>
        <View>
        {this.downloadMap()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10,
    position: 'absolute',
    top: '20%',
    right: '5%',
    width: 30,
    height: 90,
    alignItems: 'center',
  },
  main_container: {
    alignItems: 'center',
    marginTop: 15,
  },
  percentageText: {
    padding: 8,
    textAlign: 'center',
  },
  offlineRegionStatus: {
    position: 'absolute',
    bottom: '5%',
    left: '10%',
    paddingVertical: 16,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 30,
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(OfflineRegion)
