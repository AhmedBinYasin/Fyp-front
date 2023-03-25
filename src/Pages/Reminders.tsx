import React from 'react';
import { Container } from 'react-bootstrap'

function ReminderLists() {
    return (
        <div className='Border FontStyle1  myCard offset18' style={{marginBottom:'10px'}} >
            <div className='row'>
                <p>Repeat</p>
            </div>
            <div className='row' >
                <div style={{ width: '80%' }}>
                    <h2>Time</h2>
                </div>
                <div style={{ width: '20%' }}>
                    <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div className='row'>
                <p>Time {' '} | {' '} Message</p>
            </div>
        </div>
    )
}

function Reminders() {
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Reminders </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <ReminderLists></ReminderLists>
                    <ReminderLists></ReminderLists>
                </Container>
            </div>
            <Container>
                <div className='Border FontStyle1 footer  d-flex align-items-center' >
                    <button className="Icon-btn-menu Icon-btn-menu-start" style={{width:'33%'}}><i className="fa fa-plus-square-o"></i><p className="Icon-btn-menu-text MobileDisable">New</p></button>
                    <button className="Icon-btn-menu" style={{width:'33%'}}><i className="fa fa-book"></i><p className="Icon-btn-menu-text MobileDisable">history</p></button>
                    <button className="Icon-btn-menu Icon-btn-menu-end" style={{width:'33%'}}><i className="fa fa-gears"></i><p className="Icon-btn-menu-text MobileDisable">Settings</p></button>
                </div>
            </Container>
        </>
    )
}

export default Reminders
