import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'
import Api from '../../api/Api'
import CitiesItem from '../common/CitiesItem'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}
interface State {
  isLoading: boolean,
  data: [],
}

class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: false,
      data: [],
    }
  }

  loadCities = (search: String) => {
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
        onChangeText={this.loadCities}
        autoCorrect={false}
      />
    )
  }

  renderItem = ({item}: any) => {
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
    const { data } = this.state
    return(
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          extraData={data}
          renderItem={this.renderItem}
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
    alignItems: 'center',
    height: '70%',
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

const mapStateToProps = (state: any) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps)(Search)
