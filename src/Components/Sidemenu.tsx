import React from 'react'
import HomeIcon from './Icons/HomeIcon'
import NodeIcon from './Icons/NodeIcon'
import ReminderIcon from './Icons/ReminderIcon'

function NevLinks({ name, icon, active }: { name: string, icon: JSX.Element, active: string }) {
  return (
    <>
      <div className={"nav-link " + active} aria-current="page" style={{color:'black'}}>
        {icon}
        {name}
      </div>
    </>
  )
}

function Sidemenu() {
  return (
    <>
      <div className="DesktopSidebar flex-shrink-0 p-3 MobileDisable" style={{ width: "20vw" ,height:'100vh'}}>
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">Sidebar</span>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NevLinks name='Home' icon={<HomeIcon />} active='active'></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Reminders' icon={<ReminderIcon />} active=''></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Connections' icon={<NodeIcon />} active=''></NevLinks>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidemenu
