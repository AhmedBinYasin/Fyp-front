import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { IAdapter } from '../Components/types';

function ReminderLists({ Date, Message, state, Adapter }: { Date: Date, Message: string, state: string, Adapter: IAdapter }) {

    return (
        <div className='Border FontStyle1  myCard offset18' style={{ marginBottom: '10px' }} onClick={() => { Adapter.push(Date, Message); Adapter.open('ReAddReminder') }}>
            <div className='row'>
                <p>On:{" " + Date.toDateString()}</p>
            </div>
            <div className='row' >
                <div style={{ width: '70%' }}>
                    <h2>{Date.toTimeString().substring(0, 5)}</h2>
                </div>
                <div style={{ width: '30%' }}>
                    <p>{state}</p>
                </div>
            </div>
            <div className='row'>
                <p>{Message}</p>
            </div>
        </div>
    )
}

function RemindersHistory({ Adapter }: { Adapter: IAdapter }) {
    const [ReminderList, setReminderList] = useState<Array<{ Date: string, Message: string, state: string }>>([])
    const [page, setPageProps] = useState<{ PageNo: number; Length: number; }>({ PageNo: 1, Length: 1 })
    async function getData(currentPage: number) {
        try {
            let List = (await axios.post(`http://192.168.72.101:5000/api/Reminders/GetReminderHistory`, { UserName: 'Ahmed', page: currentPage })).data.List as Array<{ Date: string, Message: string, state: string }>
            setReminderList(List)
        } catch (error) {
            console.log(error)
        }
    }
    async function getPageLength() {
        try {
            let length = (await axios.post(`http://192.168.72.101:5000/api/Reminders/GetReminderHistoryLength`, { UserName: 'Ahmed' })).data.length as number
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
            const element = <li className="page-item " onClick={() => { setPageProps({ ...page, PageNo: index }) }}><div className="page-link transparent3" style={{ color: '#000000f5', cursor: 'pointer', fontWeight: 'bold' }}>{index}</div></li>
            pagebox.push(element)
            if (index > 7) { break }
        }
        return pagebox
    }

    useEffect(() => { getData(page.PageNo); }, [page.PageNo])
    useEffect(() => { getPageLength(); }, [])

    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Reminders History</h3></div>
                </Container>
                <Container className='MainSetings'>
                    <>
                        {ReminderList.map(reminder => {
                            return <ReminderLists Date={new Date(reminder.Date)} Message={reminder.Message} state={reminder.state} Adapter={Adapter} />
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
                    <button className="Icon-btn-menu Icon-btn-menu-full" onClick={() => { Adapter.Return() }} style={{ width: '1000%' }}><i className="fa fa-arrow-left"></i><p className="Icon-btn-menu-text MobileDisable">Return</p></button>
                </div>
            </Container>
        </>
    )
}

export default RemindersHistory
