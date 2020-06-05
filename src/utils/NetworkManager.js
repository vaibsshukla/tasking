import URL, { apis, AppInfo } from '../../res/URL';

export default class NetworkManager {
    static networkManagerInstance = NetworkManager.networkManagerInstance == null ? new NetworkManager() : this.networkManagerInstance;
    token = null;

    async fetchRequest(api, method, parameters = {}, serviceTimeOut = AppInfo.serviceTimeOut) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (__DEV__) console.log('this.token ', this.token);
        if (this.token != null) {
            headers['Authorization'] = this.token
        }
        let url = `${apis.baseURL}${api}`;
        let timeout = (1000 * 60) * 2;  // 2 mins
        let body = (method == 'GET' ? null : JSON.stringify(parameters));
        if (__DEV__) {
            console.log(
                '\n--------------------- [Network] ---------------------\nURL: ' + url +
                '\nMethod: ' + method +
                '\nHeaders: ' + JSON.stringify(headers) +
                '\nTimeout: ' + timeout +
                '\nParameters:\n' + body + '\n',
            );
        }
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                return response.json();
            }).then(data => {
                if (__DEV__) {
                    console.log(`[Network Success]: ${JSON.stringify(data)}`);
                }
                return data;
            }).catch(error => {
                console.log(error);
                alert(error ? error.message : 'Something went wrong..!!');
            });
    }

    async fetchMultiPartRequest(api, method, body, onRetryClicked = null, serviceTimeOut = AppInfo.serviceTimeOut) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        };

        if (this.token != null) {
            headers['Authorization'] = this.token;
        }
        let url = `${URL.baseURL}${api}`;
        let timeout = (1000 * 60) * 2;  // 2 mins
        if (__DEV__) {
            console.log(
                '\n--------------------- [Network] ---------------------\nURL: ' + url +
                '\nMethod: ' + method +
                '\nHeaders: ' + JSON.stringify(headers) +
                '\nTimeout: ' + timeout +
                '\nParameters:\n' + body + '\n',
            );
        }
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                return response.json();
            }).then(data => {
                if (__DEV__) {
                    console.log(`[Network Success]: ${JSON.stringify(data)}`);
                }
                return data;
            }).catch(error => {
                console.log(error);
                alert(error ? error.message : 'Something went wrong..!!');
            });
    }
}