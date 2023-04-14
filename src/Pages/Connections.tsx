import { ChangeEvent, useState } from 'react'
import { Container } from 'react-bootstrap'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { IAdapter } from '../Components/types';
import axios from 'axios';
import { NodeIconLarge } from '../Components/Icons/NodeIcon'

function Connections() {
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Connections </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50'>Availailable Devices</h3>
                    <div className='row' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '30.33%', marginLeft: '1.5%', marginRight: '1.5%' }} >
                            <div className='row'>
                            <i className="fa fa-plug fa-4" style={{ fontSize: '7em',textAlign:'center' }} aria-hidden="true" />
                                <p style={{textAlign:'center'}}>ID</p>
                                <p style={{textAlign:'center'}}>Loation</p>
                                <p style={{textAlign:'center'}}>Status</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Connections
