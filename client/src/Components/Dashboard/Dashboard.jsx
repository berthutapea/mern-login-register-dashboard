import React from 'react'
import '../../App.css'
import Sidebar from '../Dashboard/SideBarSection/Sidebar'
import Body from '../Dashboard/BodySection/Body'

const Dashboard = () => {
    return (
        <div className="dashboard flex">
            <div className="dashboardContainer flex">
                <Sidebar/>
                <Body/>
            </div>
        </div>
    )
}

export default Dashboard
