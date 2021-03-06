import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { updatePost } from '../actions/posts'

class PostCreator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputContent: props.post.body,
      inputTitle: props.post.title,
    }
  }

  handleContentChange = (event) => {
    this.setState({ inputContent: event.target.value })
  }

  handleTitleChange = (event) => {
    this.setState({ inputTitle: event.target.value })
  }

  onPostSubmit = (event) => {
  // onPostSubmit = (event, { value }) => {
    const { post, onSubmit, updatePost } = this.props
    const { inputContent, inputTitle } = this.state

    // validate these fields?
    // ensure unique ID?
    const postFields = {
      title: inputTitle, 
      body: inputContent,
    }

    updatePost(post.id, postFields)

    onSubmit()

    this.setState({
      inputContent: '',
      inputTitle: '',
    })
  }

  render() {
    const {
      inputContent,
      inputTitle,
    } = this.state
   
    const formStyles = {
      // overflowY: showForm ? 'auto' : 'hidden',
      transition: 'height .3s',
    }

    return (
      <div>  
        <form>
          <Divider />
            <label>Post title</label>
            <input value={inputTitle} onChange={this.handleTitleChange} />
            <label>Post content</label>
            <textarea  value={inputContent} onChange={this.handleContentChange} />
          <Button onClick={this.onPostSubmit}>Post</Button>
        </form>
        {/*<Form style={formStyles} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <label>Post title</label>
            <input value={inputTitle} onChange={this.handleTitleChange} />
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Post content' value={inputContent} onChange={this.handleContentChange} />
          </Form.Field>
          <Button type='submit'>Update!</Button>
        </Form>*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // categories: state.categories.map(category => category.name),
})

const mapDispatchToProps = dispatch => ({
  updatePost: (post_id, postData) => dispatch(updatePost(post_id, postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator)
