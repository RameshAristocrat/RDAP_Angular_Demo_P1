export const environment = {
    production: false,
    qa: true,
    dev: false,
    stag: false,
    dolly: false,
    ram: false,
    disha: false,
    oktaconfig: {
        CLIENT_ID: "0oabonwkwwkMzJQJI357",
        ISSUER: "https://aristocrat.okta.com",
        LOGIN_REDIRECT_URI: "https://syde-webtst-01:8080/home",
        LOGOUT_REDIRECT_URI: "https://syde-webtst-01:8080",
        SCOPE: ['openid','profile','email']
    },
    //   baseapiurl:"https://syde-apptst-01:7777/api/v1/",
    //   userapiurl:"https://syde-apptst-01:8888/api/v1/",
    //   extrapinreqapiurl:"https://syde-apptst-01:5555/api/v1/",
    //       reworkreqestapi:"https://syde-apptst-01:4444/api/v1/",
    baseapiurl: "https://syde-apptst-01:9999/",
    userapiurl: "https://syde-apptst-01:9999/",
    extrapinreqapiurl: "https://syde-apptst-01:9999/",
    reworkreqestapi: "https://syde-apptst-01:9999/",
    debuggerflag: false,
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
