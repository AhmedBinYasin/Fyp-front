import { ChangeEvent, useState } from 'react'
import { Container } from 'react-bootstrap'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { IAdapter } from '../Components/types';
import axios from 'axios';
import { defaultUrihere } from '../App';






function AddNewReminders({ Adapter }: { Adapter: IAdapter }) {
    const [time, setTime] = useState<dayjs.Dayjs>(dayjs());
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [Message, setMessage] = useState<string>('');
    async function ConfirmAdd() {
        let Date: string = date.format('YYYY-MM-DD');
        let Time: string = time.format('HH:mm')
        try {
            let status = (await axios.post(`http://`+defaultUrihere+`:5000/api/Reminders/AddNewReminder`, { Date: Date + 'T' + Time, UserName: 'Ahmed', Message: Message })).data.status
            if (status) { Adapter.Return(); }
        }
        catch (error) { console.log(error) }
    }
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Reminders: Select time </h3></div>
                </Container>
                <Container className='MainSetings'>
                    {/* <h3 className='text-white-50'>Select time</h3> */}
                    <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='row'>
                                <div className='TimePicker'>
                                    <StaticTimePicker defaultValue={dayjs()} value={time} disablePast onChange={(event) => { event ? setTime(event) : setTime(dayjs()) }} sx={{ backgroundColor: 'rgb(255,255,255,0.0)' }} />
                                </div>
                                <div className='DatePicker'>
                                    <StaticDatePicker defaultValue={dayjs()} value={date} disablePast onChange={(event) => { event ? setDate(event) : setDate(dayjs()) }} sx={{ backgroundColor: 'rgb(255,255,255,0.0)' }} />
                                </div>
                                <div className='MobileDatePicker'>
                                    <DatePicker defaultValue={dayjs()} value={date} disablePast onChange={(event) => { event ? setDate(event) : setDate(dayjs()) }} sx={{ backgroundColor: 'rgb(255,255,255,0.0)' }} />
                                </div>
                            </div>
                        </LocalizationProvider>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50'>Type Message</h3>
                    <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                        <div className="form-outline" style={{width:'100%'}}>
                            <textarea className="form-control" id="textArea" rows={4} onChange={(event:ChangeEvent<HTMLTextAreaElement>)=>{setMessage(event.target.value)}} ></textarea>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='Border FontStyle1 footer  d-flex align-items-center' >
                    <button className="Icon-btn-menu Icon-btn-menu-start" onClick={() => { ConfirmAdd() }} style={{ width: '50%' }}><i className="fa fa-check"></i><p className="Icon-btn-menu-text MobileDisable">Confirm</p></button>
                    <button className="Icon-btn-menu Icon-btn-menu-end" onClick={() => { Adapter.Return() }} style={{ width: '50%' }}><i className="fa fa-times"></i><p className="Icon-btn-menu-text MobileDisable">Cancel</p></button>
                </div>
            </Container>
        </>
    )
}

export default AddNewReminders
