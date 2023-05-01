import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';

type AdminLogsTable = {
    Date: string;
    Type: string;
    Message: string;
    Address: string;
};
type AlertHistoryTable = {
    OutputType: string;
    Date: string;
    Content: string;
    DeviceID?: string;
    Location?: string;
};

export function AdminLogs() {
    const [list, setList] = useState<Array<{ Date: Date; Type: string; Message?: string | undefined; Address?: string | undefined; }>>([])
    const columns = useMemo<MRT_ColumnDef<AdminLogsTable>[]>(
        () => [
            {
                accessorKey: 'Date',
                header: 'Date',
            },
            {
                accessorKey: 'Type',
                header: 'Type',
            },
            {
                accessorKey: 'Message',
                header: 'Message',
            },
            {
                accessorKey: 'Address',
                header: 'Address',
            },
        ],
        [],
    );

    function configData() {
        let temp: Array<{ Date: string; Type: string; Message: string; Address: string; }> = []
        list.map((item) => { temp.push({ Date: item.Date.toISOString(), Type: item.Type, Message: item.Message ? item.Message : "", Address: item.Address ? item.Address : "" }) })
        return temp
    }

    async function getData() {
        try {
            let List = (await axios.post(`http://localhost:5000/api/Node/GetAdminLogs`, {})).data.List as Array<{ Date: Date; Type: string; Message?: string | undefined; Address?: string | undefined; }>
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
                    <div className='d-flex gap-2 align-items-center'>
                        <h3 className='text-white-50'>User History and Activity</h3>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <div className='Border FontStyle1  myCard offset18' >
                        <MaterialReactTable
                            columns={columns}
                            data={configData()}
                            enableColumnActions={false}
                            enableColumnFilters={false}
                            enablePagination={true}
                            rowCount={20}
                            enableSorting={false}
                            enableBottomToolbar={false}
                            enableTopToolbar={false}
                            muiTableBodyRowProps={{ hover: false }}
                        />
                    </div>
                </Container>
            </div>
        </>
    )
}

export function AlertHistory() {
    const [list, setList] = useState<Array<{ OutputType: string; Date: Date; Content: string; DeviceID?: string | undefined; Location?: string | undefined; }>>([])
    const columns = useMemo<MRT_ColumnDef<AlertHistoryTable>[]>(
        () => [
            {
                accessorKey: 'Date',
                header: 'Date',
            },
            {
                accessorKey: 'OutputType',
                header: 'Type',
            },
            {
                accessorKey: 'Content',
                header: 'Message',
            },
            {
                accessorKey: 'DeviceID',
                header: 'DeviceID',
            },
            {
                accessorKey: 'Location',
                header: 'Location',
            },
        ],
        [],
    );
    function configData() {
        let temp: Array<{ OutputType: string; Date: string; Content: string; DeviceID?: string; Location?: string; }> = []
        list.map((item) => { temp.push({ Date: item.Date.toISOString(), OutputType: item.OutputType, Content: item.Content, DeviceID: item.DeviceID ? item.DeviceID : "", Location: item.Location ? item.Location : "", }) })
        return temp
    }
    async function getData() {
        try {
            let List = (await axios.post(`http://localhost:5000/api/Node/GetHistory`, {})).data.List as Array<{ OutputType: string; Date: Date; Content: string; DeviceID?: string | undefined; Location?: string | undefined; }>
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
                    <div className='d-flex gap-2 align-items-center'>
                        <h3 className='text-white-50'>User History and Activity</h3>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <div className='Border FontStyle1  myCard offset18' >
                        <MaterialReactTable
                            columns={columns}
                            data={configData()}
                            enableColumnActions={false}
                            enableColumnFilters={false}
                            enablePagination={true}
                            rowCount={20}
                            enableSorting={false}
                            enableBottomToolbar={false}
                            enableTopToolbar={false}
                            muiTableBodyRowProps={{ hover: false }}
                        />
                    </div>
                </Container>
            </div>
        </>
    )
}