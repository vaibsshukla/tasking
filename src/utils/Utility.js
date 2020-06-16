import Toast from 'react-native-root-toast';
import { ToastAndroid, Platform } from 'react-native'

export default class Utility {
    static sharedInstance = Utility.sharedInstance == null ? new Utility() : Utility.sharedInstance;
    HOC = undefined

    showToast(message) {
        if (Platform.OS === 'ios') {
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: -50,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow: () => {

                },
                onShown: () => {

                },
                onHide: () => {

                },
                onHidden: () => {

                },
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 5000);
        } else {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    validateMobileNumber = (fieldValue) => {
        const regEx = /^[0-9]{7,9}$/
        if (regEx.test(fieldValue)) {
            return true
        } else {
            this.showToast(AlertMessages.invalidMobileNumberError)
            return false
        }
    }

    validateEmptyField = (fieldValue, errorText) => {
        console.log(fieldValue, errorText);
        if (fieldValue.trim() == '') {
            this.showToast(errorText)
            return false
        }
        return true
    }

    validateRegex = (regex, text) => regex.test(text)

    validateEmailAddress = (email) => {
        if (!this.validateRegex(Strings.regex.email, email)) {
            return false
        }
        return true
    }

    static log(msg, ...options) {
        if (__DEV__) {
            console.log(msg, options);
        }
    }
}