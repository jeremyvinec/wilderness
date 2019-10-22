import React from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// page
import Map from '../components/Map'

// svg
import Bell from '../assets/svg/Bell'
import Camera from '../assets/svg/Camera'
import Globe from '../assets/svg/Globe'
import Heat from '../assets/svg/Heart'
import Menu from '../assets/svg/Menu'
import Person from '../assets/svg/Person'
import Search from '../assets/svg/Search'

const MapStackNavigator = createStackNavigator({
  Map: {
      screen: Map,
      navigationOptions: {
          header: null,
        },
    },
  Nearly: {
      screen: Map,
      navigationOptions: {
          title: 'Nearly',
        },
    },
})

const TabNavigator = createBottomTabNavigator({
  Menu: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Menu
                width='25'
                height='25'
                fill='#1F3044'/>
            },
        },
    },
  Map: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Globe
                width='25'
                height='25'
                fill='#1F3044'/>
            },
        },
    },
  Search: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Search
                width='25'
                height='25'
                fill='#1F3044'/>
            },
        },
    },
  Camera: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Camera
                width='50'
                height='50'
                fill='#1F3044'
                style={{ marginBottom: 10 }}/>
            },
        },
    },
  Heat: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Heat
                width='25'
                height='25'
                fill='#1F3044'/>
            },
        },
    },
  Bell: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Bell
                width='25'
                height='25'
                fill='#1F3044'/>
            },
        },
    },
  Person: {
      screen: MapStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Person
                width='25'
                height='25'
                fill='#1F3044'/>
            },
        },
    },
}, {
  tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true,
    },
})

const styles = StyleSheet.create({
  icon: {
      width: 30,
      height: 30,
    },
})

export default createAppContainer(TabNavigator)
