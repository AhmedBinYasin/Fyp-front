import React from 'react'
import { Container } from 'react-bootstrap'
import { IRouter } from '../Hooks/useCustomRouter'
import HomeIcon from './Icons/HomeIcon'
import NodeIcon from './Icons/NodeIcon'
import ReminderIcon from './Icons/ReminderIcon'
import { IAdapter } from './types'
import SpeachIcon from './Icons/SpeachIcon'
import AboutIcon from './Icons/AboutIcon'
import HistoryIcon from './Icons/ListIcon'
import AdminIcon from './Icons/OptionsIcon'
import SettingsIcon from './Icons/SettingsIcon'

function NevLinks({ name, icon, Router, Handeler }: { name: string, icon: JSX.Element, Router: IRouter, Handeler: () => void }) {
    if (Router.active === name) {
        return (
            <>
                <div className="nav-link active" aria-current="page" style={{ color: 'black' }} onClick={Handeler} >
                    {icon}
                    {name}
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="nav-link" aria-current="page" style={{ color: 'black' }} onClick={Handeler}>
                    {icon}
                    {name}
                </div>
            </>
        )
    }
}

function SideNav({ Router, Adapter,handleClose }: { Router: IRouter, Adapter: IAdapter ,handleClose:() => void}) {
    return (
        <Container className='p-3'>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
            <NevLinks name='Home' icon={<HomeIcon />} Router={Router} Handeler={() => { if(Router.active!=='Home'){ handleClose();Adapter.open('Home'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Reminders' icon={<ReminderIcon />} Router={Router} Handeler={() => {if(Router.active!=='Reminders'){handleClose(); Adapter.open('Reminders'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Connections' icon={<NodeIcon />} Router={Router}  Handeler={() => { if(Router.active!=='Connections'){handleClose(); Adapter.open('Connections'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='Speach To Text' icon={<SpeachIcon />} Router={Router} Handeler={() => { if(Router.active!=='Speach To Text'){handleClose(); Adapter.open('Speach To Text'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='History' icon={<HistoryIcon />} Router={Router} Handeler={() => {if(Router.active!=='History'){handleClose(); Adapter.open('History'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='AdminLogs' icon={<AdminIcon />} Router={Router}  Handeler={() => { if(Router.active!=='AdminLogs'){handleClose(); Adapter.open('AdminLogs'); } }}></NevLinks>
          </li>
          <li className="nav-item">
            <NevLinks name='About' icon={<AboutIcon />} Router={Router}  Handeler={() => {handleClose(); if(Router.active!=='About'){ Adapter.open('About'); } }}></NevLinks>
          </li>
            </ul>
        </Container>
    )
}


export default SideNav
