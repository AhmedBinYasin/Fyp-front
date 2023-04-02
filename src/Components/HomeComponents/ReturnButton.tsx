import React from 'react'
import { Button } from 'react-bootstrap'
import { IAdapter } from '../types'

function ReturnButton({Adapter}:{Adapter:IAdapter}) {
  return (
    <Button variant="outline-dark height15rem" size="lg" style={{height: '5vh',width:'5vh',marginLeft:"2vh"}} className="" onClick={()=>{Adapter.Return()}}>
          <i className="fa fa-arrow-left" />
        </Button>
  )
}

export default ReturnButton
