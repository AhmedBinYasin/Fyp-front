import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import useCustomRouter from './Hooks/useCustomRouter'
import Offcanvas from 'react-bootstrap/Offcanvas';
import SideNav from './Components/SideNavContents';
import SideNavTitle from './Components/SideNavTitle';
import ManuButton from './Components/HomeComponents/ManuButton';
import Sidemenu from './Components/Sidemenu';
import Home from './Pages/Home';
import Reminders from './Pages/Reminders';
import AddNewReminders from './Pages/AddNewReminders';

function Main() {

  const { Router, Adapter } = useCustomRouter()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid='md' className='pt-3 responsiveDisable MobileRouter'>
        <ManuButton  handleShow={handleShow} />
        <div className='MobileView'>
        <AddNewReminders/>
        </div>
      </Container>
      <div className='responsiveDisable'>
        <Offcanvas show={show} onHide={handleClose} responsive="lg">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <SideNavTitle />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <hr />
            <SideNav />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className='d-flex'>
        <Sidemenu />
        <div className='Router MobileDisable'>
          <AddNewReminders/>
        </div>
      </div>
    </>
  )
}

export default Main

