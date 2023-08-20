import Headr from "./Headr";
import AppBar from "./AppBar";
import { UserContext } from "./UserContext";
import { useContext } from "react";
function Container({ children }) {
  const token = localStorage.getItem('token');
  const {theme} = useContext(UserContext);
  return (
    <div style={{ overflowY: "hidden" }}>
      {/* <Headr/> */}
      {token && <AppBar />}
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: theme.secondry,
          overflowY: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
