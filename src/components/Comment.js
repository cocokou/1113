import React, { Component } from 'react';
import { connect } from 'react-redux';
import Votes from './Votes';

import { deleteComment, updateComment, updateScore } from '../actions/comments';

import formatTime from '../utils/formatTime';

import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

class CommentItem extends Component {
  state = {
    commentBody: this.props.comment.body,
    editMode: false
  };

  toggleFormVisibility = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleChange = event => {
    this.setState({ commentBody: event.target.value });
  };

  handleSubmit = event => {
    const { updateComment } = this.props;
    const { commentBody } = this.state;

    updateComment({
      body: commentBody,
      timestamp: Date.now()
    });

    this.toggleFormVisibility();
  };

  updateScore = event => {
    const { updateVoteScore } = this.props;

    document.activeElement && document.activeElement.blur();

    // dispatch vote score update
    updateVoteScore(event.currentTarget.value);
  };

  deleteComment = () => {
    const { comment, deleteComment } = this.props;

    console.log('will delete comment with id...', comment.id);

    deleteComment();
  };

  render() {
    const { comment } = this.props;
    const { commentBody, editMode } = this.state;

    return (
      <div>
      <Card>
        <CardHeader
          subheader={`posted on ${formatTime(comment.timestamp)} by ${comment.author}`}
        />        
         <CardActions disableActionSpacing>

        <Button onClick={this.toggleFormVisibility} >edit</Button>
        <IconButton onClick={this.deleteComment} >delete</IconButton>

          <Votes
          score={comment.voteScore}    
          updateScore={this.updateScore}
        /> 

        </CardActions>
        <CardContent>
        {!editMode ? (
          <Typography component="p">{comment.body}</Typography>
        ) : (
          <Typography component="p">
            <form onSubmit={this.handleSubmit}>
             
                <input
                  name="comment_body"
                  value={commentBody}
                  width={14}
                  onChange={this.handleChange}
                />
                <Button onClick={this.handleSubmit}>submit</Button>
            </form>

            </Typography>
        )}
        </CardContent>
    </Card> 
      </div>
    );

  }
}

const mapDispatchToProps = (dispatch, { comment }) => ({
  deleteComment: () => dispatch(deleteComment(comment.id)),
  updateVoteScore: (vote) =>
    dispatch(updateScore(comment.id, { option: vote })),
  updateComment: commentFields =>
    dispatch(updateComment(comment.id, commentFields))
});

export default connect(null, mapDispatchToProps)(CommentItem);
