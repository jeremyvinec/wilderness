import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'
import Api from '../../api/Api'

interface State {
  data: [],
  loading: boolean,
  error: null,
  searchedText: [],
}

interface Props { }

export default class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
      error: null,
      searchedText: [],
    }
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true })

    Api.getCities(this.state.searchedText)
    .then(res => {
      console.log(res)
      this.setState({
        data: res.results,
        error: res.error || null,
        loading: false,
        searchedText: res.results,
      })
    })
    .catch(error => {
      this.setState({ error, loading: false })
    })
  }

  /*makeRemoteRequest = () => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamVyZW15dmluZWMiLCJhIjoiY2sxb2xhbDYxMGxxMDNjdGlrN2x5dmJyZyJ9.jZPR-A0GRnUbttmIdeQ2QA'
    this.setState({ loading: true })

    fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        data: res.results,
        error: res.error || null,
        loading: false,
        searchedText: res.results,
      })
    })
    .catch(error => {
      this.setState({ error, loading: false })
    })
  }*/

  searchFilterFunction = (text: String) => {
    const newData = this.state.searchedText.filter(item => {
      const itemData = `${item.name.title.toUpperCase()}
      ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > - 1
    })
    this.setState({ data: newData })
  }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder='Try "Gap"'
        onChangeText={this.searchFilterFunction}
        autoCorrect={false}
      />
    )
  }

  renderItem = ({item}) => {
    return(
      <ListItem
        leftAvatar={{ source: { uri: item.picture.thumbnail } }}
        title={`${item.name.first} ${item.name.last}`}
        subtitle={item.email}
      />
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.email}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
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