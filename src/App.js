import Container from "./componets/Container";
import "./App.css";
import Headr from "./componets/Headr";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./componets/MainPage";
import Signup from "./componets/Signup";
import { useEffect, useState } from "react";
import { UserContext } from "./componets/UserContext";
import LoginPage from "./componets/LoginPage";

function App() {
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={{}}>
        <Routes>
          <Route path="/" exact Component={MainPage} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={LoginPage} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
