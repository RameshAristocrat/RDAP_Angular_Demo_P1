export const environment = {
    production: true,
    qa: false,
    dev: false,
    stag: false,
    dolly: false,
    ram: false,
    disha: false,
    oktaconfig: {
        CLIENT_ID: "0oab4enjwsVF4ZMTM357",
        ISSUER: "https://aristocrat.okta.com",
        LOGIN_REDIRECT_URI: "https://syde-webprd-01:8080/home",
        LOGOUT_REDIRECT_URI: "https://syde-webprd-01:8080",
        SCOPE: ['openid','profile','email']
    },
    // baseapiurl: "https://syde-appprd-01:7777/api/v1/",
    // userapiurl: "https://syde-appprd-01:8888/api/v1/",
    // extrapinreqapiurl: "https://syde-appprd-01:5555/api/v1/",
    // reworkreqestapi: "https://syde-appprd-01:4444/api/v1/",
    baseapiurl: "https://syde-appprd-01:9999/",
    userapiurl: "https://syde-appprd-01:9999/",
    extrapinreqapiurl: "https://syde-appprd-01:9999/",
    reworkreqestapi: "https://syde-appprd-01:9999/",
    debuggerflag: true,
    enablerolepermission: true,
    enablerolepermissionmock: false,
    rolepermissionextrapinmock: {
        isAdd: true,
        isEdit: true,
        isDelete: true,
        isView: true,
        module: "ExtraPin"
    },
    rolepermissionmanagepinmock: {
        isAdd: true,
        isEdit: true,
        isDelete: true,
        isView: true,
        module: "ManagePin"
    }
};
