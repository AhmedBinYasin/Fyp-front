import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import { IAdapter } from '../Components/types';
import { defaultUrihere } from '../App';



function ReminderLists({ actHandler, Date, Message, Enable, Adapter }: { actHandler: () => any, Date: Date, Message: string, Enable: boolean, Adapter: IAdapter }) {
    async function Change() {
        try {
            let { status } = (await axios.post(`http://`+defaultUrihere+`:5000/api/Reminders/EnableReminder`, { UserName: 'Ahmed', Date: Date, Message: Message, Enable: Enable })).data as { status: boolean, Message: string | undefined, error: any }
            if (status === true) {
                actHandler()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='Border FontStyle1  myCard offset18' style={{ marginBottom: '10px' }} >
            <div className='row' onClick={() => { Adapter.push(Date, Message); Adapter.open('EditReminder') }}>
                <p>On:{" " + Date.toDateString()}</p>
            </div>
            <div className='row' >
                <div style={{ width: '80%' }} onClick={() => { Adapter.push(Date, Message); Adapter.open('EditReminder') }}>
                    <h2>{Date.toTimeString().substring(0, 5)}</h2>
                </div>
                <div style={{ width: '20%' }}>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked={Enable} onChange={() => { Change() }} />
                        {Enable ? <label className="form-check-label MobileDisable" htmlFor="mySwitch">Enabled</label> : <label className="form-check-label  MobileDisable" htmlFor="mySwitch">Disabled</label>}
                    </div>
                </div>
            </div>
            <div className='row' onClick={() => { Adapter.push(Date, Message); Adapter.open('EditReminder') }}>
                <p>{Message}</p>
            </div>
        </div>
    )
}

function Reminders({ Adapter }: { Adapter: IAdapter }) {
    const [page, setPageProps] = useState<{ PageNo: number; Length: number; }>({ PageNo: 1, Length: 1 })
    const [sync, activate] = useState(false)
    const [ReminderList, setReminderList] = useState<Array<{ Date: string, Message: string, Enable: boolean }>>([])
    async function getData(currentPage: number) {
        try {
            let List = (await axios.post(`http://`+defaultUrihere+`:5000/api/Reminders/GetReminder`, { UserName: 'Ahmed', page: currentPage })).data.List as Array<{ Date: string, Message: string, Enable: boolean }>
            setReminderList(List)
        } catch (error) {
            console.log(error)
        }
    }
    function actHandler() {
        activate(true)
    }
    async function getPageLength() {
        try {
            let length = (await axios.post(`http://`+defaultUrihere+`:5000/api/Reminders/GetReminderLength`, { UserName: 'Ahmed' })).data.length as number
            if (length % 5 === 0) {
                length = (length / 5)
            }
            else {
                length = (length / 5) + 1
            }
            setPageProps({ ...page, Length: length })
        } catch (error) {
            console.log(error)
        }
    }
    function pageBox() {
        let pagebox: Array<JSX.Element> = []
        for (let index = 1; index < page.Length; index++) {
            const element = <li className="page-item " key={index} onClick={() => { setPageProps({ ...page, PageNo: index }) }} ><div className="page-link transparent3" style={{ color: '#000000f5', cursor: 'pointer', fontWeight: 'bold' }}  >{index}</div></li>
            pagebox.push(element)
            if (index > 5) { break }
        }
        return pagebox
    }
    useEffect(() => { getData(page.PageNo); activate(false); }, [page.PageNo, sync])
    useEffect(() => { getPageLength(); }, [])
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Reminders </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <>
                        {ReminderList.map(reminder => {
                            return <ReminderLists actHandler={actHandler} Date={new Date(reminder.Date)} Message={reminder.Message} Enable={reminder.Enable} Adapter={Adapter} />
                        })}
                    </>
                </Container>
            </div>
            {page.Length > 1 && (
                <Container>
                    <div className='row'>
                        <nav aria-label="Page navigation  example" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ul className="pagination">
                                <li className="page-item" onClick={() => { if (page.PageNo > 1) { setPageProps({ ...page, PageNo: page.PageNo - 1 }) } }}>
                                    <div className="page-link transparent3" style={{ color: '#000000f5', cursor: 'pointer', fontWeight: 'bold' }} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </div>
                                </li>
                                <>{pageBox()}</>
                                <li className="page-item" onClick={() => { if (page.PageNo < page.Length) { setPageProps({ ...page, PageNo: page.PageNo + 1 }) } }}>
                                    <div className="page-link transparent3" style={{ color: '#000000f5', cursor: 'pointer', fontWeight: 'bold' }} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Container>
            )}
            <Container>
                <div className='Border FontStyle1 footer  d-flex align-items-center' >
                    <button className="Icon-btn-menu Icon-btn-menu-start" onClick={() => { Adapter.open('AddNewReminders') }} style={{ width: '33.33%' }}><i className="fa fa-plus-square-o"></i><p className="Icon-btn-menu-text MobileDisable">New</p></button>
                    <button className="Icon-btn-menu" onClick={() => { Adapter.open('RemindersHistory') }} style={{ width: '33.33%' }}><i className="fa fa-book"></i><p className="Icon-btn-menu-text MobileDisable">history</p></button>
                    <button className="Icon-btn-menu Icon-btn-menu-end" style={{ width: '33.33%' }}><i className="fa fa-gears"></i><p className="Icon-btn-menu-text MobileDisable">Settings</p></button>
                </div>
            </Container>
        </>
    )
}

export default Reminders
