export const environment = {
    production: false,
    qa: false,
    dev: true,
    stag: false,
    dolly:false,
    ram:false,
    oktaconfig: { 
        CLIENT_ID: "0oa1croj4yjrsRSR75d7", 
        ISSUER: "https://dev-88037208.okta.com", 
        LOGIN_REDIRECT_URI: "http://localhost:8084/main/launcher", 
        LOGOUT_REDIRECT_URI: "http://localhost:8084", 
        SCOPE: ['openid','email'] 
    },
    baseapiurl:"http://localhost:8501/"
};
