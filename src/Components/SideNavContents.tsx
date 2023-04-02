import React from 'react'
import { Container } from 'react-bootstrap'
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

function SideNav({ Router, Adapter }: { Router: IRouter, Adapter: IAdapter }) {
    return (
        <Container className='p-3'>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NevLinks name='Home' icon={<HomeIcon />} Router={Router} Handeler={() => { if (Router.active !== 'Home') { Adapter.open('Home'); } }}></NevLinks>
                </li>
                <li className="nav-item">
                    <NevLinks name='Reminders' icon={<ReminderIcon />} Router={Router} Handeler={() => { console.log('first'); if (Router.active !== 'Reminders') { Adapter.open('Reminders'); } }}></NevLinks>
                </li>
                <li className="nav-item">
                    <NevLinks name='Connections' icon={<NodeIcon />} Router={Router} Handeler={() => { OnClick(Router.active, Adapter, 'Connections') }}></NevLinks>
                </li>
            </ul>
        </Container>
    )
}


export default SideNav
