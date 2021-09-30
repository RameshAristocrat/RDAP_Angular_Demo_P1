export const environment = {
    production: false,
    qa: false,
    dev: false,
    stag: false,
    dolly:false,
    ram:true,
    oktaconfig: { 
        CLIENT_ID: "0oa9t7ifubUwIhATi357", 
        ISSUER: "https://aristocrat.okta.com", 
        LOGIN_REDIRECT_URI: "https://sydc-appdev-01:6060/home/dashboard", 
        LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:6060", 
        SCOPE: ['openid','email'] 
    },
    baseapiurl:"https://sydc-appdev-01:7777/api/v1/"
};
