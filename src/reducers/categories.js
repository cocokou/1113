

import * as actions from '../actions/actionTypes'

const initialState = []

const categoryReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actions.CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export default categoryReducer
