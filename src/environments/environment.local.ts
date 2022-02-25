export const environment = {
    production: false,
    qa: false,
    dev: true,
    stag: false,
    dolly:false,
    ram:false,
    disha:true,
    oktaconfig: { 
        CLIENT_ID: "0oa1croj4yjrsRSR75d7", 
        ISSUER: "https://dev-88037208.okta.com", 
        LOGIN_REDIRECT_URI: "http://localhost:8084/main/launcher", 
        LOGOUT_REDIRECT_URI: "http://localhost:8084", 
        SCOPE: ['openid','email'] 
    },
    baseapiurl:"http://localhost:8501/",
    userapiurl:"https://sydc-appdev-01:8888/api/v1/",
    extrapinreqapiurl:"https://sydc-appdev-01:5555/api/v1/",
        reworkreqestapi:"https://sydc-appdev-01:4444/api/v1/",
        debuggerflag:true,
        enablerolepermission:true,
        enablerolepermissionmock:true,
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
