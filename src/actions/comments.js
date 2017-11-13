

import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes';

export function loadComment(comment_id) {
  return (dispatch) => {
    return readableApi
      .getComment(comment_id)
      .then(post => {
        dispatch({
          type: actions.COMMENT_LOADED,
          post: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function loadComments(post_id) {
  return (dispatch) => {
    return readableApi
      .getComments(post_id)
      .then(comments => {
        dispatch({
          type: actions.COMMENTS_LOADED,
          comments: comments
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function createComment(commentData) {
  return function(dispatch) {
    return readableApi
      .createNewComment(commentData)
      .then(comment => {
        dispatch({
          type: actions.NEW_COMMENT,
          commentData: comment
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updateComment(
  comment_id,
  commentData
) {
  return function(dispatch) {
    return readableApi
      .updateComment(comment_id, commentData)
      .then(comment => {
        dispatch({
          type: actions.UPDATE_COMMENT,
          commentData: comment
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updateScore(
  comment_id,
  updateType
) {
  return function(dispatch) {
    return readableApi
      .updateCommentScore(comment_id, updateType)
      .then(comment => {
        dispatch({
          type: actions.UPDATE_COMMENT_SCORE,
          commentData: comment
        });
      })
      .catch(error => {
        console.log('Comment vote score update error!');
        throw error;
      });
  };
}

export function deleteComment(comment_id) {
  return function(dispatch) {
    return readableApi
      .deleteComment(comment_id)
      .then(result => {
        dispatch({
          type: actions.DELETE_COMMENT,
          deletedCommentId: comment_id
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}
