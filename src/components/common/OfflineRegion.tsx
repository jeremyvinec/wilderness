import geoViewport from '@mapbox/geo-viewport'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import DownloadList from '../common/DownloadList'
import NameRegion from './NameRegion'

import frameBottomLeft from '../../assets/img/frame-bottom-left.png'
import frameBottomRight from '../../assets/img/frame-bottom-right.png'
import frameTopLeft from '../../assets/img/frame-top-left.png'
import frameTopRight from '../../assets/img/frame-top-right.png'

import ArrowCircleDown from '../../assets/svg/ArrowCircleDown'
import CloseCircle from '../../assets/svg/CloseCircle'
import List from '../../assets/svg/List'

const MAPBOX_VECTOR_TILE_SIZE = 512

interface Props {
  offlineRegionStatus: {},
  getRegionDownloadState: () => void,
  toggleMenu: () => void,
  toggleDownload: () => void,
  insertNameRegion: () => void,
  toggleNameRegion: () => void,
  startDownload: boolean,
  offlineRegion: [],
  MapboxGL: {
    offlineManager: {
      deletePack: (name: {}) => void,
      unsubscribe: (name: {}) => void,
      createPack: (options: {}) => void,
    }
    OfflinePackDownloadState: {
      Active: {},
      Complete: {},
    },
  },
  zoomLevel: number,
  user: { location: [], styleURL: String, name: String },
}

interface State {
  toggleDownload: boolean,
  toggleList: boolean,
  toggleNameRegion: boolean,
  offlineRegion: {},
  offlineRegionStatus: {
    percentage: number,
    state: String,
  },
  name: {},
}

class OfflineRegion extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      toggleDownload: false,
      toggleList: false,
      toggleNameRegion: false,
      offlineRegion: null,
      offlineRegionStatus: null,
      name: props.offlineRegion[props.offlineRegion.length - 1],
    }
  }

  componentDidUpdate(nextProps: any) {
    if (nextProps.startDownload !== this.props.startDownload) {
      this.setState({ name: nextProps.offlineRegion[nextProps.offlineRegion.length - 1]})
      this.onDidFinishLoadingStyle()
    }
  }

  componentWillUnmount() {
    const { MapboxGL } = this.props
    const { name } = this.state
    MapboxGL.offlineManager.deletePack(name)
    MapboxGL.offlineManager.unsubscribe(name)
  }

  toggleList = () => {
    this.setState({
      toggleList: !this.state.toggleList,
      toggleNameRegion: false,
    })
  }

  toggleNameRegion = () => {
    this.setState({ 
      toggleNameRegion: !this.state.toggleNameRegion,
      toggleList: false,
    })
  }

  onDidFinishLoadingStyle = () => {
    const { location, styleURL } = this.props.user
    const {width, height} = Dimensions.get('window')
    const { MapboxGL, zoomLevel } = this.props
    const bounds = geoViewport.bounds(
      location,
      zoomLevel,
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
    if (offlineRegionStatus !== null) {
      return(
          <View style={styles.offlineRegionStatus}>
              <Text>
              Download State:{' '}
              {this.getRegionDownloadState(offlineRegionStatus.state)}
              </Text>
              <Text style={styles.percentageText}>Download Percent: {Math.round(offlineRegionStatus.percentage)}%</Text>
          </View>
      )
    }
  }

  displayList = () => {
    if (this.state.toggleList) {
      return(
        <View>
          <DownloadList
            toggleNameRegion={this.toggleNameRegion}
            toggleList={this.toggleList}
            MapboxGL={this.props.MapboxGL}
          />
        </View>
      )
    }
  }

  nameRegion = () => {
    if (this.state.toggleNameRegion) {
      return(
        <NameRegion
          toggleNameRegion={this.toggleNameRegion}
          toggleList={this.toggleList}
          startDownload={this.props.startDownload}
        />
      )
    }
  }

  render() {
    const { toggleDownload } = this.props
    return(
        <View style={styles.container}>
          <View style={styles.area}>
            <Text>Downloading the displayed area</Text>
          </View>
          {this.downloadMap()}
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
              <CloseCircle width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.toggleList}>
              <List width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.toggleNameRegion}>
              <ArrowCircleDown width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            </TouchableOpacity>
          </View>
          {this.displayList()}
          {this.nameRegion()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  main_container: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '5%',
    width: '80%',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  offlineRegionStatus: {
    position: 'absolute',
    color: '#1F3044',
    width: 250,
    height: 57,
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 14,
  },
  percentageText: {
    padding: 8,
    textAlign: 'center',
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
    offlineRegion: state.offlineRegion,
  }
}

export default connect(mapStateToProps)(OfflineRegion)
