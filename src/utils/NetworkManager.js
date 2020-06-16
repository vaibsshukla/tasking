import NetInfo from "@react-native-community/netinfo";
import URL, { apis, AppInfo } from '../../res/URL';
import Utility from './Utility'
const BYPASS_CHECK_FOR_REACHABILITY = false

export default class NetworkManager {
    static networkManagerInstance = NetworkManager.networkManagerInstance == null ? new NetworkManager() : this.networkManagerInstance;
    isInternetConnected = false;
    token = null;

    progressBarRequest = (status) => {
        Utility.sharedInstance.HOC.showHideProgressBar(status)
    }

    async fetchRequest(api, method, showProgressBar = false, parameters = {}, onRetryClicked = null, serviceTimeOut = AppInfo.serviceTimeOut) {
        if (!this.isInternetConnected) {
            console.log('isInternetConnected :' + this.isInternetConnected);
            if (onRetryClicked != null) {
                Utility.sharedInstance.HOC.showOverlay({ type: 'NO_NETWORK', onRetryClicked: onRetryClicked });
                throw new Error('NO_NETWORK');
            }
            return { success: false, error: 'Please check your internet connection' };
        }
        if (showProgressBar) {
            this.progressBarRequest(true);
        }
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
                this.progressBarRequest(false);
                if (__DEV__) {
                    console.log(`[Network Success]: ${JSON.stringify(data)}`);
                }
                return data;
            }).catch(error => {
                this.progressBarRequest(false);
                console.log(error);
                alert(error ? error.message : 'Something went wrong..!!');
            });
    }

    // Reachability
    async internetConnected(shouldBypass = false) {
        if (BYPASS_CHECK_FOR_REACHABILITY) return true
        return this.isInternetConnected
        // return await NetInfo.isConnected.fetch()
        try {
            let response = await fetch("https://www.google.com", { method: 'GET', timeout: 1000 })
            return response.status == 200
        } catch (error) {
            return false
        }
    }

    async reachabilityListener(callback) {
        NetInfo.fetch().then(state => {
            this.isInternetConnected = state.isConnected
            if (callback) callback(this.isInternetConnected)
        })
        const unsubscribe = NetInfo.addEventListener(state => {
            this.isInternetConnected = state.isConnected
            if (callback) callback(this.isInternetConnected)
        })
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