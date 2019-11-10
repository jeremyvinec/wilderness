import { LOGIN, SIGNUP, UPDATE_AVATAR, UPDATE_EMAIL, UPDATE_LOCATION, UPDATE_PASSWORD, UPDATE_STYLE_URL, UPDATE_USERNAME } from '../../actions/actionTypes'

const user = (state = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      return action.playload
    case SIGNUP:
      return action.playload
    case UPDATE_USERNAME:
      return { ...state, username: action.playload }
    case UPDATE_EMAIL:
      return { ...state, email: action.playload }
    case UPDATE_PASSWORD:
      return { ...state, password: action.playload}
    case UPDATE_LOCATION:
      return { ...state, location: action.playload}
    case UPDATE_AVATAR:
      return { ...state, avatar: action.playload}
    case UPDATE_STYLE_URL:
      return {...state, styleURL: action.playload}
    default:
      return state
  }
}

export default user
