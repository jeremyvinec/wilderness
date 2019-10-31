import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// page
import Info from '../components/screens/Info'
import Login from '../components/screens/Login'
import Map from '../components/screens/Map'
import Profile from '../components/screens/Profile'
import Signup from '../components/screens/Signup'

const AuthSwitchNavigator = createSwitchNavigator({
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  Profile: {
    screen: Profile,
  },
})

const StackNavigator = createStackNavigator({
  Map: {
    screen: Map,
    navigationOptions: {
      title: 'Map',
      header: null,
    },
  },
  Info: {
    screen: Info,
    navigationOptions: {
      title: 'Info',
      header: null,
    },
  },
})

export default createAppContainer(StackNavigator)
