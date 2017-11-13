import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ categories }) => (
  <div className='head'>
    <ul className='nav'>
      <li>
        <Link to="/" > Home </Link>
      </li>
      {categories.map(category =>
        <li key={category.name}>
          <Link to={`/${category.name}`}>
            {category.name}
          </Link>
        </li>
      )}
    </ul>
  </div>
)

export default Header