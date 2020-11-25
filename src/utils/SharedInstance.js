import { Platform } from 'react-native';
import { AsyncStorageValues } from '../../res/AsyncStorageValues'
import NetworkManager from './NetworkManager';
import AsyncStorage from '@react-native-community/async-storage';

export default class SharedInstance {
  rootComponnant = null
  navigation = null;
  token = ''
  user = {
  };
  safeAreaFromTop = Platform.OS === "ios" ? 20 : 0

  constructor() {
  }
  static sharedInstance = SharedInstance.sharedInstance == null ? new SharedInstance() : this.sharedInstance

  async logout() {
    this.user = {};
    try {
      await AsyncStorage.setItem(AsyncStorageValues.id, '')
      await AsyncStorage.setItem(AsyncStorageValues.token, '')
      await AsyncStorage.setItem(AsyncStorageValues.name, '')
      await AsyncStorage.setItem(AsyncStorageValues.email, '')
      await AsyncStorage.setItem(AsyncStorageValues.mobile, '')
      await AsyncStorage.setItem(AsyncStorageValues.password, '')
      await AsyncStorage.setItem(AsyncStorageValues.organisation, '')
      await AsyncStorage.setItem(AsyncStorageValues.designation, '')
      await AsyncStorage.setItem(AsyncStorageValues.industry, '')
      await AsyncStorage.setItem(AsyncStorageValues.isLoggedIn, '')
      await AsyncStorage.setItem(AsyncStorageValues.path, '')
      NetworkManager.sharedInstance.token = ''
      return true;
    } catch (error) {
      return false
    }
  }

  //sessionObserver
  async sessionObserver() {
    // setting userdata to maintain session
    let id = await AsyncStorage.getItem(AsyncStorageValues.id)
    console.log('AsyncStorage.getItem(AsyncStorageValues.id)', id)
    if (id)
      return true
    else
      console.log('AsyncStorage.getItem(AsyncStorageValues.id)', false)
    return false
  }

}
