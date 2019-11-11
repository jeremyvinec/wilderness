import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import frameBottomLeft from '../../assets/img/frame-bottom-left.png'
import frameBottomRight from '../../assets/img/frame-bottom-right.png'
import frameTopLeft from '../../assets/img/frame-top-left.png'
import frameTopRight from '../../assets/img/frame-top-right.png'

interface Props {
  toggleDownload: () => void,
  insertNameRegion: () => void,
}

interface State { }
export default class MapSnap extends React.Component<Props, State> {
  render() {
    const { toggleDownload, insertNameRegion } = this.props
    return(
        <View style={styles.modal}>
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
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_container: {
    position: 'absolute',
    flexDirection: 'row',
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
    top: '5%',
    left: '5%',
  },
  frameTopRight: {
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
  frameBottomLeft: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
  },
  frameBottomRight: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
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
