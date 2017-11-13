import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux'

import Layout from '../components/Layout'

import CategoryPage from '../views/CategoryPage'
import HomePage from '../views/HomePage'
import PostPage from '../views/PostPage'
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ categories, store }) => {
  // needed if passing addtl props to the View component bout to be rendered
  const wrapView = (ViewComponent) => {
    return (props) => <ViewComponent {...props} store={store} />
  }

  return (
    <Router>
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="App">
            <Layout categories={categories}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/:category" component={CategoryPage} />
              <Route exact path="/:category/:post_id" render={wrapView(PostPage)} />
            </Layout>
          </div>
        </MuiThemeProvider>
      </Provider>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories || [],
})

export default connect(mapStateToProps)(App)
