import css from "../CSS/groupChat.module.css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import RemoveIcon from "@mui/icons-material/Remove";
import BasicMenu from "./BasicMenu";
import { UserContext } from "./UserContext";
import { useContext } from "react";

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

function Post({
  id = 0,
  setTrigger,
  image = "",
  text = "",
  owner = {
    first_name: "",
    last_name: "",
    username: "",
    id: 0,
  },
}) {
  const { userData,theme } = useContext(UserContext);

  function delIcon() {
    if (userData.id === owner.id) {
      return <BasicMenu id={id} setTrigger={setTrigger} />;
    }
  }
  return (
    <div style={{backgroundColor:theme.primary}} className={css.post}>
      <div className={css.headrPost}>
        {delIcon()}
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={owner.profile.image} />
        </StyledBadge>
        <div
          onClick={(el) => {
            window.location.href = "/profile/" + owner.id;
          }}
          style={{ marginLeft: "0.6rem" }}
        >
          <div style={{ color: theme.text }}>
            {owner.first_name} {owner.last_name}
          </div>
          <div
            style={{
              color: "gray",
              fontSize: "80%",
            }}
          >
            @{owner.username}
          </div>
        </div>
      </div>
      {image && (
        <div
          style={{
            display: "",
            backgroundImage: `url('${image}')`,
          }}
          className={css.imagePost}
        >
          {/* <img src="https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.jpg" className={css.img} alt="post-img"/> */}
        </div>
      )}
      <div style={{color:theme.text}} className={css.bodyPost}>{text}</div>
    </div>
  );
}

export default Post;
