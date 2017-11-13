import React from 'react';
import PostCreator from '../components/PostCreator'
import PostList from '../components/PostList'

type PageProps = {
  match: any,
}

const CategoryPage = (props: PageProps) => {
  const category = props.match.params.category

  return (
    <div className={`${category}-page`}>
      <PostCreator selectedCategory={category} />
      <PostList category={category} />
    </div>
  );
}

export default CategoryPage
