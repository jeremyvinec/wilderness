import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// page
import Info from '../components/screens/Info'
import Login from '../components/screens/Login'
import Map from '../components/screens/Map'
import Menu from '../components/screens/Menu'
import Profile from '../components/screens/Profile'
import Search from '../components/screens/Search'
import Signup from '../components/screens/Signup'

const SwitchNavigator = createSwitchNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Signup',
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
    },
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
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
    },
  },
  Info: {
    screen: Info,
    navigationOptions: {
      title: 'Info',
    },
  },
  Profile: {
    screen: SwitchNavigator,
    navigationOptions: {
      title: 'Profile',
    },
  },
  Menu: {
    screen: Menu,
  },
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      color: 'black',
    },
  },
})

export default createAppContainer(StackNavigator)
