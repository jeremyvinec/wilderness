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
