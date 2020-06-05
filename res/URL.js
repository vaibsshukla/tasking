/**
 * 
 * URL which will be used for API calling should be declared in this file.
 */

export const AppInfo = {
    baseUrlAPI: 'https://cigapi.affleprojects.com',
    apiVersion: 'v1',
    serviceTimeOut: 20000,
};

export const apis = {
    getRequest: 'GET',
    postRequest: 'POST',
    deleteRequest: 'DELETE',
    putRequest: 'PUT',
    baseURL: AppInfo.baseUrlAPI + "/" + AppInfo.apiVersion + "/",

    dummy_api: '/web/getTnC',
}
