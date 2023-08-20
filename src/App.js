import Container from "./componets/Container";
import "./App.css";
import Headr from "./componets/Headr";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./componets/MainPage";
import Signup from "./componets/Signup";
import { useEffect, useState } from "react";
import { UserContext } from "./componets/UserContext";
import LoginPage from "./componets/LoginPage";
import GroupChat from "./componets/GroupChat";
import axios from "axios";
import SocialGroups from "./componets/SocialGroups";
import Profile from "./componets/Profile";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState({});
  const [mode, setMode] = useState("dark");
  const [userData, setUsetData] = useState({
    profile: {
      image: "",
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("https://sogoapi.onrender.com/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(async (response) => {
          let data = response.data;
          const imageUrl = await getImageFile(data.profile.image);
          data.profile.image = imageUrl;
          setUsetData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const modeChosen = localStorage.getItem("modeChosen");
    const dark = {
      primary: "#181818",
      secondry: "#272829",
      fonts: "#00ABB3",
      text: "white",
    };

    if (!modeChosen) {
      localStorage.setItem("modeChosen", "dark");
      setTheme(dark);
    } else {
      if (modeChosen === "dark") {
        setTheme(dark);
      } else {
        setTheme({
          primary: "white",
          secondry: "#F6F1F1",
          fonts: "#00ABB3",
          text: "black",
        });
      }
    }
  }, [mode]);
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ userData: userData, theme: theme,setTheme:setTheme, setMode: setMode }}
      >
        <Routes>
          <Route path="/" exact Component={SocialGroups} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/group/:id" Component={GroupChat} />
          <Route path="/profile/:id" Component={Profile} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

const getImageFile = (filename) => {
  const newFilePath = filename.replace("/images/", "");
  const url = `https://sogoapi.onrender.com/group/image/${newFilePath}/`;
  const token = localStorage.getItem("token");

  return axios({
    url: url,
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob", // Specify that the response should be treated as a binary blob
  })
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
