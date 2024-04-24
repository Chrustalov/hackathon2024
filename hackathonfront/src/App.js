import './App.css';
import axios from "axios";
import Requests from './components/requests';
import { useEffect, useState } from 'react';

const API_URL = "http://localhost:3000/api/v1/requests"

function getAPIData( ) {
  return axios.get(API_URL).then((resp)=> resp.data)
}
function App() {
  const [requests, setRequests] = useState([]);

  useEffect(()=>{
    let mounted = true;
    getAPIData().then((items)=>{
      if(mounted){
        setRequests(items);
      }
    });
  return ()=> (mounted = false);
  },[]);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Requests requests={requests} />
    </div>
  );
}

export default App;
