import { SEARCHED_TEXT } from './actionTypes'

export const searchedText = (search: String) => {
  return{
    type: SEARCHED_TEXT,
    playload: search,
  }
}
