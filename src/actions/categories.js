

import * as actions from '../actions/actionTypes'

import readableApi from '../utils/readableApi';

export function loadCategories() {  
  return function (dispatch) {
    return readableApi.getCategories()
    .then(data => {
      dispatch(loadCategoriesSuccess(data.categories))
    }).catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadCategoriesSuccess(categories) {
  return ({
    type: actions.CATEGORIES_LOADED,
    categories,
  })
}
