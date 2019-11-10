import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

interface Props {
  setModalVisibleList: () => void,
  offlineRegion: [],
}

interface State {
  isSelected: boolean,
  selectedClass: {},
}
class DownloadList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      isSelected: false,
      selectedClass: {},
    }
  }

  selectItem = () => {
    this.setState({ isSelected: !this.state.isSelected })
    this.state.selectedClass = this.state.isSelected ? styles.list : styles.selected
  }

  FlatListItemSeparator = () => <View style={styles.line}/>

  renderItem = ({index, item}: any) => {
    console.log(this.state.selectedClass)
    return(
      <TouchableOpacity onPress={this.selectItem}>
        <Text style={[styles.item, this.state.selectedClass]}>{item}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { setModalVisibleList, offlineRegion } = this.props
    return(
        <View style={styles.modal}>
            <View style={styles.newRegion}>
                <View style={styles.header_container}>
                    <Text>List</Text>
                </View>
                <View style={styles.main_container}>
                  <FlatList
                    data={offlineRegion}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={this.renderItem}
                    // tslint:disable-next-line:jsx-no-lambda
                    keyExtractor={(item, index) => index.toString()}
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
    alignItems: 'center',
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
  buttonText: {
    textAlign: 'center',
    color: '#2BB573',
  },
  item: {
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: 5,
  },
  selected: {
    color: '#2BB573',
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
})

const mapStateToProps = (state: any) => {
  return{
    offlineRegion: state.offlineRegion,
  }
}

export default connect(mapStateToProps)(DownloadList)
