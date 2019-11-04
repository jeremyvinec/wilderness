import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  offlineRegionStatus: {},
  getRegionDownloadState: () => void,
}

interface State { }

export default class OfflineRegion extends React.Component<Props, State> {
  render() {
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
}

const styles = StyleSheet.create({
  percentageText: {
    padding: 8,
    textAlign: 'center',
  },
  offlineRegionStatus: {
    position: 'absolute',
    bottom: '5%',
    right: '15%',
    paddingVertical: 16,
    width: 250,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 30,
  },
})
