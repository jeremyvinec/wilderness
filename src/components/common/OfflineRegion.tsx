import geoViewport from '@mapbox/geo-viewport'
import React from 'react'
import { Alert, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
  visibleDownload: boolean,
  visibleList: boolean,
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
      visibleDownload: false,
      visibleList: false,
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
    const { MapboxGL } = this.props
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

  setModalVisibleList = () => {
    this.setState({ visibleList: true })
  }

  setModalVisibleDownload = () => {
    this.setState({ visibleDownload: true })
  }

  render() {
    const { visibleDownload, visibleList } = this.state
    return(
        <View style={styles.offlineManager}>
          <TouchableOpacity style={styles.main_container}  onPress={this.setModalVisibleDownload}>
              <ArrowCircleDown width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.main_container} onPress={this.setModalVisibleList}>
              <List width='22' height='22' fill='rgba(0,0,0,0.7)'/>
          </TouchableOpacity>
          <Modal
            animationType='fade'
            transparent={true}
            visible={visibleDownload}
          >
            <View style={styles.modal}>
              <View style={styles.newRegion}>
                <Text>Name new region</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder='Try "Hautes Alpes"'
                  autoCapitalize='none'
                  onChangeText={this.loadCities}
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Validate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType='slide'
            transparent={false}
            visible={visibleList}
          >
            <TextInput
              style={styles.inputBox}
              placeholder='Try "Gap"'
              autoCapitalize='none'
              onChangeText={this.loadCities}
              autoCorrect={false}
            />
          </Modal>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main_container: {
    alignItems: 'center',
    marginTop: 15,
  },
  percentageText: {
    padding: 8,
    textAlign: 'center',
  },
  offlineManager: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 10,
    position: 'absolute',
    top: '20%',
    right: '5%',
    width: 30,
    height: 90,
    alignItems: 'center',
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
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newRegion: {
    borderRadius: 10,
    width: 250,
    height: 150,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#2BB573',
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(OfflineRegion)
