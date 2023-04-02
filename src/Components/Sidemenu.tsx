import React from 'react'
import { IRouter } from '../Hooks/useCustomRouter'
import HomeIcon from './Icons/HomeIcon'
import NodeIcon from './Icons/NodeIcon'
import ReminderIcon from './Icons/ReminderIcon'
import { OnClick } from './SidemenuEvents'
import { IAdapter } from './types'

function NevLinks({ name, icon, Router, Handeler }: { name: string, icon: JSX.Element, Router: IRouter, Handeler: () => void }) {
  if (Router.active === name) {
    return (
      <>
        <div className="nav-link active" aria-current="page" style={{ color: 'black' }} onClick={ Handeler } >
          {icon}
          {name}
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className="nav-link" aria-current="page" style={{ color: 'black' }} onClick={ Handeler }>
          {icon}
          {name}
        </div>
      </>
    )
  }
}


function Sidemenu({ Router, Adapter }: { Router: IRouter, Adapter: IAdapter }) {
  return (
    <>
      <div className="DesktopSidebar flex-shrink-0 p-3 MobileDisable" style={{ width: "20vw", height: '100vh' }}>
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">Sidebar</span>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NevLinks name='Home' icon={<HomeIcon />} Router={Router} Handeler={() => { if(Router.active!=='Home'){ Adapter.open('Home'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Reminders' icon={<ReminderIcon />} Router={Router} Handeler={() => { console.log('first');if(Router.active!=='Reminders'){ Adapter.open('Reminders'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Connections' icon={<NodeIcon />} Router={Router}  Handeler={() => { OnClick(Router.active, Adapter, 'Connections') }}></NevLinks>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidemenu
