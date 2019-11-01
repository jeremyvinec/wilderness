import { SEARCHED_TEXT } from './actionTypes'

export const searchedText = (text: String) => {
  return{
    type: SEARCHED_TEXT,
    playload: text,
  }
}
