import React from "react";
import Container from "./Container";
import css from "../CSS/signup.module.css";
import Button from "@mui/material/Button";
import axios from "axios";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
function Signup() {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [profileForm, setProfileForm] = useState({
    image: null,
    age: "",
    university_name: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [page, setPage] = useState("1");
  const [userId, setUserID] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://sogoapi.onrender.com/signup/", formState)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setUserID(response.data.user.id);
        setPage("2");
        // handle successful registration here
      })
      .catch((error) => {
        let result = error.response.data;
        if (result["username"]) {
          setError(result.username[0]);
        }
      });
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  function getForm() {
    if (page === "1") {
      return (
        <form className={css.form} onSubmit={handleSubmit}>
          <h1 style={{ color: "white" }}>sign up</h1>
          <TextField
            required
            name="first_name"
            onChange={handleChange}
            style={{ width: "90%" }}
            placeholder="first name"
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
            required
            name="last_name"
            onChange={handleChange}
            style={{ width: "90%" }}
            placeholder="last name"
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
            required
            name="username"
            onChange={handleChange}
            style={{ width: "90%" }}
            placeholder="user-name"
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
            required
            name="email"
            onChange={handleChange}
            style={{ width: "90%" }}
            placeholder="email"
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
            required
            name="password1"
            type="password"
            onChange={handleChange}
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
          <TextField
            required
            name="password2"
            type="password"
            onChange={handleChange}
            style={{ width: "90%" }}
            placeholder="password again"
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
            Register
          </BootstrapButton>
          <div>
            already have an Account? <Link to={"/login"}>Login</Link>{" "}
          </div>
        </form>
      );
    } else if (page === "2") {
      return (
        <form
          className={css.form}
          onSubmit={async (el) => {
            el.preventDefault();
            const token = localStorage.getItem("token");
            const form = new FormData();
            form.append("user", userId);
            form.append("image", profileForm.image);
            form.append("age", profileForm.age);
            form.append("university_name", profileForm.university_name);
            form.append("bio", profileForm.bio);

            try {
              const response = await axios.post(
                "https://sogoapi.onrender.com/create_user/",
                form,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token ${token}`,
                  },
                }
              );

              console.log(response.data);
              window.location.href = "/";
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <h1 style={{ color: "white" }}>sign up</h1>
          <TextField
            required
            name="university_name"
            value={profileForm["university_name"]}
            onChange={(el) => {
              setProfileForm({
                ...profileForm,
                university_name: el.target.value,
              });
            }}
            style={{ width: "90%" }}
            placeholder="university name"
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
            required
            name="age"
            onChange={(el) => {
              setProfileForm({ ...profileForm, age: el.target.value });
            }}
            value={profileForm["age"]}
            style={{ width: "90%" }}
            placeholder="age"
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
            required
            name="bio"
            label="bio"
            // multiline
            // rows={3}
            onChange={(el) => {
              setProfileForm({ ...profileForm, bio: el.target.value });
            }}
            value={profileForm["bio"]}
            style={{ width: "90%" }}
            placeholder=""
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
          <div style={{ width: "80%" }}>
            <span style={{ marginRight: "0.2rem" }}>Image:</span>
            <input
              required
              onChange={(el) => {
                setProfileForm({ ...profileForm, image: el.target.files[0] });
              }}
              type="file"
              accept="image/jpeg, image/png"
            />{" "}
          </div>
          <div className={css.error}>{error}</div>
          <BootstrapButton variant="contained" disableRipple type="submit">
            Register
          </BootstrapButton>
        </form>
      );
    }
  }
  return (
    <Container>
      <div className={css.body}>
        <div className={css.signup}>{getForm()}</div>
      </div>
    </Container>
  );
}

export default Signup;
