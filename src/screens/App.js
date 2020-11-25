import React, { Component } from 'react';
import { View, Keyboard } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "../navigation/MainStackNavigator";
import ProgressView from '../components/ProgressView'
import NoNetwork from '../components/NoNetwork'
import { Utility, NetworkManager } from '../utils/index'
import { Constant } from '../../res/index'
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    Utility.sharedInstance.HOC = this
    this.state = {
      isOverlayVisible: false,
      showProgressBar: false
    }
  }

  showHideProgressBar = (status) => {
    Keyboard.dismiss()
    this.setState({
      showProgressBar: status,
    })
  }

  showOverlay(parameter = {}) {
    this.onRetryClicked = parameter.onRetryClicked
    Keyboard.dismiss()
    this.setState({
      isOverlayVisible: true,
    })
  }

  instantiateReachability() {
    if (__DEV__) console.log('instantiateReachability')
    const reachabilityCallback = (isConnected) => null
    NetworkManager.networkManagerInstance.reachabilityListener(reachabilityCallback)
  }

  componentDidMount() {
    this.instantiateReachability()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <MainStackNavigator
            routeName={'Login'}
          />
        </NavigationContainer>
        {this.onRetryClicked && this.state.isOverlayVisible &&
          <NoNetwork onRetryClicked={() => {
            if (NetworkManager.networkManagerInstance.isInternetConnected) {
              this.setState({ isOverlayVisible: false })
              this.onRetryClicked()
            } else {
              Utility.sharedInstance.showToast(Constant.common.noInternetError);
            }
          }} />
        }
        <ProgressView animate={this.state.showProgressBar} />
      </View>
    )
  };
};