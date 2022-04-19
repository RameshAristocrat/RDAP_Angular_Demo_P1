// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    qa: false,
    dev: false,
    stag: false,
    dolly: false,
    ram: false,
    disha: true,
    oktaconfig: {
        CLIENT_ID: "0oa9t7ifubUwIhATi357",
        ISSUER: "https://aristocrat.okta.com",
        LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8080/home",
        LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8080",
        SCOPE: ['openid', 'email', 'profile']
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
