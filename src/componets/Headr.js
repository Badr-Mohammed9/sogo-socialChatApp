import css from "../CSS/headr.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState,useEffect } from "react";

function Headr() {
  const [userToken, setUserToken] = useState("");
  //set token for user
  useEffect((el) => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  });

  function getButtons() {
    if (!userToken) {
      return (
        <div className={css.btns}>
          <Button
          href="/login"
            style={{ color: "#19A7CE", fontWeight: "bold" }}
            variant="text"
          >
            Login
          </Button>

          <Button
            href="/signup"
            style={{
              backgroundColor: "#19A7CE",
              color: "white",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Signup
          </Button>
        </div>
      );
    } else {
      return (
        <div className={css.btns}>
          <Button
            variant="outlined"
            color="error"
            onClick={(el) => {
              // Remove token from local storage
              localStorage.removeItem("token");
              setUserToken('')
            }}
          >
            logout
          </Button>
        </div>
      );
    }
  }
  return (
    <div className={css.container}>
      <div className={css.headr}>
        <div onClick={el => window.location.href='/'} className={css.logo}>SogoChat</div>
        <div className={css.searchBar}>
          <TextField
            color=""
            className={css.textFeild}
            id="input-with-icon-textfield"
            label=""
            style={{ color: "white" }}
            placeholder="Search for posts"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: {
                color: "white",
                fontWeight: "bold",
                //    opacity:'0.7'
              },
            }}
            variant="standard"
          />
        </div>
        {getButtons()}
        {/* <div className={css.btns}>
          <Button
            style={{ color: "#19A7CE", fontWeight: "bold" }}
            variant="text"
          >
            Login
          </Button>

          <Button
            href="/signup"
            style={{
              backgroundColor: "#19A7CE",
              color: "white",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Signup
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default Headr;
