import React, { Component } from 'react'
import { View, DeviceEventEmitter } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageValues, constants } from "../../res/index";



import { NavUtil, NetworkManager, Utility } from '../utils';

let checkEvent = false;
export default class InitialRoute extends Component {


    constructor(props) {
        super(props)
        this.state = {
        }
    }


    async componentDidMount() {
        let token = await AsyncStorage.getItem(AsyncStorageValues.token)
        let name = await AsyncStorage.getItem(AsyncStorageValues.name)
        let email = await AsyncStorage.getItem(AsyncStorageValues.email)
        let id = await AsyncStorage.getItem(AsyncStorageValues.id)


        NetworkManager.networkManagerInstance.token = token
        Utility.sharedInstance.token = token
        Utility.sharedInstance.name = name
        Utility.sharedInstance.email = email
        Utility.sharedInstance.id = id

        console.log('token ' + token)
        console.log('Utility.sharedInstance.token ' + Utility.sharedInstance.name)
        console.log('Utility.sharedInstance.token ' + Utility.sharedInstance.email)
        console.log('Utility.sharedInstance.token ' + Utility.sharedInstance.id)


        if (token != null) {
            this.props.navigation.replace(constants.router.homescreen)
        } else {
            this.props.navigation.replace(constants.router.login)
        }
    }


    render() {
        return (
            <View></View>
        )
    }
}