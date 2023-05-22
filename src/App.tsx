import React, { useState } from 'react';
import './App.css';
import useLocalAuth from './Hooks/useLocalAuth';
import Main from './Main';
import '../src/styles/main.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';

export const defaultUrihere:string='192.168.39.55';

function App() {
  const [ loginData, set ] = useState()
  function setData(state:any){ set(state); }
  if (!loginData) { return (<div className="App"> <Login setData={setData} /> </div>) }
  else { return (<div className="App"> <Main /> </div>); }
}

export default App;
