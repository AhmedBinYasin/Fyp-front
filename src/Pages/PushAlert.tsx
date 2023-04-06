import React, { useState } from 'react'
import { Alert, Button, Container } from 'react-bootstrap';
import { IAdapter } from '../Components/types';

export function PushAlert({ notifications, Adapter ,AccNotification}: { notifications: { Date: Date; Message: string; } | undefined, Adapter: IAdapter,AccNotification:() => void }) {

    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Reminder Alert </h3></div>
                </Container>
                <Container className='MainSetings'style={{height:'80vh'}}>
                    <>
                        <div className='Border FontStyle1  myCard offset18' style={{ marginBottom: '10px' ,height:'80vh'}} >
                            <div className='row'>
                                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>On:{" " + notifications?.Date.toDateString()}</p>
                            </div>
                            <div className='row' >
                                <div style={{ width: '100%' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <h2 style={{ fontSize:'14vh',fontWeight:'bold'}}>{notifications?.Date.toTimeString().substring(0, 5)}</h2>
                                </div>
                            </div>
                            <div className='row'>
                                <p style={{ fontSize:'2rem',fontWeight:'bold', marginTop:'2rem', width: '100%' ,textAlign:'center'}}>{notifications?.Message}</p>
                            </div>
                        </div>
                    </>
                </Container>
            </div>
            <Container>
                <div className='Border FontStyle1 footer  d-flex align-items-center' >
                    <button className="Icon-btn-menu Icon-btn-menu-full" onClick={() => { AccNotification() }} style={{ width: '1000%' }}><i className="fa fa-arrow-left"></i><p className="Icon-btn-menu-text MobileDisable">Return</p></button>
                </div>
            </Container>
        </>
    )

}
