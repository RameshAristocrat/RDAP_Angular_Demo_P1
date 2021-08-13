export const environment = {
    production: false,
    qa:false,
    dev:false,
    stag:true,
    oktaconfig: { 
      CLIENT_ID: "0oa1croj4yjrsRSR75d7", 
      ISSUER: "https://dev-88037208.okta.com", 
      LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8082/main/launcher", 
      LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8082", 
      SCOPE: ['openid','email'] 
  }
  };
  