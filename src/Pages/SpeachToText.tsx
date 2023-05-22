import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap'
import { defaultUrihere } from '../App';

function SpeachToText() {
    const [result, setText] = useState<string | undefined>();
    const [recording, setRecording] = useState<boolean>(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.addEventListener('dataavailable', (event) => { chunksRef.current.push(event.data); });
            mediaRecorderRef.current.addEventListener('stop', () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                chunksRef.current = [];
                sendAudioToServer(blob)
                mediaRecorderRef.current = null;
                console.log('first')
            });
            mediaRecorderRef.current.start();
            setRecording(true);
        })
            .catch((error) => { console.error('Error accessing microphone:', error); });
    }
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log(audioBlob)
            setRecording(false);
        }
    }
    const sendAudioToServer = async (blob: Blob) => {
        try {
          const formData = new FormData();
          formData.append('file', blob);
          const response = await axios.post('http://'+defaultUrihere+':5000/api/speachtotext/toText', formData, { headers: { 'Content-Type': 'multipart/form-data' }, });
          if(response.data.status){setText(response.data.transcription)}
        } catch (error) {
          console.error('Error sending audio to server:', error);
        }
      }

    return (
        <>
            <div>
                <Container>
                    <div className='d-flex gap-2 align-items-center'><h3 className='text-white-50'>Speach to Text </h3></div>
                </Container>
                <Container className='MainSetings'>
                    <h3 className='text-white-50' style={{ textAlign: 'center' }}>Tap to record</h3>
                    <div className='row' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} onMouseDown={startRecording} onMouseUp={stopRecording} >
                        <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '30.33%', marginLeft: '1.5%', marginRight: '1.5%' }} >
                            <div className='row'>
                                <i className="fa fa-microphone audioButton" style={{ fontSize: '7em', textAlign: 'center' }} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </Container>
                {audioBlob && (
                    <Container className='MainSetings MobileDisable'>
                        <div className='row' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                            <div className='Border FontStyle1  myCard offset18' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '30.33%', marginLeft: '1.5%', marginRight: '1.5%' }} >
                                <audio src={URL.createObjectURL(audioBlob)} controls />
                            </div>
                        </div>
                    </Container>
                )}
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
