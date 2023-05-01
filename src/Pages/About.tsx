import React from 'react'
import { Container } from 'react-bootstrap'

function About() {
  return (
    <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'>
                        <h3 className='text-white-50'>About</h3>
                    </div>
                </Container>
                <Container className='MainSetings'>
                    <div className='Border FontStyle1  myCard offset18'>
                        <h2 style={{textAlign:'center',marginBottom:'20vh'}}>Sound Sense</h2>
                        <h4 style={{textAlign:'center'}}>Developed By</h4>
                        <p style={{fontWeight:'bold',textAlign:'center'}}>Ahmed Bin yasin</p>
                        <p style={{fontWeight:'bold',textAlign:'center'}}>Muhammad Usman Ghuni</p>
                        <p style={{fontWeight:'bold',textAlign:'center'}}>Faheem Haider</p>
                        <p style={{fontWeight:'bold',textAlign:'center'}}>Arsam Khalid</p>
                        <h2 style={{textAlign:'center',marginBottom:'20vh'}}> </h2>
                    </div>
                </Container>
            </div>
        </>
  )
}

export default About
