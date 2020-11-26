/**
 * 
 * URL which will be used for API calling should be declared in this file.
 */

export const AppInfo = {
    baseUrlAPI: 'http://tasking.affleprojects.com/api',
    apiVersion: 'v1',
    serviceTimeOut: 20000,
};

export const apis = {
    getRequest: 'GET',
    postRequest: 'POST',
    deleteRequest: 'DELETE',
    putRequest: 'PUT',
    baseURL: AppInfo.baseUrlAPI + "/",

    signUp: 'signup',
    signin: 'signin',
    createTask: 'post',
    taskListing: 'post/details',
    editDetail: 'post/edit',
}
