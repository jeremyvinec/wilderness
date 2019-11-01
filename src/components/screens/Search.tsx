import React from 'react'
import {View} from 'react-native'
//import Autocomplete from '../common/Autocomplete'
import { getCities } from '../../api/Api'

export default class Search extends React.Component {

  componentDidMount() {
    getCities()
  }
  render() {
    return(
            <View>

            </View>
    )
  }
}
