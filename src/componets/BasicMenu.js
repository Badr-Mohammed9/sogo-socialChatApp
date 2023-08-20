import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function BasicMenu({ id, setTrigger }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const delAction = async () => {
    const url = `https://sogoapi.onrender.com/group/posts/${id}/`; // Replace with your API endpoint URL
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // Handle successful deletion
      console.log("Post deleted successfully");
      setAnchorEl(null);
      setTrigger(prevTrigger => !prevTrigger);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "0",
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ fontSize: "1rem", color: "#00ABB3" }}
      >
        ...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={delAction}>
          {" "}
          <DeleteIcon />
          <span>Delete</span>{" "}
        </MenuItem>
        <MenuItem onClick={handleClose}>more...</MenuItem>
      </Menu>
    </div>
  );
}
