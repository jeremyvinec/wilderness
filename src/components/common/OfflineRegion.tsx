import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
      <View style={styles.offlineManager}>
        <TouchableOpacity onPress={this.downloadMap}>
          <Text>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>List</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: '5%',
    left: '10%',
    width: 250,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 30,
  }
})
