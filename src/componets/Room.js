import React from "react";
import css from "../CSS/mainPage.module.css";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { UserContext } from "./UserContext";
import { useContext } from "react";
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
const Room = ({
  owner,
  title = "title",
  topic = "none",
  participants = 0,
  id,
}) => {
  const {theme} = useContext(UserContext);

  return (
    <div style={{backgroundColor:theme.primary}} className={css.room}>
      <div className={css.roomHeadr}>
        <div
          onClick={(el) => {
            window.location.href = "/profile/" + owner.id;
          }}
          className={css.userTag}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              style={{ outline: "1px solid aqua" }}
              alt="Remy Sharp"
              src={owner.profile.image}
            />
          </StyledBadge>
          <div
            style={{
              fontSize: "0.8rem",
              color: theme.fonts,
              marginLeft: "0.5rem",
              fontWeight: "bold",
            }}
          >
            @{owner.username}
          </div>
        </div>
      </div>
      <div
      style={{color:theme.text}}
        onClick={(el) => {
          window.location.href = `/group/${id}`;
        }}
        className={css.roomBody}
      >
        {title}
      </div>
      <div
        onClick={(el) => {
          window.location.href = `/group/${id}`;
        }}
        className={css.roomBottom}
      >
        <div style={{color:theme.text}} className={css.peopleTag}>
          <PeopleAltIcon style={{ fontSize: "1.1rem", color: theme.fonts }} />{" "}
          <div className={css.pnumber}>{participants}</div>
          <div className={css.pnumber}>Joined</div>
        </div>
        <div className={css.topicTag}>#{topic}</div>
      </div>
    </div>
  );
};

export default Room;
