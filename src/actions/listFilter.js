

import * as actions from '../actions/actionTypes'


export function setSortDirection (selectedDirection) {
  return {
    type: actions.SET_LIST_DIRECTION,
    filter: {
      sortDirection: selectedDirection
    }
  }
}

export function setSortFilter (selectedFilter) {
  return {
    type: actions.SET_LIST_FILTER,
    filter: {
      sortFilter: selectedFilter
    }
  }
}
