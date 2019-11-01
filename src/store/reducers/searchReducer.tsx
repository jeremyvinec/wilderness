import { SEARCHED_TEXT } from '../../actions/actionTypes'

const search = (state = {}, action: any) => {
  switch (action.type) {
    case SEARCHED_TEXT:
      return { ...state, search: action.playload }
    default:
      return state
  }
}

export default search
