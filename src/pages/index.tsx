import * as React from "react";
import { Link, type HeadFC, type PageProps, graphql } from "gatsby";
import Layout from "../components/layout";
import * as styles from "../styles/home.module.css";
import Main from "../components/main";

const IndexPage: React.FC<PageProps> = ({ data }) => {
  return (
    <Main>
      <section className={styles?.header}>
        <div>
          <h2>Design</h2>
          <h3>Develop & Deploy</h3>
          <p>UX designer & web developer based in Manchester.</p>
          <Link className={styles?.btn} to="/projects">
            My Portfolio Projects
          </Link>
        </div>
        {JSON.stringify(data)}
      </section>
    </Main>
  );
};

export const query = graphql`
  query siteInfo {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
