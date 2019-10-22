import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function notificationReducer(state = initialState.test, action: any) {
  switch (action.type) {
    case types.TEST:
      return action.value
    default:
      return state
  }
}
