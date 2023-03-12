import React from 'react'
import { Container } from 'react-bootstrap'
import HomeIcon from './Icons/HomeIcon'
import NodeIcon from './Icons/NodeIcon'
import ReminderIcon from './Icons/ReminderIcon'

function NevLinks({ name, icon, active }: { name: string, icon: JSX.Element, active: string }) {
    return (
        <>
            <div className={"nav-link " + active} aria-current="page">
                {icon}
                {name}
            </div>
        </>
    )
}

function SideNav() {
    return (
        <Container className='p-3'>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NevLinks name='Home' icon={<HomeIcon/>} active='active'></NevLinks>
                </li>
                <li className="nav-item">
                    <NevLinks name='Reminders' icon={<ReminderIcon/>} active=''></NevLinks>
                </li>
                <li className="nav-item">
                    <NevLinks name='Connections' icon={<NodeIcon/>} active=''></NevLinks>
                </li>
            </ul>
        </Container>
    )
}


export default SideNav
