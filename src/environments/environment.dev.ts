export const environment = {
    production: false,
    qa: false,
    dev: true,
    stag: false,
    dolly: false,
    ram: false,
    disha: false,
    oktaconfig: {
        CLIENT_ID: "0oa9t7ifubUwIhATi357",
        ISSUER: "https://aristocrat.okta.com",
        LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8080/home",
        LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8080",
        useInteractionCodeFlow: true,
        SCOPE: ['openid','profile','email']
    },
    // baseapiurl: "https://sydc-appdev-01:7777/api/v1/",
    // userapiurl: "https://sydc-appdev-01:8888/api/v1/",
    // extrapinreqapiurl: "https://sydc-appdev-01:5555/api/v1/",
    // reworkreqestapi: "https://sydc-appdev-01:4444/api/v1/",
    baseapiurl: "https://sydc-appdev-01:9999/",
    userapiurl: "https://sydc-appdev-01:9999/",
    extrapinreqapiurl: "https://sydc-appdev-01:9999/",
    reworkreqestapi: "https://sydc-appdev-01:9999/",
    debuggerflag: true,
    enablerolepermission:true,
    enablerolepermissionmock:false,
    rolepermissionextrapinmock:{
        isAdd:true,
        isEdit:true,
        isDelete:true,
        isView:true,
        module:"ExtraPin"
    },
    rolepermissionmanagepinmock:{
        isAdd:true,
        isEdit:true,
        isDelete:true,
        isView:true,
        module:"ManagePin"
    }
};
