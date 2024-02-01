import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `http://localhost:8000/`,
    contact: "support@snippit.com.au",
  },

  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  // flags: {
  //   DEV_SSR: true,
  // },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-sass",
    "gatsby-plugin-remove-serviceworker",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Snippit`,
        short_name: `Snippit`,
        description: `An energy upgrade CRM system streamlines lead management, integrating data sources, automating communications, and visualizing projects while ensuring regulatory compliance and providing analytics for efficient decision-making.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#0a84ff`,
        display: `fullscreen`,
        cache_busting_mode: "none",
        icon: `src/images/icon.png`,
        theme_color_in_head: false,
        // 'gcm_sender_id': '676256783802'
      },
    },
  ],
};

export default config;
