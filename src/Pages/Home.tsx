import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Chart from 'react-apexcharts'
import { IAdapter } from '../Components/types';




function Home({Adapter}:{Adapter:IAdapter}) {
    let options = {
        chart: { id: "alerts" },
        xaxis: { categories: ["Baby Cry", "Door Knock", "Door Bell", "Machineary", "Talking"] },
        plotOptions: {
            bar: {
                distributed: true,
                columnWidth: '70%',
                borderRadius: 0,
            }
        },
        dataLabels: { style: { colors: ['#FFFFFF'] } },

    }
    const series = [{ data: [30, 40, 45, 50, 49], }]
    return (
        <>
            <div>
                <Container className='ProfileInfo'>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Welcome </h3><img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle " /><h3 className='text-white'>Ahmed Bin Yasin</h3></div>
                    <h3 className='text-white-50'>Profile</h3>
                    <div className='Border FontStyle1  myCard offset18' >
                        <p className=''>Name:Ahmed Bin Yasin</p>
                        <p className=''>Email: ahmed116046@gmail.com</p>
                        <p className=''>Age: 22 years old</p>
                        <p className=''>Country: Pakistan</p>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50'>Graph</h3>
                    <div className='Border FontStyle1  myCard offset18' >
                        <div className="chartjs-bar">
                            <Chart
                                options={options}
                                series={series}
                                type="bar"
                                height={300}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='Border FontStyle1 footer  d-flex align-items-center' >
                    <button className="Icon-btn-menu Icon-btn-menu-start"><i className="fa fa-home"></i><p className="Icon-btn-menu-text MobileDisable">Home</p></button>
                    <button className="Icon-btn-menu" onClick={()=>{Adapter.open('Reminders')}}><i className="fa fa-book"></i><p className="Icon-btn-menu-text MobileDisable">Reminders</p></button>
                    <button className="Icon-btn-menu"><i className='fa fa-assistive-listening-systems'></i><p className="Icon-btn-menu-text MobileDisable">Speach to Text</p></button>
                    <button className="Icon-btn-menu"><i className="fa fa-list-alt"></i><p className="Icon-btn-menu-text MobileDisable">History</p></button>
                    <button className="Icon-btn-menu Icon-btn-menu-end"><i className="fa fa-gears"></i><p className="Icon-btn-menu-text MobileDisable">Settings</p></button>
                </div>
            </Container>
        </>
    )
}

export default Home
