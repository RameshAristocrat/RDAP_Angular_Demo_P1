import { environment } from "src/environments/environment";
export const API = {
    permission_Get_By_Module: environment.userapiurl+"Permission/getbymodule",
    permission_Check_Is_Manage_Pin_Admin: environment.userapiurl+"Permission/IsManagePinAdmin",
    permission_Check_Is_Change_Request_Admin: environment.userapiurl+"Permission/IsChangeRequestAdmin",
    permission_Check_Is_Rework_Admin: environment.userapiurl+"Permission/IsReworkAdmin",
    permission_Check_Is_Delay_Notification_Admin: environment.userapiurl+"Permission/IsDelayNotificationAdmin",
    permission_Check_Is_System_Admin: environment.userapiurl+"Permission/IsSystemAdmin",
    permission_Get_My_Roles: environment.userapiurl+"Permission/MyRoles",
}