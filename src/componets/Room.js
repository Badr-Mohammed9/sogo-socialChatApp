import React from "react";
import css from "../CSS/mainPage.module.css";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { styled } from "@mui/material/styles";
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
const Room = () => {
  return (
    <div className={css.room}>
      <div className={css.roomHeadr}>
        <div className={css.userTag}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              style={{ outline: "1px solid aqua" }}
              alt="Remy Sharp"
              src="https://i1.sndcdn.com/avatars-HqKil0QNnVTUYizD-9a0wkA-t500x500.jpg"
            />
          </StyledBadge>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#00ABB3",
              marginLeft: "0.5rem",
              fontWeight: "bold",
            }}
          >
            @maxdbroly
          </div>
        </div>
      </div>
      <div className={css.roomBody}>
        JavaScript is by fat the best programing language ever!
      </div>
      <div className={css.roomBottom}>
        <div className={css.peopleTag}>
          <PeopleAltIcon style={{ fontSize: "1.1rem", color: "#00ABB3" }} />{" "}
          <div>5</div>
          <div>Joined</div>
        </div>
        <div className={css.topicTag}>#Cybersecurity</div>
      </div>
    </div>
  );
};

export default Room;
