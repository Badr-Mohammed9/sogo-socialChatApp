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

function App() {
  const [userData, setUsetData] = useState({
    profile: {
      image: "",
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://127.0.0.1:8000/user/", {
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

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData: userData }}>
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
  const url = `http://127.0.0.1:8000/group/image/${newFilePath}/`;
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
