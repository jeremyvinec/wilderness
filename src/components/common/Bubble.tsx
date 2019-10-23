import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

interface State { }

interface Props {
  onPress: () => {},
  children: any,
  style: any
}

export default class Bubble extends React.PureComponent<State, Props> {

  render() {
    let innerChildView = this.props.children

    if (this.props.onPress) {
      innerChildView = (
        <TouchableOpacity onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      )
    }

    return (
      <View style={[styles.container, this.props.style]}>{innerChildView}</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    left: 48,
    right: 48,
    paddingVertical: 16,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})
