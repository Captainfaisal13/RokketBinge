import React from "react";
import Heading from "./heading";
import BottonNav from "./bottomnav";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <section className="home bg-gradient-to-r from-[#131212] to-[#283747]">
      <Heading />
      <Outlet />
      <BottonNav />
    </section>
  );
};

export default Home;
