import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import css from "../CSS/groupChat.module.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function Particpants({ group, inGroup, trigger }) {
  const [arrOfParticpants, setArrOfParticptns] = useState([]);

  useEffect(() => {
    if (group.participants) {
      const participants = group.participants;

      const data = participants.map((participant, index) =>
        createProfile(participant, index)
      );
      setArrOfParticptns(data);
    }
    return () => {
        setArrOfParticptns([])
    }
  }, [group, inGroup, trigger]);

  function createProfile(user, index) {
    return (
      <div onClick={(el) => {
        window.location.href = "/profile/" + user.id;
      }} key={index} className={css.headrPost}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={user.profile.image} />
        </StyledBadge>
        <div style={{ marginLeft: "0.6rem" }}>
          <div style={{ color: "white" }}>
            {user.first_name} {user.last_name}
          </div>
          <div
            style={{
              color: "gray",
              fontSize: "80%",
            }}
          >
            @{user.username}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          color: "white",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Participants
      </div>
      {arrOfParticpants}
    </div>
  );
}

export default Particpants;
