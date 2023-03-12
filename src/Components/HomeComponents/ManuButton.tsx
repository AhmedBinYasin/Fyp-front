import React from 'react'
import { Button } from 'react-bootstrap'

function ManuButton({handleShow}:{handleShow:() => void}) {
  return (
    <Button variant="outline-dark" size="lg" className="d-lg-none" onClick={handleShow}>
          <i className="fa fa-bars" />
        </Button>
  )
}

export default ManuButton
