import MainPage from "./MainPage";
import css from "../CSS/mainPage.module.css";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { display } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import Room from "./Room";
import { useParams } from "react-router-dom";
function Profile() {
  const { id } = useParams();
  const [Groups, setGroups] = useState([]);
  const [thisUser, setThisUser] = useState({
    id: 0,
    profile: {
      image: "",
      age: "",
      bio: "",
      university_name: "",
    },
    email: "",
    username: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const url = "http://127.0.0.1:8000/group/owner/"+id;

    // Assuming you have a valid CSRF token named 'csrftoken'
    const token = localStorage.getItem("token");

    try {
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then(async (response) => {
          const data = response.data.groups;
          const updatedData = await Promise.all(
            data.map(async (group) => {
              const imageUrl = await getImageFile(group.owner.profile.image);
              group.owner.profile.image = imageUrl;
              return group;
            })
          );
          //   console.log(updatedData);
          const groupData = updatedData.map((group, index) => {
            return (
              <Room
                key={index}
                owner={group.owner}
                title={group.title}
                topic={group.topic}
                participants={group.participants.length}
                id={group.id}
              />
            );
          });
          setGroups(groupData);
        });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/user/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(async (response) => {
        let data = response.data.user;
        const imageUrl = await getImageFile(data.profile.image);
        data.profile.image = imageUrl;
        //   console.log(data);
        setThisUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MainPage>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "",
          overflowY: "scroll",
        }}
      >
        <div className={css.profileHeadr}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "45%",
              backgroundColor: "",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={thisUser.profile.image}
              sx={{ width: 90, height: 90 }}
            />
            <span style={{ color: "white", fontSize: "1.3rem" }}>
              {thisUser.first_name} {thisUser.last_name}
            </span>
            <span style={{ color: "aqua", fontWeight: "bold" }}>
              @{thisUser.username}
            </span>
          </div>
          <div
            style={{
              backgroundColor: "",
              height: "10%",
              width: "50%",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={0}>
              <SchoolIcon style={{ marginRight: "0.2rem" }} />
              <span>{thisUser.profile.university_name}</span>
            </Stack>
            <Stack direction="row" spacing={0}>
              <PermContactCalendarIcon style={{ marginRight: "0.2rem" }} />
              <span>{thisUser.profile.age} years old</span>
            </Stack>
          </div>
          <div
            style={{
              height: "30%",
              width: "90%",
            }}
          >
            <div
              style={{
                height: "20%",
                color: "gray",
                fontWeight: "bold",
                opacity: 0.8,
              }}
            >
              Bio:
            </div>
            <div
              style={{
                color: "white",
                height: "80%",
                width: "100%",
                overflow: "hidden",
              }}
            >
              {thisUser.profile.bio}
            </div>
          </div>
        </div>
        <span
          style={{
            height: "20%",
            color: "gray",
            fontWeight: "bold",
            opacity: 0.8,
          }}
        >
          Social groups hosted by badr almutairi :
        </span>
        {Groups}
      </div>
    </MainPage>
  );
}

export default Profile;
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
