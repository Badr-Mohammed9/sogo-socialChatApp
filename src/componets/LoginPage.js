import React from "react";
import Container from "./Container";
import css from "../CSS/signup.module.css";
import Button from "@mui/material/Button";
import axios from "axios";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { prettyFormat } from "@testing-library/react";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  width: "50%",
  color: "white",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#00ABB3",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
function LoginPage() {
  const [profileForm, setProfileForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [page, setPage] = useState("1");
  const [userId, setUserID] = useState(0);

  const handleChange = (event) => {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <div className={css.body}>
        <div style={{ height: "40%" }} className={css.signup}>
          <form
            className={css.form}
            onSubmit={async (el) => {
                el.preventDefault()
                const data = {
                    username: profileForm.username,
                    password: profileForm.password,
                  };
                  // Send the POST request to the Django API endpoint
                  axios
                    .post("http://127.0.0.1:8000/login/", data)
                    .then((response) => {
                      console.log(response.data);
                      localStorage.setItem('token', response.data.token);
                      window.location.href = '/';
                    })
                    .catch((error) => {
                        console.log('here error');
                      console.error(error);
                      setError('user or password is not correct')
                    });
            }}
          >
            <h1 style={{ color: "white" }}>Login</h1>
            <TextField
              name="username"
              onChange={handleChange}
              style={{ width: "90%" }}
              placeholder="username"
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
                  "& input": {
                    color: "white",
                  },
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
            <TextField
              name="password"
              onChange={handleChange}
              type="password"
              style={{ width: "90%" }}
              placeholder="password"
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
                  "& input": {
                    color: "white",
                  },
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

            <div className={css.error}>{error}</div>
            <BootstrapButton variant="contained" disableRipple type="submit">
              Login
            </BootstrapButton>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
