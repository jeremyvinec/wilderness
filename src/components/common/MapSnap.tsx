import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import frameBottomLeft from '../../assets/img/frame-bottom-left.png'
import frameBottomRight from '../../assets/img/frame-bottom-right.png'
import frameTopLeft from '../../assets/img/frame-top-left.png'
import frameTopRight from '../../assets/img/frame-top-right.png'

export default class MapSnap extends React.Component {
  render() {
    return(
        <View style={styles.modal}>
            <Image source={frameTopLeft} style={styles.frameTopLeft}/>
            <Image source={frameTopRight} style={styles.frameTopRight}/>
            <Image source={frameBottomLeft} style={styles.frameBottomLeft}/>
            <Image source={frameBottomRight} style={styles.frameBottomRight}/>
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
  frameTopLeft: {
    top: 5,
    left: 5,
  },
  frameTopRight: {
    top: 5,
    left: 5,
  },
  frameBottomLeft: {
    top: 5,
    left: 5,
  },
  frameBottomRight: {
    top: 5,
    left: 5,
  },
})
