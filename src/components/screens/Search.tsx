import React from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { getCities } from '../../api/Api'

interface State {
  data: [],
  loading: boolean,
  error: null,
  searchedText: [],
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

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

  _loadCities() {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + text + '.json?access_token=' + KEY
    this.setState({ loading: true })

    fetch(url)
    .then(res => res.json())
    .then(res => {
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

  renderHeader = () => {
    return (
      <SearchBar
        placeholder='Type Here...'
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    )
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Ville'
          onChangeText={this._searchedTextInputChanged}
          onSubmitEditing={this._searchedCities}
        />
        <Button title='Rechercher' onPress={this._searchedCities}/>
        <CitiesList
          cities={this.state.cities}
          navigation={this.props.navigation}
          loadCities={this._loadCities}
        />
        {this._displayLoading()}
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
  }
})