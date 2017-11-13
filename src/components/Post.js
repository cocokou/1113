import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import formatTime from '../utils/formatTime';
import Votes from '../components/Votes';
import { deletePost, updateScore } from '../actions/posts';

import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

class Post extends React.Component {

  render() {
    const { post } = this.props;
    console.log(post);
    return (
        <Card>
          <Link to={`/${post.category}/${post.id}`}>
            <CardHeader
              title={post.title}
              subheader={`posted on ${formatTime(post.timestamp)} by ${post.author}`}
            />
            
              <CardContent>
                <Typography component="p">
                  {post.body}
                </Typography>
              </CardContent>
            </Link>
      
            <CardActions disableActionSpacing>

              <IconButton onClick={_ => {
                const { deletePost } = this.props;
                deletePost(post.id);
              }}>
                delete
            </IconButton>
    

              {post.commentCount} Comments,
            <Votes
                score={post.voteScore}
                updateScore={e => {
                  document.activeElement && document.activeElement.blur();
                  this.props.updateVoteScore(e.currentTarget.value, post.id)
                }}
              />
    
            </CardActions>
        </Card>   
    );
  }
}
const mapStateToProps = (state, props) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
  deletePost: (post_id) => dispatch(deletePost(post_id)),
  updateVoteScore: (vote, post_id) =>
    dispatch(updateScore(post_id, { option: vote }))
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);
