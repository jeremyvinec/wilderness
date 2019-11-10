import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

interface Props {
  user: { name: String },
}

interface State {
  dataSource: {},
}
class DownloadList extends React.Component<Props, State> {

  renderItem = ({item}: any) => {
    return(
      <Text></Text>
    )
  }

  render() {
    const { name } = this.props.user
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
                <View>
                  <TouchableOpacity style={styles.button} onPress={setModalVisibleDownload}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={setModalVisibleDownload}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={setModalVisibleDownload}>
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
  newRegion: {
    borderRadius: 10,
    width: 200,
    height: 150,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    //justifyContent: 'center',
  },
  header_container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  main_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  list: {
    flex: 1,
  },
})

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(DownloadList)
