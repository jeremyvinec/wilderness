import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// page
import Info from '../components/screens/Info'
import Login from '../components/screens/Login'
import Map from '../components/screens/Map'
import Menu from '../components/screens/Menu'
import Profile from '../components/screens/Profile'
import Search from '../components/screens/Search'
import Signup from '../components/screens/Signup'

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
      //header: null,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      //header: null,
    },
  },
  Menu: {
    screen: Menu,
  },
  Login: {
    screen: Login,
    navigationOptions: {
      //header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      //header: null,
    },
  },
})

export default createAppContainer(StackNavigator)
