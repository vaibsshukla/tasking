import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  LandingScreen,
  Login,
  SignUp,
  HomeScreen, InitialRoute
} from '../screens/index'

import { BottomMenuNavigator } from "../screens/BottomTabBar";

const Stack = createStackNavigator()
export function MainStackNavigator(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={props.routeName}>
      <Stack.Screen name='LandingScreen' component={LandingScreen} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='HomeScreen' component={BottomMenuNavigator} />
      <Stack.Screen name='InitialRoute' component={InitialRoute} />


    </Stack.Navigator>
  )
}