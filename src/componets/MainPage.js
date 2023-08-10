import Container from "./Container";
import React from "react";
import css from "../CSS/mainPage.module.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Room from "./Room";

function MainPage() {
  return (
    <Container>
      <div className={css.body}>
        <div className={css.hashtagPart}>
          <div
            style={{
              color: "white",
              opacity: 0.5,
              fontWeight: "bold",
            }}
          >
            BROWSE TOPICS
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#Cybersecurity</div>
            <div className={css.topicNumber}>3</div>
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#CloudComputing</div>
            <div className={css.topicNumber}>3</div>
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#SoftwareDevelopment</div>
            <div className={css.topicNumber}>3</div>
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#DataManagement</div>
            <div className={css.topicNumber}>3</div>
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#NetworkAdministration</div>
            <div className={css.topicNumber}>3</div>
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#ITCareerAdvice</div>
            <div className={css.topicNumber}>3</div>
          </div>
          <div className={css.topic}>
            <div className={css.hashtagName}>#EmergingTechnologies</div>
            <div className={css.topicNumber}>3</div>
          </div>
        </div>

        <div className={css.roomsPart}>
          <div className={css.headr}>
            <div>
              <div
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginBottom: "0.2rem",
                }}
              >
                Social Groups
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "gray",
                  opacity: "0.7",
                }}
              >
                7 Groups availble
              </div>
            </div>
            <Button
              style={{ backgroundColor: "#00ABB3" }}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Create Group
            </Button>
          </div>
          <div className={css.rooms}>
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
          </div>
        </div>
        <div className={css.adPart}>
          <div className={css.ad}>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "10%",
                color: "white",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Sponsored</div>
              <div style={{ fontSize: "80%", opacity: "0.6" }}>Create Ad</div>
            </div>
            {/* image part */}
            <Avatar
              style={{ outline: "1px solid aqua", marginBottom: "0.4rem" }}
              alt="Remy Sharp"
              variant="rounded"
              sx={{ width: 306, height: 220 }}
              src="https://i.pinimg.com/564x/06/68/ab/0668ab8c3bb93f3f88e61ca4be05565f.jpg"
            />
            {/* bottom ad */}
            <div>
              <div style={{ fontSize: "90%", opacity: "0.9" }}>
                ResorLink
              </div>
              <div
                style={{ fontSize: "75%", opacity: "0.7", marginTop: "0.2rem" }}
              >
                get a creative HeadPhone and feel the music!, check the website for more information
              </div>
            </div>
          </div>
          <div className={css.friendList}>
            <div>Friend List</div>
            <div
              style={{
                width: "100%",
                height: "40%",
                backgroundColor: "",
                display: "flex",
                alignItems:'center'
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://i.pinimg.com/564x/03/f9/85/03f9851b2693ae389081f1cbb3b19cb7.jpg"
                sx={{ width: 45, height: 45 }}
              />
              <div style={{marginLeft:'0.4rem',fontSize:'90%'}}>Ken brad</div>
            </div>
            <div
              style={{
                width: "100%",
                height: "40%",
                backgroundColor: "",
                display: "flex",
                alignItems:'center'
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://preview.redd.it/n5r9jmghnvv61.png?width=640&crop=smart&auto=webp&s=7e671b2392eb2d1cc50d57713eba3b052cbe08f8"
                sx={{ width: 45, height: 45 }}
              />
              <div style={{marginLeft:'0.4rem',fontSize:'90%'}}>badr mohammed</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MainPage;
