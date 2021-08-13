export const environment = {
    production: false,
    qa:true,
    dev:false,
    stag:false,
    oktaconfig: { 
      CLIENT_ID: "0oa1croj4yjrsRSR75d7", 
      ISSUER: "https://dev-88037208.okta.com", 
      LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8083/main/launcher", 
      LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8083", 
      SCOPE: ['openid','email'] 
  }
  };
  