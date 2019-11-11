import geoViewport from '@mapbox/geo-viewport'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import DownloadList from './DownloadList'
import MapSnap from './MapSnap'
import NameRegion from './NameRegion'

import frameBottomLeft from '../../assets/img/frame-bottom-left.png'
import frameBottomRight from '../../assets/img/frame-bottom-right.png'
import frameTopLeft from '../../assets/img/frame-top-left.png'
import frameTopRight from '../../assets/img/frame-top-right.png'

const MAPBOX_VECTOR_TILE_SIZE = 512

interface Props {
  offlineRegionStatus: {},
  getRegionDownloadState: () => void,
  toggleMenu: () => void,
  MapboxGL: {},
  user: { location: [], styleURL: String, name: String },
}

interface State {
  toggleDownload: boolean,
  toggleList: boolean,
  offlineRegion: {},
  offlineRegionStatus: {},
  visibleDownload: boolean,
  visibleList: boolean,
}

class OfflineRegion extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      toggleDownload: false,
      toggleList: false,
      offlineRegion: null,
      offlineRegionStatus: null,
      visibleDownload: false,
      visibleList: false,
    }
  }

  componentWillUnmount() {
    const { name } = this.props.user
    const { MapboxGL } = this.props
    MapboxGL.offlineManager.deletePack(name)
    MapboxGL.offlineManager.unsubscribe(name)
  }

  onDidFinishLoadingStyle = () => {
    const { location, styleURL, name } = this.props.user
    const {width, height} = Dimensions.get('window')
    const { MapboxGL } = this.props
    const bounds = geoViewport.bounds(
      location,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    )
    const options = {
      name,
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
      offlineRegion,
      offlineRegionStatus,
    })
  }

  getRegionDownloadState = (downloadState: any) => {
    const { MapboxGL } = this.props
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

  mapSnap = () => {
    if (this.state.visibleDownload) {
      return(
        <MapSnap
          setModalVisibleDownload={this.setModalVisibleDownload}
        />
      )
    }
  }

  downloadList = () => {
    if (this.state.visibleList) {
      return(
        <DownloadList
          setModalVisibleList={this.setModalVisibleList}
        />
      )
    }
  }

  setModalVisibleList = () => {
    this.setState({ visibleList: !this.state.visibleList })
  }

  setModalVisibleDownload = () => {
    this.setState({ visibleDownload: !this.state.visibleDownload })
    this.props.toggleMenu()
  }

  toggleDownload = () => {
    this.setState({ toggleDownload: !this.state.toggleDownload })
  }

  toggleList = () => {
    this.setState({ toggleList: !this.state.toggleList })
  }

  render() {
    const { toggleDownload, insertNameRegion, toggleMenu } = this.props
    return(
        <View style={styles.container}>
          <View style={styles.area}>
            <Text>Downloading the displayed area</Text>
          </View>
          <View style={styles.frameTopLeft}>
            <Image source={frameTopLeft}/>
          </View>
          <View style={styles.frameTopRight}>
            <Image source={frameTopRight}/>
          </View>
          <View style={styles.frameBottomLeft}>
            <Image source={frameBottomLeft}/>
          </View>
          <View style={styles.frameBottomRight}>
            <Image source={frameBottomRight}/>
          </View>
          <View style={styles.main_container}>
            <TouchableOpacity style={styles.button} onPress={toggleDownload}>
              <Text style={[styles.buttonText, {color: '#D22D2D'}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={insertNameRegion}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  main_container: {
    position: 'absolute',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    bottom: '5%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 14,
    width: 100,
    height: 57,
  },
  buttonText: {
    textAlign: 'center',
    color: '#1F3044',
  },
  frameTopLeft: {
    position: 'absolute',
    top: '1%',
    left: '1%',
  },
  frameTopRight: {
    position: 'absolute',
    top: '1%',
    right: '1%',
  },
  frameBottomLeft: {
    position: 'absolute',
    bottom: '1%',
    left: '1%',
  },
  frameBottomRight: {
    position: 'absolute',
    bottom: '1%',
    right: '1%',
  },
  area: {
    position: 'absolute',
    color: '#1F3044',
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 14,
    width: 250,
    height: 57,
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(OfflineRegion)
