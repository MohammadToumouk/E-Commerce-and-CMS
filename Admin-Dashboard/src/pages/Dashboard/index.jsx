import React from 'react'
import "./Dashboard.css"
import Sidebar from '@/components/Sidebar'

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
        <Sidebar />
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title' >Dashboard</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
