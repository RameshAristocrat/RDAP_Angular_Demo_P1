export const environment = {
  production: true,
  qa:false,
  dev:false,
  stag:false,
  dolly:false,
  ram:false,
  oktaconfig: { 
    CLIENT_ID: "0oab4enjwsVF4ZMTM357", 
    ISSUER: "https://aristocrat.okta.com", 
    LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8080/home", 
    LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8080", 
    SCOPE: ['openid','email'] 
},
baseapiurl:"https://sydc-appdev-01:7070/"
};
