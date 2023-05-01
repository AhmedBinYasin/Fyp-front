import { ChangeEvent, useEffect, useState } from 'react'
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
    const [List, setList] = useState<Array<{ Node_ID: string, Location: string, Connection: string }>>([])
    async function getData() {
        try {
            let List = (await axios.post(`http://192.168.72.101:5000/api/Node/GetConnectedNodes`, {})).data.List as Array<{ Node_ID: string, Location: string, Connection: string }>
            setList(List)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getData(); }, [])
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Connections </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50'>Availailable Devices</h3>
                    <div className='row' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        {List.map((item) => {
                            return (
                                <div className='Border FontStyle1  myCard offset18 nodeBox' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: '1.5%', marginRight: '1.5%' }} >
                                    <div className='row'>
                                        <i className="fa fa-plug fa-4" style={{ fontSize: '7em', textAlign: 'center' }} aria-hidden="true" />
                                        <p style={{ textAlign: 'center' }}>ID: {item.Node_ID}</p>
                                        <p style={{ textAlign: 'center' }}>Loation: {item.Location}</p>
                                        {item.Connection ? <p style={{ textAlign: 'center' }}>Status: Online</p> : <p style={{ textAlign: 'center' }}>Status: Offline</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Connections
