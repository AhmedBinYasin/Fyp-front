import React from 'react';
import './App.css';
//import useLocalAuth from './Hooks/useLocalAuth';
import Main from './Main';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const { loginData, setData } = useLocalAuth()
  // if (!loginData || loginData.set === false) { return (<div className="App"> <Login setData={setData} /> </div>) }
  // else { return (<div className="App"> <Main /> </div>); }
  return (<div className="App"> <Main /> </div>);
}

export default App;
