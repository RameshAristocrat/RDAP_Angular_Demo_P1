var applicationConfig = {
    clientID: '8b0e293d-66a2-4ea6-a64e-dd0010ca8dd6', //This is your client ID
    authority: "https://login.microsoftonline.com/common",  //Default authority value is https://login.microsoftonline.com/common
    flowScopes: ["https://service.flow.microsoft.com//Flows.Read.All https://service.flow.microsoft.com//Flows.Manage.All https://service.flow.microsoft.com//Approvals.Read.All https://service.flow.microsoft.com//Approvals.Manage.All"]
};
var flowAccessToken;
var myMSALObj = new Msal.UserAgentApplication(applicationConfig.clientID, applicationConfig.authority, acquireTokenRedirectCallBack,
    {storeAuthStateInCookie: true, cacheLocation: "localStorage",redirectUri:window.location.origin});
 
function loadDev(){
    if (myMSALObj.getUser())
    {
        acquireTokenPopupAndLoadFlowsWidget();
    }
    else{
        signIn();
    }
}
function signIn() {
    myMSALObj.loginPopup(applicationConfig.flowScopes).then(function (idToken) {
        acquireTokenPopupAndLoadFlowsWidget();
    }, function (error) {
    });
}

function acquireTokenRedirectCallBack() {
}

function acquireTokenPopupAndLoadFlowsWidget() {
    //Call acquireTokenSilent (iframe) to obtain a token for Microsoft Flow
    myMSALObj.acquireTokenSilent(applicationConfig.flowScopes).then(function (accessToken) {
        flowAccessTokenAcquired(accessToken);
        loadWidget();
    }, function (error) {
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure due to consent or interaction required ONLY
        if (error.indexOf("consent_required") !== -1 || error.indexOf("interaction_required") !== -1 || error.indexOf("login_required") !== -1) {
            myMSALObj.acquireTokenPopup(applicationConfig.flowScopes).then(function (accessToken) {
                flowAccessTokenAcquired(accessToken);
                loadWidget();
            }, function (error) {
            });
        }
    });
}
function flowAccessTokenAcquired(accessToken) {
  flowAccessToken = accessToken;
}

function resetWidgetContainer()
{
    var container = document.getElementById("flowsDiv");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
function signOut() {
    myMSALObj.logout();
}

function loadWidget(accessToken)
{
    resetWidgetContainer();
    var sdk = new window.MsFlowSdk({ hostName: window.location.origin, locale: 'en-us', hostId: window.WellKnownHostIds.WIDGETTEST});
        var widget = sdk.renderWidget('approvalCenter', {
            container: 'flowsDiv',
            enableRegionalPortal: true,
            enableOnBehalfOfTokens: true,
            debugMode: false,
            approvalCenterSettings: {
                //tab :'sentApprovals',
                //approvalsFilter: 'properties/approvalid  eq \'bc302f88-a160-4081-9955-d87a2503cf3c\'',
                autoNavigateToDetails: true,
                hideInfoPaneCloseButton: true,
                hideLink: true,
                showSimpleEmptyPage: false,
                hideFlowCreation:true,
                showApprovalHistory:true
            }
        });

        // add event handler to provide access token to the widget
        widget.listen("GET_ACCESS_TOKEN", function (requestParam, widgetDoneCallback) {
            widgetDoneCallback(null, {
                token: flowAccessToken
            });
        });

        // add widget_ready event handler
        widget.listen("WIDGET_READY", function () {
        });
}