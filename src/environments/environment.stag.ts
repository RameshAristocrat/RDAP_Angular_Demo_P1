export const environment = {
    production: false,
    qa:false,
    dev:false,
    stag:true,
    dolly:false,
    ram:false,
    disha:true,
    oktaconfig: { 
      CLIENT_ID: "0oa1croj4yjrsRSR75d7", 
      ISSUER: "https://dev-88037208.okta.com", 
      LOGIN_REDIRECT_URI: "https://sydc-appdev-01:8082/main/launcher", 
      LOGOUT_REDIRECT_URI: "https://sydc-appdev-01:8082", 
      SCOPE: ['openid','email'] 
  },
  baseapiurl:"https://sydc-appdev-01:7777/api/v1/",
  userapiurl:"https://sydc-appdev-01:8888/api/v1/",
  extrapinreqapiurl:"https://sydc-appdev-01:5555/api/v1/",
      reworkreqestapi:"https://sydc-appdev-01:4444/api/v1/",
      debuggerflag:true,
      enablerolepermission:true,
      enablerolepermissionmock:true,
      rolepermissionextrapinmock:{
          isAdd:false,
          isEdit:true,
          isDelete:true,
          isView:true,
          module:"ExtraPin"
      },
      rolepermissionmanagepinmock:{
          isAdd:false,
          isEdit:true,
          isDelete:true,
          isView:true,
          module:"ManagePin"
      }
  };
  