import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { defaultUrihere } from '../App';


export function AlertHistory() {
    const [list, setList] = useState<Array<{OutputType: string; Date: Date; Content: string; DeviceID: string; Location: string;}>>([])
    const [page, setPageProps] = useState<{ PageNo: number; Length: number; }>({ PageNo: 1, Length: 1 })
    async function getData(currentPage: number) {
        try {
            let List = (await axios.post(`http://`+defaultUrihere+`:5000/api/Node/GetHistory`, {page: currentPage})).data.List as Array<{OutputType: string; Date: Date; Content: string; DeviceID: string; Location: string;}>
            setList(List)
            
        } catch (error) {
            console.log(error)
        }
    }
    async function getPageLength() {
        try {
            let length = (await axios.post(`http://`+defaultUrihere+`:5000/api/Node/GetHistoryLength`, { UserName: 'Ahmed' })).data.length as number
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
    useEffect(()=>{getData(1)})
    useEffect(() => { getData(page.PageNo);console.log('first') }, [page.PageNo])
    useEffect(() => { getPageLength(); }, [])
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'>
                        <h3 className='text-white-50'>User History and Activity</h3>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <>
                        {list.map(li => {
                            return <div className='Border FontStyle1  myCard offset18' >{li.Date+" "+li.Content+" "+li.Location}</div>
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