import { INSERT_NAME_REGION } from '../../actions/actionTypes'

const offlineRegion = (state = [], action: any) => {
  switch (action.type) {
    case INSERT_NAME_REGION:
      return [...state, action.playload]
    default:
      return state
  }
}

export default offlineRegion
