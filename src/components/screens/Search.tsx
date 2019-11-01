import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchedText } from '../../actions/actionSearch'
import Api from '../../api/Api'

interface Props {
  searchedText: (search: String) => void,
  search: String,
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
    const { search } = this.props
    if (search.length > 0) {
      this.setState({ isLoading: true })
      Api.getCities(search).then((res: any) => {
        console.log(res)
        this.setState({ isLoading: false })
      })
      .catch((err: any) => {
        console.log(err)
      })
    }
  }

  searchFilterFunction = (search: String) => {
    /*const newData = this.state.searchedText.filter(item => {
      const itemData = `${item.name.title.toUpperCase()}
      ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > - 1
    })
    this.setState({ data: newData })*/
  }

  renderHeader = () => {
    return (
      <TextInput
        style={styles.inputBox}
        placeholder='Try "Gap"'
        value={this.props.search}
        onChangeText={this.searchedText}
        autoCorrect={false}
      />
    )
  }

  renderItem = ({item}) => {
    return(
      <ListItem
        title={`${item.name.first} ${item.name.last}`}
        subtitle={item.email}
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
    console.log(this.props.search)
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.email}
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
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
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
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ searchedText }, dispatch)
}

const mapStateToProps = (state: any) => {
  return{
    search: state.search,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
