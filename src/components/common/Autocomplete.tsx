import React from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { getCities } from '../../api/Api'

interface State {
  cities: [],
  isLoading: boolean,
}

interface Props {
  cities: [],
}

export default class Autocomplete extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.searchedText = ''
    this.state = {
      cities: [],
      isLoading: false,
    }
  }

  _loadCities() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getCities().then(data => {
        this.setState({
          cities: [...this.state.cities, ...data.results ],
          isLoading: false,
        })
      })
    }
  }

  _searchedTextInputChanged(text: any) {
    this.searchedText = text
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
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FilmList
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