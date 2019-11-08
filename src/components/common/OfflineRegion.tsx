import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ArrowCircleDown from '../../assets/svg/ArrowCircleDown'
import List from '../../assets/svg/List'

interface Props {
  offlineRegionStatus: {},
  getRegionDownloadState: () => void,
}

interface State { }

export default class OfflineRegion extends React.Component<Props, State> {

  downloadMap = () => {
    const { offlineRegionStatus, getRegionDownloadState } = this.props
    return(
      <View style={styles.offlineRegionStatus}>
            <Text>
            Download State:{' '}
            {getRegionDownloadState(offlineRegionStatus.state)}
            </Text>
            <Text style={styles.percentageText}>Download Percent: {offlineRegionStatus.percentage} </Text>
        </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.offlineManager}>
          <TouchableOpacity onPress={this.downloadMap} style={styles.main_container}>
            <ArrowCircleDown width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            <Text>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.main_container}>
            <List width='22' height='22' fill='rgba(0,0,0,0.7)'/>
            <Text>List</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '5%',
  },
  main_container: {
    alignItems: 'center',
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
  offlineManager: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 200,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 30,
  },
})
