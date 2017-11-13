import React from 'react'
import Header from './Header'

const Layout = ({categories, children}) => (
  <div>
    <Header categories={categories} />
    <div className='main' style={{margin:'auto', width:'700px'}}>
      {children}
    </div>
  </div>
)

export default Layout
