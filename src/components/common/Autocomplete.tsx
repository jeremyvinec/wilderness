import React from 'react'
import {View} from 'react-native'

interface State {
  activeCitie: number,
  filteredCities: [],
  showCities: boolean,
  userInput: String,
}

interface Props {
  cities: [],
}

export default class Autocomplete extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      activeCitie: 0,
      filteredCities: [],
      showCities: false,
      userInput: '',
    }
  }

  onChange = (e: any) => {
    const { cities } = this.props
    const userInput = e.currentTarget.value

    const filteredCities = cities.filter(
      citie => cities.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    )

    this.setState({
      activeCitie: 0,
      filteredCities: [],
      showCities: false,
      userInput: e.currentTarget.innerText,
    })
  }

  oncClick = (e: any) => {

    this.setState({
      activeCitie: 0,
      filteredCities: [],
      showCities: false,
      userInput: e.currentTarget.innerText,
    })
  }

  onKeyDown = (e: any) => {
    const { activeCitie, filteredCities } = this.state

    if (e.keyCode === 13) {
      this.setState({
        activeCitie: 0,
        showCities: false,
        userInput: filteredCities[activeCitie],
      })
    } else if (e.keyCode === 38) {
      if(activeCitie === 0) {
        return
      }

      this.setState({ activeCitie: activeCitie - 1 })
    }
  }

  render() {
    return(
            <View>

            </View>
    )
  }
}
