module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "components",
        path: "../lib/src",
      },
    },
  ],
}
