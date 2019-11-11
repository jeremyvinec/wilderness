import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertNameRegion } from '../../actions/actionUser'

interface Props {
  setModalVisibleDownload: () => void,
  toggleDownload: () => void,
  insertNameRegion: (nameRegion: String) => void,
}

interface State {
  nameRegion: String,
}

class NameRegion extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      nameRegion: '',
    }
  }

  updateNameRegion = (nameRegion: String) => {
    console.log(nameRegion)
    this.setState({ nameRegion })
  }

  insertNameRegion = () => {
    this.props.insertNameRegion(this.state.nameRegion)
    this.props.toggleDownload()
    this.props.setModalVisibleDownload()
  }

  render() {
    const { setModalVisibleDownload } = this.props
    return(
        <View style={styles.container}>
          <View style={styles.newRegion}>
            <View style={styles.header_container}>
              <Text>Insert new region</Text>
              <TextInput
                style={styles.inputBox}
                placeholder='Try "Hautes Alpes"'
                autoCapitalize='none'
                onChangeText={this.updateNameRegion}
                autoCorrect={false}
              />
            </View>
            <View style={styles.main_container}>
              <TouchableOpacity onPress={setModalVisibleDownload}>
                <Text style={[styles.buttonText, {color: '#D22D2D'}]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.insertNameRegion}>
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    width: 200,
    height: 100,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1F3044',
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ insertNameRegion }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    offlineRegion: state.offlineRegion,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameRegion)
