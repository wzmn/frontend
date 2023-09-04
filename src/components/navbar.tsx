import { Link } from "gatsby";
import React from "react";
const Navbar = () => {
  return (
    <div className="">
      <Link to="/">Home</Link>
      <Link to="/aboute">Aboute Page</Link>
      <Link to="/projects">Projects</Link>
    </div>
  );
};

export default Navbar;
