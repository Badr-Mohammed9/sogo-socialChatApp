import css from "../CSS/groupChat.module.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { UserContext } from "./UserContext";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function GroupPofilePart({ group, inGroup, setInGroup, trigger, setTrigger }) {
  const { userData,theme } = useContext(UserContext);
  //   const [inGroup,setInGroup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(
    (el) => {
      let participants = group.participants;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === userData.id) {
          setInGroup((el) => true);
        }
      }
    },
    [group]
  );

  return (
    <div style={{backgroundColor:theme.primary}} className={css.profilePart}>
      <div
        style={{
          color: "#00ABB3",
          fontWeight: "bold",
          margin: "0 0 0.5rem 0",
          fontSize: "110%",
        }}
      >
        #SoftwareDevolpment
      </div>
      <span
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "80%",
          opacity: "0.7",
        }}
      >
        Hosted by
      </span>
      <div
        onClick={(el) => {
          window.location.href = "/profile/" + group.owner.id;
        }}
        className={css.profileRow}
      >
        <Avatar
          alt="Remy Sharp"
          src={group.owner.profile.image}
          sx={{ width: 50, height: 50 }}
        />
        <div style={{ marginLeft: "0.6rem" }}>
          <div style={{ color: theme.text }}>
            {group.owner.first_name} {group.owner.last_name}
          </div>
          <div
            style={{
              color: "gray",
              fontSize: "80%",
            }}
          >
            @{group.owner.username}
          </div>
        </div>
      </div>
      <hr />
      <div className={css.infoBar}>
        <div className={css.info}>
          <SchoolOutlinedIcon style={{color:theme.fonts}}/>
          <span style={{ marginLeft: "0.6rem",color:theme.text }}>
            {group.owner.profile.university_name}
          </span>
        </div>
        <div className={css.info}>
          <EmailOutlinedIcon style={{color:theme.fonts}}/>
          <span style={{ marginLeft: "0.6rem",color:theme.text }}>{group.owner.email}</span>
        </div>
      </div>
      <hr />
      <div className={css.groupInfo}>
        <div>
          <span
            style={{
              color: "gray",
              fontSize: "80%",
            }}
          >
            Group title
          </span>
          <div
            style={{
              fontWeight: "bold",
              color: theme.text,
              margin: "0.5rem 0",
            }}
          >
            {group.title}
          </div>
        </div>
        <div style={{ color: theme.text }}>
          {" "}
          <span>particpants</span>: {group.participants.length} (users)
        </div>
        <Button
          disabled={inGroup}
          onClick={(el) => {
            addParticipant(group.id, userData.id);
            setInGroup(true);
            setTrigger((el) => !el);
          }}
          style={{ backgroundColor: theme.fonts }}
          variant="contained"
        >
          Join group
        </Button>
      </div>
      {/* <Button style={{
        position:'absolute',
        right:'0',
        color:'gray',
      }} href="#text-buttons">Hide</Button> */}
    </div>
  );
}

export default GroupPofilePart;

const addParticipant = (groupId, userId) => {
  const url = `https://sogoapi.onrender.com/group/${groupId}/add-participant/`; // Replace with your API endpoint URL
  const token = localStorage.getItem("token");

  const requestData = {
    user_id: userId,
  };

  return axios
    .post(url, requestData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      // Handle successful addition
      console.log("User added to the group participants");
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
};
