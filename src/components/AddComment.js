import React, { Component } from 'react';
import { connect } from 'react-redux';
import createUUID from '../utils/createUUID';
import { createComment } from '../actions/comments';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';

class CommentCreator extends Component
 {
  state = {
    author: '',
    body: '',
    showForm: false
  };

  ChangeAuthor = event => {
    this.setState({ author: event.target.value });
  };

  ChangeContent = event => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = () => {

    const { parentId, addComment } = this.props;
    const { body, author } = this.state;

    // TODO: validate these fields? ensure unique ID?
    const commentFields = {
      id: createUUID(),
      parentId: parentId,
      timestamp: Date.now(),
      body: body,
      author: author
    };

    addComment(commentFields);

    this.setState({
      author: '',
      body: '',
      showForm: false
    });
  };

  toggleFormOpen = () => {
    this.setState(state => ({ showForm: !state.showForm }));
  };

  render() {
    const { body, author, showForm } = this.state;
 
    const styles = {
      form: {
        height: showForm ? '100%' : '0',
        overflowY: showForm ? 'auto' : 'hidden',
        transition: 'height .3s'
      },
      container: {
        border: showForm ? '1px solid pink' : 'none'
        // border: showForm ? '1px solid rgba(34,36,38,.15)' : 'none'
      },
      toggleButton: {
        textAlign: 'center'
      }
    };

    return (
<div>

<div style={styles.container}>
<div style={styles.toggleButton}>
  <Button
    onClick={this.toggleFormOpen}
  >
  Add Comment
  </Button>
</div>
<form style={styles.form}> 
 <Divider /> 
    <label>your name </label>
    <Input onChange={this.ChangeAuthor} required/>
<div> 
    <label> comment </label>
     <TextField
    multiline  rows="4" required
      onChange={this.ChangeContent}
    />
    </div>
  <Button onClick={this.handleSubmit}>Post</Button>
</form>
</div>

</div>   );
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: commentData => dispatch(createComment(commentData))
});

export default connect(null, mapDispatchToProps)(CommentCreator);