/**
 *
 * Constants which will be used for toast messages should be declared in this file.
 */
export default {
    common: {
        noInternetError: 'Please check your internet connection',
    },
    regex: {
        mobile: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        //Alphabets are repeating
        //  password : /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\[\]"\';:_\-<>\.,=\+\/\\()]).{8,}$/,
        // Aphabets are no repeating
        password: /^(?:([A-Za-z0-9 !@#\$%\^&\*\[\]"\';:_\-<>\.,=\+\/\\()])(?!.*\1))*$/,
    },
    router: {
        signUp: 'SignUp',

    }
}