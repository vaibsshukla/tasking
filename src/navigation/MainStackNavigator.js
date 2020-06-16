import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  LandingScreen,
  BusinessRegistration,
  PartnerInformation,
  TrackApplication
} from '../screens/index'

const Stack = createStackNavigator()
export function MainStackNavigator(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={props.routeName}>
      <Stack.Screen name='LandingScreen' component={LandingScreen} />
    </Stack.Navigator>
  )
}