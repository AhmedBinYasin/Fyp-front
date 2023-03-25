import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';




function AddNewReminders() {
    const [time, setTime] = useState<dayjs.Dayjs>(dayjs());
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Reminders </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50'>Select time</h3>
                    <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='row'>
                                <div className='TimePicker'>
                                    <StaticTimePicker defaultValue={time} onChange={(event) => { event ? setTime(event) : setTime(dayjs()) }} sx={{ backgroundColor: 'rgb(255,255,255,0.0)' }} />
                                </div>
                                <div className='DatePicker'>
                                    <StaticDatePicker value={time} onChange={(event) => { event ? setTime(event) : setTime(dayjs()) }} sx={{ backgroundColor: 'rgb(255,255,255,0.0)' }} />
                                </div>
                                <div className='MobileDatePicker'>
                                    <DatePicker value={time} onChange={(event) => { event ? setTime(event) : setTime(dayjs()) }} sx={{ backgroundColor: 'rgb(255,255,255,0.0)' }} />
                                </div>
                            </div>
                        </LocalizationProvider>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='Border FontStyle1 footer  d-flex align-items-center' >
                    <button className="Icon-btn-menu Icon-btn-menu-start" style={{ width: '50%' }}><i className="fa fa-check"></i><p className="Icon-btn-menu-text MobileDisable">Confirm</p></button>
                    <button className="Icon-btn-menu Icon-btn-menu-end" style={{ width: '50%' }}><i className="fa fa-times"></i><p className="Icon-btn-menu-text MobileDisable">Cancel</p></button>
                </div>
            </Container>
        </>
    )
}

export default AddNewReminders
