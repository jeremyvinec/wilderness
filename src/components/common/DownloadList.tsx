import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

interface Props {
  setModalVisibleList: () => void,
  nameRegion: [],
}

interface State {
  dataSource: {},
}
class DownloadList extends React.Component<Props, State> {

  renderItem = ({index, item}: any) => {
    console.log(item)
    return(
      <TouchableOpacity style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { setModalVisibleList } = this.props
    console.log(this.props)
    return(
        <View style={styles.modal}>
            <View style={styles.newRegion}>
                <View style={styles.header_container}>
                    <Text>List</Text>
                </View>
                <View style={styles.main_container}>
                  <FlatList
                    style={styles.list}
                    data={name}
                    renderItem={this.renderItem}
                  />
                </View>
                <View style={styles.main_container}>
                  <TouchableOpacity style={styles.button} onPress={setModalVisibleList}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={setModalVisibleList}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={setModalVisibleList}>
                    <Text style={styles.buttonText}>Navigate to</Text>
                  </TouchableOpacity>
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
  main_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  newRegion: {
    borderRadius: 10,
    width: 200,
    height: 150,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'space-around',
  },
  header_container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#2BB573',
  },
  item: {
    alignItems: 'center',
  },
  textItem: {
  },
})

const mapStateToProps = (state: any) => {
  return{
    nameRegion: state.nameRegion,
  }
}

export default connect(mapStateToProps)(DownloadList)
