import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `http://localhost:8000/`,
    contact: "example@example.com",
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        description: `The application does cool things and makes your life better.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        cache_busting_mode: 'none',
        icon: `src/images/icon.png`,
        theme_color_in_head: false,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/dashboard/`, `/settings/`],
        workboxConfig: {
          globPatterns: ['**/src/images*']
       }
      },
    },
  ],
};

export default config;
