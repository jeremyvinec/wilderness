import { SEARCHED_TEXT } from '../../actions/actionTypes'

const search = (state = {}, action: any) => {
  switch (action.type) {
    case SEARCHED_TEXT:
      return action.playload
  }
}

export default search
