import { Link, graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
let count = 0;
const Navbar = () => {
  const query = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          description
        }
      }
    }
  `);

  console.log(query);

  useEffect(() => {
    count++;
  }, []);
  return (
    <nav>
      <h1>{count} Web Warrior</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/aboute">Aboute Page</Link>
        <Link to="/projects">Projects</Link>
      </div>
      {JSON.stringify(query)}
    </nav>
  );
};

export default Navbar;
