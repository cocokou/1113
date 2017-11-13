

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Divider,
  Form,
  Icon,
  Segment,
  Select
} from 'semantic-ui-react';

import createUUID from '../utils/createUUID';

import { newPost } from '../actions/posts';

import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

class PostCreator extends Component {
  state = {
    inputAuthor: '',
    inputContent: '',
    inputCategory: this.props.selectedCategory || 'udacity',
    inputTitle: '',
    showForm: false
  };

  handleAuthorChange = event => {
    this.setState({ inputAuthor: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ inputContent: event.target.value });
  };

  handleCategoryChange = (event, { value }) => {
    this.setState({ inputCategory: value });
  };

  handleTitleChange = event => {
    this.setState({ inputTitle: event.target.value });
  };

  onPostSubmit = (event, { value }) => {
    const { createPost } = this.props;
    const { inputCategory, inputContent, inputAuthor, inputTitle } = this.state;

    // TODO: validate these fields? ensure unique ID?
    const postFields = {
      id: createUUID(),
      timestamp: Date.now(),
      title: inputTitle,
      body: inputContent,
      author: inputAuthor,
      category: inputCategory
    };

    createPost(postFields);

    this.setState({
      inputAuthor: '',
      inputContent: '',
      inputCategory: 'udacity',
      inputTitle: '',
      showForm: false
    });
  };

  toggleFormOpen = () => {
    this.setState(state => ({ showForm: !state.showForm }));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCategory !== this.state.inputCategory) {
      this.setState({ inputCategory: nextProps.selectedCategory });
    }
  }

  render() {
    const { categories } = this.props;
    const {
      inputCategory,
      inputContent,
      inputAuthor,
      inputTitle,
      showForm
    } = this.state;

    const postCategories = categories.map(
      (category, index) => ({
        text: category,
        value: category,
        key: category + String(index)
      })
    );

    const styles = {
      form: {
        height: showForm ? '100%' : '0',
        overflowY: showForm ? 'auto' : 'hidden',
        transition: 'height .3s'
      },
      header: {
        display: 'flex',
        justifyContent: 'center'
      },
      container: {
        border: showForm ? '1px solid rgba(34,36,38,.15)' : 'none',
        boxShadow: showForm ? '0 1px 2px 0 rgba(34,36,38,.15)' : 'none',
        transition: 'all .3s'
      }
    };

    return (
      <div>
      <Card style={styles.container}>
        <div style={styles.header}>
          <Button
            onClick={this.toggleFormOpen}
          >
          addPost
          </Button>
        </div>
        <Form style={styles.form} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <Select
              placeholder="select"
              options={postCategories}
              value={inputCategory}
              onChange={this.handleCategoryChange}
            />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input
              value={inputAuthor}
              onChange={this.handleAuthorChange}
            />
          </Form.Field>
          <Form.Field>
            <label>title</label>
            <input
              value={inputTitle}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="content"
              value={inputContent}
              onChange={this.handleContentChange}
            />
          </Form.Field>
          <Button type="submit">Post!</Button>
        </Form>
      </Card>
      {/*<Segment style={styles.container}>
        <div style={styles.header}>
          <Button
            onClick={this.toggleFormOpen}
          >
          addPost
          </Button>
        </div>
        <Form style={styles.form} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <Select
              placeholder="select"
              options={postCategories}
              value={inputCategory}
              onChange={this.handleCategoryChange}
            />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input
              value={inputAuthor}
              onChange={this.handleAuthorChange}
            />
          </Form.Field>
          <Form.Field>
            <label>title</label>
            <input
              value={inputTitle}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="content"
              value={inputContent}
              onChange={this.handleContentChange}
            />
          </Form.Field>
          <Button type="submit">Post!</Button>
        </Form>
      </Segment>*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.map(category => category.name)
});

const mapDispatchToProps = dispatch => ({
  createPost: postData => dispatch(newPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
