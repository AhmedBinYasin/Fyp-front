import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

function SpeachToText() {
    const [result, set] = useState<string | undefined>('abc');
    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Speach to Text </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50' style={{ textAlign: 'center' }}>Tap to record</h3>
                    <div className='row' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '30.33%', marginLeft: '1.5%', marginRight: '1.5%' }} >
                            <div className='row'>
                                <i className="fa fa-microphone" style={{ fontSize: '7em', textAlign: 'center' }} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </Container>
                {(result) && (
                    <Container className='MainSetings'>
                        <h3 className='text-white-50' style={{ textAlign: 'center' }}>Text Output</h3>
                        <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                            <div className="form-group" style={{ width: '100%' }}>
                                <textarea className="form-control" style={{ fontSize: '2em' }} value={result} rows={10}></textarea>
                            </div>
                        </div>
                    </Container>
                )}
            </div>
        </>
    )
}

export default SpeachToText
