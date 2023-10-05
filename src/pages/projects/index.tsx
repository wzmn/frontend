import React from "react";
import * as styles from "../../styles/projects.module.css";
import Main from "../../components/main";
import { graphql, Link } from "gatsby";
import PrivateRouting from "../../components/routeing/privateRouting";
import Layout from "../../components/layout";

const Projects = ({ serverData }: any) => {
  const projects = serverData.projects.nodes;
  const contact = serverData.contact.siteMetadata.contact;
  return (
    <div className={styles?.portfolio}>
      <h2>Portfolio</h2>
      <h3>Projects & Websites I've Created</h3>
      <div className={styles?.projects}>
        {projects.map((project: any) => (
          <Link
            to={"/projects/test"}
            key={"/projects/" + project.frontmatter.slug}
          >
            <div>
              <h3>{project.frontmatter.title}</h3>
              <p>{project.frontmatter.stack}</p>
            </div>
          </Link>
        ))}
      </div>
      <p>Likewhat you see? email me at {contact} for a quote!</p>
    </div>
  );
};

export const query = graphql`
  query Projects {
    projects: allMarkdownRemark {
      nodes {
        frontmatter {
          slug
          stack
          title
        }
        id
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`;

const ProtectAbout = ({ data }: any) => {
  return <PrivateRouting Component={Projects} role={true} serverData={data} />;
};

export default ProtectAbout;
