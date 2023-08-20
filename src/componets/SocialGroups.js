import Container from "./Container";
import React, { useEffect, useState } from "react";
import css from "../CSS/mainPage.module.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Room from "./Room";
import axios from "axios";
import MainPage from "./MainPage";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function SocialGroups() {
  const [Groups, setGroups] = useState([]);
  const { theme } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "title",
    topic: "Cybersecurity",
  });
  const [formState, setFormState] = useState("none");
  function buttonType() {
    if (formState) {
      return (
        <Button
          style={{ backgroundColor: theme.fonts }}
          startIcon={<AddIcon />}
          variant="contained"
          onClick={(el) => {
            setFormState("");
          }}
        >
          Create Group
        </Button>
      );
    } else {
      return (
        <Button
          style={{ backgroundColor: "#C70039" }}
          startIcon={<CancelIcon />}
          variant="contained"
          onClick={(el) => {
            setFormState("none");
          }}
        >
          Cancel
        </Button>
      );
    }
  }

  useEffect(() => {
    const url = "https://sogoapi.onrender.com/group/";

    // Assuming you have a valid CSRF token named 'csrftoken'
    const token = localStorage.getItem("token");
    if (token) {
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
            console.log(updatedData);
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
    } else {
      window.location.href = "/login";
    }
  }, [formState]);
  return (
    <MainPage setGroups={setGroups}>
      <div style={{ backgroundColor: theme.primary }} className={css.headr}>
        <div>
          <div
            style={{
              color: theme.text,
              fontWeight: "bold",
              fontSize: "1rem",
              marginBottom: "0.2rem",
            }}
          >
            Social Groups
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "gray",
              opacity: "0.7",
            }}
          >
            {Groups.length} Groups availble
          </div>
        </div>
        {buttonType()}
      </div>
      <div
        style={{ display: formState, backgroundColor: theme.primary }}
        className={css.createDiv}
      >
        <form
          className={css.createForm}
          onSubmit={async (el) => {
            el.preventDefault();
            const url = "https://sogoapi.onrender.com/group/create/";

            // Assuming you have a valid CSRF token named 'csrftoken'
            const token = localStorage.getItem("token");

            try {
              const response = await axios.post(url, formData, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`,
                },
              });
              console.log("Group created successfully");
              setFormState("none");
            } catch (error) {
              console.error("Error:", error.response.data);
            }
          }}
        >
          <TextField
            name="title"
            onChange={(el) => {
              setFormData({ ...formData, title: el.target.value });
            }}
            label="Group Title"
            placeholder="Group Title"
            sx={{
              textTransform: "uppercase",
            }}
            FormHelperTextProps={{
              classes: {
                root: css["helper-text"],
              },
            }}
            InputProps={{
              sx: {
                color: theme.text,
              },
              classes: {
                notchedOutline: css["input-border"],
              },
            }}
            InputLabelProps={{
              classes: {
                root: css.inputLabel,
                focused: css.inputLabel,
              },
            }}
          />
          <label
            style={{ color: theme.text }}
            className={css.labelStyle}
            htmlFor="topic"
          >
            Select a topic:
          </label>
          <select
            style={{ backgroundColor: theme.primary }}
            onChange={(el) => {
              setFormData({ ...formData, topic: el.target.value });
            }}
            defaultValue="Cybersecurity"
            className={css.selectStyle}
            id="topic"
            name="topic"
          >
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="CloudComputing">Cloud Computing</option>
            <option value="SoftwareDevelopment">Software Development</option>
            <option value="DataManagement">Data Management</option>
            <option value="NetworkAdministration">
              Network Administration
            </option>
            <option value="ITCareerAdvice">IT Career Advice</option>
            <option value="EmergingTechnologies">Emerging Technologies</option>
          </select>
          <Button
            style={{ backgroundColor: "#00ABB3" }}
            startIcon={<AddIcon />}
            variant="contained"
            type="submit"
          >
            Create Group
          </Button>
        </form>
      </div>
      <div className={css.rooms}>{Groups ? Groups : <CircularProgress />}</div>
    </MainPage>
  );
}

export default SocialGroups;

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
