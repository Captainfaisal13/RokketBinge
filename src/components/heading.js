import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/vikkendbingelogo.jpeg";

const Heading = () => {
  return (
    <Link to="/">
      <section className="fixed top-0 left-0 w-full bg-[#111622] flex justify-center py-4 gap-2 drop-shadow-2xl z-50">
        {" "}
        <img className="w-10 xs:w-8" src={Logo} alt="" />
        <h1 className="text-2xl xs:text-lg font-bold text-white font-unbounded max-w-7xl mt-2">
          ROKKETBINGE
        </h1>
      </section>
    </Link>
  );
};

export default Heading;
