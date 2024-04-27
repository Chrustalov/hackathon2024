import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Request from "./pages/Requests/Request";
import Footer from "./components/Footer";
import Login from "./pages/Login";

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
  const loginPage = useMemo(() => <Login />, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/request"} element={<Request />} />
        <Route path={"/profile"} element={<Profile />}>
          <Route path={"/profile/:id"} element={<Profile />} />
        </Route>
        <Route path={"/signin"} element={loginPage} />
        <Route path={"/signup"} element={loginPage} />
      </Routes>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
