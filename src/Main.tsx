import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import useCustomRouter, { IRouter } from './Hooks/useCustomRouter'
import Offcanvas from 'react-bootstrap/Offcanvas';
import SideNav from './Components/SideNavContents';
import SideNavTitle from './Components/SideNavTitle';
import ManuButton from './Components/HomeComponents/ManuButton';
import Sidemenu from './Components/Sidemenu';
import Home from './Pages/Home';
import Reminders from './Pages/Reminders';
import AddNewReminders from './Pages/AddNewReminders';
import ReturnButton from './Components/HomeComponents/ReturnButton';
import RemindersHistory from './Pages/RemindersHistory';
import { io } from "socket.io-client";
import { PushAlert } from './Pages/PushAlert';
import { IAdapter } from './Components/types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import EditReminders from './Pages/EditReminders';
import ReAddReminders from './Pages/ReAddReminders';
import Connections from './Pages/Connections';
import SpeachToText from './Pages/SpeachToText';
import { AdminLogs} from './Pages/Logs';
import About from './Pages/About';
import { NodeAlert } from './Pages/NodeAlert';
import { AlertHistory } from './Pages/Logs copy';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function AppView({ Router, Adapter, handleShow, handleClose, show }: { Router: IRouter, Adapter: IAdapter, handleShow: () => void, handleClose: () => void, show: boolean }) {
  return (
    <>
      <Container fluid='md' className='pt-3 responsiveDisable MobileRouter'>
        <ManuButton handleShow={handleShow} />
        {Router.active !== 'Home' && (<ReturnButton Adapter={Adapter} />)}
        <div className='MobileView'>
          {Router.active === 'Home' && (<Home Adapter={Adapter} />)}
          {Router.active === 'Reminders' && (<Reminders Adapter={Adapter} />)}
          {Router.active === 'AddNewReminders' && (<AddNewReminders Adapter={Adapter} />)}
          {Router.active === 'RemindersHistory' && (<RemindersHistory Adapter={Adapter} />)}
          {Router.active === 'EditReminder' && (<EditReminders Adapter={Adapter} />)}
          {Router.active === 'ReAddReminder' && (<ReAddReminders Adapter={Adapter} />)}
          {Router.active === 'Speach To Text' && (<SpeachToText />)}
          {Router.active === 'Connections' && (<Connections />)}
          {Router.active === 'AdminLogs' && (<AdminLogs />)}
          {Router.active === 'History' && (<AlertHistory />)}
          {Router.active === 'About' && (<About />)}
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
            <SideNav Router={Router} Adapter={Adapter} handleClose={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className='d-flex'>
        <Sidemenu Router={Router} Adapter={Adapter} />
        <div className='Router MobileDisable'>
          {Router.active === 'Home' && (<Home Adapter={Adapter} />)}
          {Router.active === 'Reminders' && (<Reminders Adapter={Adapter} />)}
          {Router.active === 'AddNewReminders' && (<AddNewReminders Adapter={Adapter} />)}
          {Router.active === 'RemindersHistory' && (<RemindersHistory Adapter={Adapter} />)}
          {Router.active === 'EditReminder' && (<EditReminders Adapter={Adapter} />)}
          {Router.active === 'ReAddReminder' && (<ReAddReminders Adapter={Adapter} />)}
          {Router.active === 'Speach To Text' && (<SpeachToText />)}
          {Router.active === 'Connections' && (<Connections />)}
          {Router.active === 'AdminLogs' && (<AdminLogs />)}
          {Router.active === 'History' && (<AlertHistory />)}
          {Router.active === 'About' && (<About />)}
        </div>
      </div>
    </>
  )
}

function Main() {

  const { Router, Adapter } = useCustomRouter()
  const [show, setShow] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAlarm = () => setShowAlarm(false);
  const handleShowAlarm = () => setShowAlarm(true);
  const handlenodeShowAlarm = () => setShowAlarm(true);

  const [notifications, setMessage] = useState<{ Date: Date; Message: string; }>();
  const AccNotification = () => setMessage(undefined);
  const [nodenotifications, setnodeMessage] = useState<{ Content: string; Location: string | undefined; }>();
  const nodeAccNotification = () => setnodeMessage(undefined);



  useEffect(() => {
    const socket = io("ws://192.168.72.101:5000", {
      reconnectionDelayMax: 10000,
      auth: {
        token: "123"
      },
      query: {
        "my-key": "my-value"
      }
    });
    socket.on("ActivateReminderResponse", (data: { UserName: string; Date: Date; Message: string; }) => {
      console.log('here', data)
      window.postMessage({ type: 'newMessage', content: "" + new Date(data.Date).toDateString() + ', ' + new Date(data.Date).toTimeString().substring(0, 5)+" "+data.Message },'http://192.168.72.101:3000');
      setMessage({ Date: new Date(data.Date), Message: data.Message });
      handleShowAlarm()
    });
    socket.on("ActivateAlert", (data: { Content: string; Location: string | undefined; }) => {
      window.postMessage({ type: 'newMessage', content: "" + data.Content + ', at Location ' + data.Location },'http://192.168.72.101:3000');
      console.log('here', data)
      setnodeMessage({ Content: data.Content, Location: data.Location });
      handlenodeShowAlarm()
    });
  }, []);

  if (notifications) {
    if (window.innerWidth < 990) {
      return (
        <Container fluid='md' className='pt-3 responsiveDisable MobileRouter'>
          <div className='MobileView'>
            <PushAlert notifications={notifications} Adapter={Adapter} AccNotification={AccNotification} />
          </div>
        </Container>
      )
    }
    else {
      return (
        <>
          <AppView Router={Router} Adapter={Adapter} handleClose={handleClose} handleShow={handleShow} show={show} />
          <Dialog
            open={showAlarm}
            hideBackdrop
            TransitionComponent={Transition}
            keepMounted
            PaperProps={{ sx: { position: 'fixed', top: 10 } }}
            onClose={handleCloseAlarm}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Reminder Alarm"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <p> {"" + notifications.Date?.toDateString() + ', ' + notifications.Date?.toTimeString().substring(0, 5)} </p>
                <p>{notifications.Message}</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAlarm}>OK</Button>
            </DialogActions>
          </Dialog>
        </>
      )
    }

  }
  else if(nodenotifications){
    if (window.innerWidth < 990) {
      return (
        <Container fluid='md' className='pt-3 responsiveDisable MobileRouter'>
          <div className='MobileView'>
            <NodeAlert notifications={nodenotifications} Adapter={Adapter} AccNotification={nodeAccNotification} />
          </div>
        </Container>
      )
    }
    else {
      return (
        <>
          <AppView Router={Router} Adapter={Adapter} handleClose={handleClose} handleShow={handleShow} show={show} />
          <Dialog
            open={showAlarm}
            hideBackdrop
            TransitionComponent={Transition}
            keepMounted
            PaperProps={{ sx: { position: 'fixed', top: 10 } }}
            onClose={handleCloseAlarm}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Reminder Alarm"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <p> {"" + nodenotifications.Content + ', at Location ' + nodenotifications.Location} </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAlarm}>OK</Button>
            </DialogActions>
          </Dialog>
        </>
      )
    }
  }
  else {
    return (
      <AppView Router={Router} Adapter={Adapter} handleClose={handleClose} handleShow={handleShow} show={show} />
    )

  }
}

export default Main

