import React from 'react';
import PostCreator from '../components/PostCreator'
import PostList from '../components/PostList'

const HomePage = () => {
 return (
    <div className="home-page">
      <PostCreator />
      <PostList />
    </div>
  );
}

export default HomePage
