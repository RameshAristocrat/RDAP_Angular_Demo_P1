export const environment = {
    production: false,
    qa:true,
    dev:false,
    stag:false,
    dolly:false,
    ram:false,
    oktaconfig: { 
      CLIENT_ID: "0oabonwkwwkMzJQJI357", 
      ISSUER: "https://aristocrat.okta.com", 
      LOGIN_REDIRECT_URI: "https://syde-webtst-01:8080/home/dashboard", 
      LOGOUT_REDIRECT_URI: "https://syde-webtst-01:8080", 
      SCOPE: ['openid','email'] 
  },
  baseapiurl:"https://syde-apptst-01:7777/api/v1/"
  };
  