import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

interface Props { }

interface State {
  dataSource: {},
}
class ListItem extends React.Component<Props, State> {

  render() {
    return(
        <View style={styles.modal}>
            <View style={styles.newRegion}>
                <View style={styles.header_container}>
                    <Text>List</Text>
                </View>
                <View style={styles.main_container}>

                </View>
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
  newRegion: {
    borderRadius: 10,
    width: 250,
    height: 150,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
  },
  header_container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  main_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(ListItem)
