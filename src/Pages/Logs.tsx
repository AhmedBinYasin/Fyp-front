import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { defaultUrihere } from '../App';



export function AdminLogs() {
    const [list, setList] = useState<Array<{ Date: string; Type: string; Message?: string | undefined; Address?: string | undefined; }>>([])
    const [page, setPageProps] = useState<{ PageNo: number; Length: number; }>({ PageNo: 1, Length: 1 })
    async function getData(currentPage: number) {
        try {
            let List = (await axios.post(`http://`+defaultUrihere+`:5000/api/Node/GetAdminLogs`, {page: currentPage})).data.List as Array<{ Date: string; Type: string; Message: string; Address: string; }>
            setList(List)
        } catch (error) {
            console.log(error)
        }
    }
    async function getPageLength() {
        try {
            let length = (await axios.post(`http://`+defaultUrihere+`:5000/api/Node/GetAdminLogsLength`, { UserName: 'Ahmed' })).data.length as number
            if (length % 7 === 0) {
                length = (length / 7)
            }
            else {
                length = (length / 7) + 1
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
    useEffect(() => { getData(page.PageNo);console.log('first') }, [page.PageNo])
    useEffect(() => { getPageLength(); }, [])
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'>
                        <h3 className='text-white-50'>Admin Logs</h3>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <>
                        {list.map(li => {
                            return <div className='Border FontStyle1  myCard offset18' style={{marginBottom:'5px'}} >{li.Date+" "+li.Message}</div>
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
        </>
    )
}
