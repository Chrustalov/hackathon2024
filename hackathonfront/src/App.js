import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Requests from "./components/requests";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Request from "./pages/Requests/Request";
import Footer from "./components/Footer";

const API_URL = "http://localhost:3000/api/v1/requests";

function getAPIData() {
  return axios.get(API_URL).then((resp) => resp.data);
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/request"} element={<Request />} />
        <Route path={"profile"} element={<div>Profile</div>} />
        <Route path={"login"} element={<div>Login</div>} />
        <Route path={"signin"} element={<div>Signin</div>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
