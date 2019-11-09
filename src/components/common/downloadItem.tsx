import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNameRegion } from '../../actions/actionUser'

interface Props {
  setModalVisibleDownload: () => void,
  updateNameRegion: (name: String) => void,
}

interface State { }

class DownloadItem extends React.Component<Props, State> {

  updateNameRegion = (name: String) => {
    this.props.updateNameRegion(name)
  }

  render() {
    const { setModalVisibleDownload } = this.props
    return(
        <View style={styles.modal}>
          <View style={styles.newRegion}>
            <View style={styles.header_container}>
              <Text>Name new region</Text>
              <TextInput
                style={styles.inputBox}
                placeholder='Try "Hautes Alpes"'
                autoCapitalize='none'
                onChangeText={this.updateNameRegion}
                autoCorrect={false}
              />
            </View>
            <View style={styles.main_container}>
              <TouchableOpacity style={styles.button} onPress={setModalVisibleDownload}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={setModalVisibleDownload}>
                <Text style={styles.buttonText}>Validate</Text>
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
  header_container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  newRegion: {
    borderRadius: 10,
    width: 250,
    height: 150,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#2BB573',
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateNameRegion }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadItem)
