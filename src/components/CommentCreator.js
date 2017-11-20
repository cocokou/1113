
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import createUUID from '../utils/createUUID';

import { createComment } from '../actions/comments';



class AddComment extends Component {
  constructor(){
    props();
    this.state =  {
    inputAuthor: '',
    inputContent: '',
    showForm: false
    }
  }


  handleAuthorChange = event => {
    this.setState({ inputAuthor: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ inputContent: event.target.value });
  };

  handleSubmit = (event, { value }) => {
    const { parentId, addComment } = this.props;
    const { inputContent, inputAuthor } = this.state;

    // TODO: validate these fields? ensure unique ID?
    const commentFields = {
      id: createUUID(),
      parentId: parentId,
      timestamp: Date.now(),
      body: inputContent,
      author: inputAuthor
    };

    console.log('create the comment!');
    addComment(commentFields);

    this.setState({
      inputAuthor: '',
      inputContent: '',
      showForm: false
    });
  };

  toggleFormOpen = () => {
    this.setState(state => ({ showForm: !state.showForm }));
  };

  render() {
    const { inputContent, inputAuthor, showForm } = this.state;
    const headerText = 'addComment';
    const styles = {
      form: {
        height: showForm ? '100%' : '0',
        overflowY: showForm ? 'auto' : 'hidden',
        transition: 'height .3s'
      },
      container: {
        border: showForm ? '1px solid rgba(34,36,38,.15)' : 'none'
      },
      toggleButton: {
        textAlign: 'center'
      }
    };

    return (
      <Card style={styles.container}>
        <div style={styles.toggleButton}>
          <Button
            onClick={this.toggleFormOpen}
          >
            {headerText}
          </Button>
        </div>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <Divider />

            <label>your name</label>
            <input
              value={inputAuthor}
              onChange={this.handleAuthorChange}
            />

          
            <textarea
              label="Comment content"
              value={inputContent}
              onChange={this.handleContentChange}
            />
  
          <Button onClick={this.handleSubmit}>Send!</Button>
        </form>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: commentData => dispatch(createComment(commentData))
});

export default connect(null, mapDispatchToProps)(AddComment);
