import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useMemo, useState, useCallback } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Request from "./pages/Requests/Request";
import Footer from "./components/Footer";
import RequestDetails from "./pages/Requests/RequestDetails";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
const API_URL = process.env.REACT_APP_API + "/api/v1/requests";

function getAPIData() {
  return axios.get(API_URL).then((resp) => resp.data);
}

export const UserContext = createContext(null);
function App() {
  const [user, setUser] = useState(null);
  const login = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login
  }), [user, login]);

  useEffect(() => {
    if(user){
      localStorage.setItem('appState', JSON.stringify(user));
    }
   
  }, [user]);

  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      login(JSON.parse(savedState));
    }
  }, []);

  const loginPage = useMemo(() => <Login />, []);

  return (
    <UserContext.Provider value={{contextValue}}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/profile"} element={<Profile />}>
            <Route path={"/profile/:id"} element={<Profile />} />
          </Route>
          <Route path={"/requests"} element={<Request />} />
          <Route path={"/profile"} element={<Profile />}>
            <Route path={"/profile/:id"} element={<Profile />} />
          </Route>
          <Route
            exact
            path={"/view-request-details/:id"}
            element={<RequestDetails />}
          />
          <Route path={"/signin"} element={loginPage} />
          <Route path={"/signup"} element={loginPage} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
