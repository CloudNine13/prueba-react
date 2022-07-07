import { SET_ERROR, RELEASE_ERROR } from '../utils/constants'

const initialState = {
  text: null
}

const errorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        text: action.payload
      }

    case RELEASE_ERROR:
      return initialState

    default:
      return state
  }
}

export default errorReducer
