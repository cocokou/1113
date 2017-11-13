
import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes';



export function loadPost(post_id) {
  return (dispatch) => {
    return readableApi
      .getPost(post_id)
      .then(post => {
        dispatch({
          type: actions.POST_LOADED,
          post: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function loadPosts() {
  return (dispatch) => {
    return readableApi
      .getPosts()
      .then(posts => {
        dispatch({
          type: actions.POSTS_LOADED,
          posts: posts
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function newPost(postData) {
  return function(dispatch) {
    return readableApi
      .createNewPost(postData)
      .then(post => {
        dispatch({
          type: actions.NEW_POST,
          postData: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updatePost(
  post_id,
  postData
) {
  return function(dispatch) {
    return readableApi
      .updatePost(post_id, postData)
      .then(post => {
        dispatch({
          type: actions.UPDATE_POST,
          postData: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updateScore(
  post_id,
  updateType
) {
  return function(dispatch) {
    return readableApi
      .updatePostScore(post_id, updateType)
      .then(post => {
        dispatch({
          type: actions.UPDATE_POST_SCORE,
          postData: post
        });
      })
      .catch(error => {
        console.log('Post vote score update error!');
        throw error;
      });
  };
}

export function deletePost(post_id) {
  return function(dispatch) {
    return readableApi
      .deletePost(post_id)
      .then(result => {
        console.log('post deleted! ', post_id, result);
        dispatch({
          type: actions.DELETE_POST,
          deletedPostId: post_id
        });
      })
      .catch(error => {
        console.log('Post delete error!');
        throw error;
      });
  };
}
