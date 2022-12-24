import React, { useEffect } from "react";
import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Trending from "@mui/icons-material/WhatshotOutlined";
import Movies from "@mui/icons-material/MovieCreationRounded";
import Tv from "@mui/icons-material/LiveTv";
import Search from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";

const BottonNav = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue("Trending");
  }, []);

  return (
    <section className="fixed w-full bottom-3 left-0 z-50">
      <BottomNavigation
        style={{ backgroundColor: "transparent" }}
        showLabels
        fontFamily="Arial"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          fontSize="40px"
          fontFamily="Arial"
          className=""
          style={{
            backgroundColor: "#1C2334",
            opacity: ".9",
            color: `${value === "Trending" ? "#60D1E9" : "white"}`,
            borderTopLeftRadius: "3rem",
            borderBottomLeftRadius: "3rem",
          }}
          label="Trending"
          value="Trending"
          icon={<Trending />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          style={{
            backgroundColor: "#1C2334",
            opacity: ".9",
            color: `${value === "Movies" ? "#60D1E9" : "white"}`,
          }}
          label="Movies"
          value="Movies"
          icon={<Movies />}
          component={Link}
          to="/movies"
        />
        <BottomNavigationAction
          style={{
            backgroundColor: "#1C2334",
            opacity: ".9",
            color: `${value === "Series" ? "#60D1E9" : "white"}`,
          }}
          label="Series"
          value="Series"
          component={Link}
          to="/series"
          icon={<Tv />}
        />
        <BottomNavigationAction
          style={{
            backgroundColor: "#1C2334",
            opacity: ".9",
            color: `${value === "Search" ? "#60D1E9" : "white"}`,
            borderTopRightRadius: "3rem",
            borderBottomRightRadius: "3rem",
          }}
          label="Search"
          value="Search"
          icon={<Search />}
          component={Link}
          to="/search"
        />
      </BottomNavigation>
    </section>
  );
};

export default BottonNav;
