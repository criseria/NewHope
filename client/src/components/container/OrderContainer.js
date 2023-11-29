import React from 'react'
import './container.css'

const OrderContainer = ({ children }) => {
  return (
    <div className='container__order-container'>
      {children}
    </div>
  )
}

export default OrderContainer
