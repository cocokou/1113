
import React from 'react';
import { connect } from 'react-redux';
//import { Button, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import { Grid, Header, Divider, Icon} from 'semantic-ui-react';

import Button from 'material-ui/Button';


import formatTime from '../utils/formatTime';

import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import PostEditor from '../components/PostEditor';

import Votes from '../components/Votes';

import { deletePost, updateScore } from '../actions/posts';

const emptyPost = {
  body: '',
  category: '',
  voteScore: 0,
  title: '',
  id: '',
  timestamp: 0,
  author: ''
};

class PostPage extends React.Component {
  state = {
    editMode: false
  };

  deletePost = () => {
    const { post_id, history, deletePost } = this.props;
    deletePost(post_id);
    history.goBack();
  };

  toggleEdit = event => {
    this.setState(state => ({ editMode: !state.editMode }));
  };

  updateScore = event => {
    document.activeElement && document.activeElement.blur();
    // dispatch vote score update
    this.props.updateVoteScore(event.currentTarget.value);
  };

  render() {
    const { post } = this.props;
    const { editMode } = this.state;

    return (
      <div className="post-page">

        {editMode ? (
          <PostEditor
            post={post}
            selectedCategory={post.category}
            onSubmit={this.toggleEdit}
          />
        ) : (
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header size='medium' content={post.title} />
                <div>
                  <Button  onClick={this.toggleEdit}>
                    {editMode ? 'CANCEL' : 'EDIT'}
                  </Button>
                  <Button  onClick={this.deletePost}>
                    DELETE
                  </Button>
                </div>
                <Header
                  sub
                  size="small"
                  content={`${formatTime(
                    post.timestamp
                  )} by ${post.author}`}
                  dividing
                />
              </Grid.Column>

              <Grid.Column width={4} textAlign="center">
                <Votes
                  score={post.voteScore}
                  updateScore={this.updateScore}
                />
              </Grid.Column>
            </Grid.Row>

            <p>{post.body}</p>
          </Grid>
        )}

        <Divider hidden horizontal section />

        <h5>Comments: {this.props.commentCount}</h5>
        <AddComment parentId={post.id} />

        {post.id && <CommentList post_id={post.id} />}
        <Divider section />

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const post_id = props.match.params.post_id;
  //const category = props.match.params.category;
  let post = state.posts[post_id] || emptyPost;
  let commentCount=Object.keys(state.comments).length;
  return {
    post_id,
    //category,
    post,
    commentCount,
  };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  deletePost: (post_id) => dispatch(deletePost(post_id)),
  updateVoteScore: (vote) =>
    dispatch(updateScore(params.post_id, { option: vote }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
