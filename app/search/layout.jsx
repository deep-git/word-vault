import Navbar from '@components/Navbar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className="flex flex-col">
        <Navbar main_page={false}/>
        {children}
    </div>
  )
}

export default layout