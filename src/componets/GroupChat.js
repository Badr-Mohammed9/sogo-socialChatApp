import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import axios from "axios";
import css from "../CSS/groupChat.module.css";
import TextField from "@mui/material/TextField";
import { UserContext } from "./UserContext";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { VoiceChatOutlined } from "@mui/icons-material";
import MyDropzone from "./MyDropzone";
import Post from "./Post";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PostArea from "./PostArea";
import GroupPofilePart from "./GroupPofilePart";
import Particpants from "./Particpants";
function GroupChat() {
  const { userData, theme } = useContext(UserContext);
  const [inGroup, setInGroup] = useState(false);
  const [triggerPostArea, setTriggerPostArea] = useState(false);
  const [imageZone, setImageZone] = useState("none");
  const [group, setGroup] = useState({
    owner: {
      id: 0,
      profile: {
        image: "",
        age: "",
        bio: "",
        university_name: "",
      },
      email: "",
      username: "",
      first_name: "",
      last_name: "",
    },
    id: 0,
    title: "",
    topic: "",
    participants: 0,
  });
  const { id } = useParams();

  const [open, setOpen] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    (el) => {
      const token = localStorage.getItem("token");
      axios
        .get(`https://sogoapi.onrender.com/group/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(async (response) => {
          let groupData = response.data.group;
          const imageUrl = await getImageFile(groupData.owner.profile.image);
          groupData.owner.profile.image = imageUrl;
          if (groupData.participants) {
            for (let i = 0; i < groupData.participants.length; i++) {
              const blomImage = await getImageFile(
                groupData.participants[i].profile.image
              );
              groupData.participants[i].profile.image = blomImage;
            }
          }
          // console.log(groupData);
          setGroup(groupData);
        });
    },
    [id, triggerPostArea]
  );

  const [postData, setPostData] = useState({
    owner: userData.id,
    group: group.id,
    text: "",
    image: null,
  });

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setPostData({
        ...postData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("owner", postData.owner);
    formData.append("group", postData.group);
    formData.append("text", postData.text);

    // Check if image is null
    if (postData.image !== null) {
      formData.append("image", postData.image);
    }

    axios
      .post("https://sogoapi.onrender.com/group/post/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Handle successful response
        setPostData({
          owner: userData.id,
          group: group.id,
          text: "",
          image: null,
        });
        setTriggerPostArea(!triggerPostArea);
        setImageZone("none");
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setInGroup(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <div className={css.body}>
        <div className={css.parts}>
          {/* dialgo */}

          {/* dialgo end */}
          <GroupPofilePart
            trigger={triggerPostArea}
            setTrigger={setTriggerPostArea}
            group={group}
            inGroup={inGroup}
            setInGroup={setInGroup}
          />

          <div
            style={{ backgroundColor: theme.secondry }}
            className={css.charPart}
          >
            {/* <div
              style={{ backgroundColor: theme.primary }}
              className={css.groupInfo}
              onClick={handleClickOpen}
            >
              <span
                style={{
                  position: "relative",
                  top: "0.4rem",
                }}
              >
                {" "}
                Group info
              </span>
            </div> */}
            <div
              style={{ backgroundColor: theme.primary }}
              className={css.upperChat}
            >
              <Avatar
                alt="Remy Sharp"
                src={userData.profile.image}
                sx={{ width: 60, height: 60 }}
              />
              <TextField
                value={postData.text}
                onChange={(el) => {
                  setPostData({
                    ...postData,
                    text: el.target.value,
                    group: group.id,
                    owner: userData.id,
                  });
                }}
                id="outlined-basic"
                variant="standard"
                placeholder="write something here..."
                style={{
                  backgroundColor: theme.secondry,
                  marginLeft: "0.8rem",
                  borderRadius: "25px",
                  padding: "0.7rem",
                  width: "80%",
                }}
                InputProps={{
                  style: {
                    color: theme.text,
                  },
                  disableUnderline: true,
                }}
              />
            </div>
           
            <MyDropzone
              mode={imageZone}
              setPostData={setPostData}
              postData={postData}
            />

            <div
              style={{ backgroundColor: theme.primary }}
              className={css.tagsContainer}
            >
              <Button
                disabled={!inGroup}
                onClick={handleSubmit}
                style={{
                  position: "absolute",
                  right: "0",
                  backgroundColor: "#00ABB3",
                  borderRadius: "25px",
                  fontSize: "80%",
                  fontWeight: "bold",
                  marginRight: "0.6rem",
                }}
                variant="contained"
              >
                Post
              </Button>
              <div style={{ color: theme.text }} className={css.tags}>
                <div
                  onClick={(el) => {
                    if (imageZone) {
                      setImageZone("");
                    } else {
                      setImageZone("none");
                    }
                  }}
                  className={css.tag}
                >
                  <ImageIcon />
                  <span>Image</span>
                </div>

                <div className={css.tag}>
                  <GifBoxOutlinedIcon />
                  <span>Gif</span>
                </div>

                <div className={css.tag}>
                  <AttachFileOutlinedIcon />
                  <span>Attachment</span>
                </div>

                <div className={css.tag}>
                  <VoiceChatOutlined />
                  <span>Voice</span>
                </div>
              </div>
            </div>
            <PostArea
              group={group}
              trigger={triggerPostArea}
              setTrigger={setTriggerPostArea}
            />
          </div>
          <div
            style={{ backgroundColor: theme.primary }}
            className={css.particpantsPart}
          >
            <Particpants
              group={group}
              inGroup={inGroup}
              trigger={triggerPostArea}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

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

export default GroupChat;

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
