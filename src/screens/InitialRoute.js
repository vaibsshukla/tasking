import React, { Component } from 'react'
import { View, DeviceEventEmitter } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageValues } from "../../res/index";
import NetworkManager from '../utils/NetworkManager'
import Utility from "../utils/Utility";
import Session from "../utils/Session";
import Constants from '../../res/Constants';
import { useNavigationState } from '@react-navigation/native';


import { NavUtil } from '../utils';

let checkEvent = false;
export default class InitialRoute extends Component {


    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {
    }


    render() {
        return (
            <View></View>
        )
    }
}