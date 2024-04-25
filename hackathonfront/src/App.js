import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import Requests from './components/requests';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';


const API_URL = "http://localhost:3000/api/v1/requests"

function getAPIData( ) {
  return axios.get(API_URL).then((resp)=> resp.data)
}
function App() {
  const [requests, setRequests] = useState([]);

  // useEffect(()=>{
  //   let mounted = true;
  //   getAPIData().then((items)=>{
  //     if(mounted){
  //       setRequests(items);
  //     }
  //   });
  // return ()=> (mounted = false);
  // },[]);

  return (
    <>
      <Header />
      <h1>Hello</h1>
      <Home />
    </>
  );
}

export default App;
