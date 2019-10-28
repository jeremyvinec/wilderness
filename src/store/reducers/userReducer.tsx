import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from '../../actions/actionTypes'

const user = (state = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      return action.playload
    case SIGNUP:
      return action.playload
    case UPDATE_EMAIL:
      return { ...state, email: action.playload }
    case UPDATE_PASSWORD:
      return { ...state, password: action.playload}
    default:
      return state
  }
}

export default user
