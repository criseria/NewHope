import React from 'react'
import './container.css'

const Container = ({ children }) => {
  return (
    <div className='container__default-container'>
      {children}
    </div>
  )
}

export default Container
