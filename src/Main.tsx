import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useCustomRouter from './Hooks/useCustomRouter'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/esm/Row';
import SideNav from './Components/SideNavContents';
import SideNavTitle from './Components/SideNavTitle';
import ManuButton from './Components/HomeComponents/ManuButton';

function Main() {

  const { Router, Adapter } = useCustomRouter()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid='md' className='pt-3'>
        <ManuButton handleShow={handleShow} />
      </Container>
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
    </>
  )
}

export default Main

