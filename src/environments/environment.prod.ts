export const environment = {
  production: true,
  qa:false,
  dev:false,
  stag:false,
  oktaconfig: { 
    CLIENT_ID: "0oa1croj4yjrsRSR75d7", 
    ISSUER: "https://dev-88037208.okta.com", 
    LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8080/main/launcher", 
    LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8080", 
    SCOPE: ['openid','email'] 
}
};
