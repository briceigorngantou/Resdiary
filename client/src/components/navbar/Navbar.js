import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, IconButton } from "@mui/material";

import "./styles.css";
import profile from "../../asset/avatar.png";

function Navbar() {
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <IconButton
            sx={{ color: "#444", width: 40, height: 40, cursor: "pointer" }}
            onClick={() => console.log("boutton search clicked")}
          >
            <Badge color="primary">
              <SearchIcon />
            </Badge>
          </IconButton>
        </form>
        <div className="navbar-left">
          <IconButton
            sx={{ color: "#444", width: 40, height: 40, cursor: "pointer" }}
            onClick={() => console.log("nofication")}
          >
            <Badge badgeContent={2} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar
            alt="Profile"
            src={profile}
            sx={{ width: 40, height: 40, cursor: "pointer" }}
          />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
