import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from './Comment';
import ListDisplayControls from './ListDisplayControls';

import { loadComments } from '../actions/comments';
import { setSortDirection, setSortFilter } from '../actions/listFilter';


class CommentList extends Component {
  componentWillMount() {
    const { post_id, loadComments } = this.props;
    loadComments(post_id);
  }

  sortedList = () => {
    const { comments, sortFilter, sortDirection } = this.props;

    switch (`${sortFilter}-${sortDirection}`) {
      case 'time-asc':
        return comments.sort((a, b) => {
          if (a.timestamp > b.timestamp) return 1;
          else if (a.timestamp === b.timestamp) return 0;
          else return -1;
        });
      case 'time-desc':
        return comments.sort((a, b) => {
          if (a.timestamp > b.timestamp) return -1;
          else if (a.timestamp === b.timestamp) return 0;
          else return 1;
        });
      case 'score-asc':
        return comments.sort((a, b) => {
          if (a.voteScore > b.voteScore) return 1;
          else if (a.voteScore === b.voteScore) return 0;
          else return -1;
        });
      default:
        return comments.sort((a, b) => {
          if (a.voteScore > b.voteScore) return -1;
          else if (a.voteScore === b.voteScore) return 0;
          else return 1;
        });
    }
  };

  render() {
    const { sortFilter, sortDirection, setFilter, setDirection } = this.props;
    const comments = this.sortedList();

    return (
      <div className="comment-list">
        {comments.length > 0 && (
          <ListDisplayControls
            direction={sortDirection}
            filter={sortFilter}
            options={['score', 'time']}
            onDirectionChange={setDirection}
            onFilterChange={setFilter}
          />
        )}

        {comments.length ? (
          <div>
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
         <div>no comment</div>
        )}   
   </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const commentList = Object.keys(state.comments).map(
    comment_id => state.comments[comment_id]
  );
  const comments = props.post_id
    ? commentList.filter(comment => props.post_id === comment.parentId)
    : commentList;

  return {
    comments,
    sortDirection: state.listFilter.sortDirection,
    sortFilter: state.listFilter.sortFilter
  };
};

const mapDispatchToProps = dispatch => ({
  loadComments: post_id => dispatch(loadComments(post_id)),
  setDirection: selectedDirection =>
    dispatch(setSortDirection(selectedDirection)),
  setFilter: selectedFilter => dispatch(setSortFilter(selectedFilter))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
