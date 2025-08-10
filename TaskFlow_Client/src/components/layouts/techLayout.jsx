import React from 'react'
import { Outlet } from 'react-router-dom'

const TechLayout = () => {
  return (
    <div>techLayout
        {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
    
  )
}

export default TechLayout