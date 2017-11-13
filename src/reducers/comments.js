

import * as actions from '../actions/actionTypes';


const commentsReducer = (state= {}, action) => {
  switch (action.type) {
    case actions.NEW_COMMENT:
    case actions.UPDATE_COMMENT:
    case actions.UPDATE_COMMENT_SCORE:
      return { ...state, [action.commentData.id]: action.commentData };
    case actions.COMMENTS_LOADED:
      return action.comments.reduce((commentCache, comment) => {
        commentCache[comment.id] = comment;
        return commentCache;
      }, {});
    case actions.DELETE_COMMENT:
      return Object.keys(state).reduce((commentCache, comment_id) => {
        if (action.deletedCommentId !== comment_id) {
          commentCache[comment_id] = state[comment_id];
        }
        return commentCache;
      }, {});
    default:
      return state;
  }
};

export default commentsReducer;
