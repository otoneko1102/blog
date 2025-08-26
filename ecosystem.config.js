module.exports = {
  apps: [
    {
      name: "blog",
      script: "./dist/server.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
