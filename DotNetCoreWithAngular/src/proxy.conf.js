const PROXY_CONFIG = [
  {
    context: [
      "/",
    ],
    target: "https://localhost:7250",
    secure: false
  }
  //{
  //  "/api/*": { // 
  //    "target": "https://localhost:7250",
  //    "secure": false,
  //    "logLevel": "debug",
  //    "pathRewrite": { "^/api": "" }
  //  }
  //}
]

module.exports = PROXY_CONFIG;
