import { INSERT_NAME_REGION } from '../../actions/actionTypes'

const nameRegion = (state = [], action: any) => {
  console.log(state, action)
  switch (action.type) {
    case INSERT_NAME_REGION:
      return {
        ...state,
        nameRegion: [...state, action.playload],
      }
    default:
      return state
  }
}

export default nameRegion
