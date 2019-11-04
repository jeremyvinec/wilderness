import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchedText } from '../../actions/actionUser'
import Api from '../../api/Api'
import CitiesItem from '../common/CitiesItem'

interface Props {
  searchedText: (search: String) => void,
  search: String,
  user: String,
}
interface State {
  isLoading: boolean,
  data: []
}

class Search extends React.Component<Props, State> {

  private searchedText = (search: String) => {
    this.props.searchedText(search)
    this.loadCities()
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: false,
      data: [],
    }
  }

  loadCities = () => {
    const { search } = this.props.user
    this.setState({ isLoading: true })
    Api.getCities(search).then((res: any) => {
      this.setState({
        isLoading: false,
        data: res.features,
      })
    })
      .catch((err: any) => {
        console.log(err)
      })
  }

  renderHeader = () => {
    return (
      <TextInput
        style={styles.inputBox}
        placeholder='Try "Gap"'
        autoCapitalize='none'
        onChangeText={this.searchedText}
        autoCorrect={false}
      />
    )
  }

  renderItem = ({item}) => {
    const { navigation } = this.props
    return(
      <CitiesItem
        id={item.id}
        data={item}
        navigation={navigation}
      />
    )
  }

  displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
        />
        {this.displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputBox: {
    width: 250,
    margin: 10,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ searchedText }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
