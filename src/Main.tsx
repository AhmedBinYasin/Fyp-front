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
import { socket } from './socketIO';
import { PushAlert } from './Pages/PushAlert';
import { IAdapter } from './Components/types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import EditReminders from './Pages/EditReminders';
import ReAddReminders from './Pages/ReAddReminders';

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
          {Router.active === 'Speach To Text' && (<></>)}
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
            <SideNav Router={Router} Adapter={Adapter} />
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
          {Router.active === 'Speach To Text' && (<></>)}
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

  const [notifications, setMessage] = useState<{ Date: Date; Message: string; }>();
  const AccNotification = () => setMessage(undefined);

  useEffect(() => {
    socket.on('ActivateReminderResponse', (data: { UserName: string; Date: Date; Message: string; }) => {
      if (data.UserName === 'Ahmed')
        setMessage({ Date: new Date(data.Date), Message: data.Message });
        handleShowAlarm()
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
            PaperProps={{sx:{position:'fixed',top:10}}}
            onClose={handleCloseAlarm}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Reminder Alarm"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              <p> {"" + notifications.Date?.toDateString() + ', ' + notifications.Date?.toTimeString().substring(0, 5) + '\n' + notifications.Message} </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAlarm}>Disagree</Button>
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

