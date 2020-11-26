import * as React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeScreen,
    Finance
} from '../screens/index'
import { colors } from '../../res';

function BottomTabBar({ state, descriptors, navigation }) {

    return (
        <View>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
            </SafeAreaView>
            <View style={{ flexDirection: 'row', height: 40, }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const isItemFocused = () => {
                        return isFocused ? colors.primaryColor : 'black'
                    }

                    return (
                        <TouchableOpacity
                            onPress={onPress}
                            style={styles.bottomTabWrapper}>
                            {label == 'Schedule Planner' && <View style={styles.bottomTabItemWrapper}>
                                <Text style={{ fontSize: 12, padding: 1, color: isItemFocused(), textAlign: 'center' }}>{label}</Text>
                            </View>}

                            {label == 'Manage Transactions' && <View style={styles.bottomTabItemWrapper}>
                                <Text style={{ fontSize: 12, color: isItemFocused() }}>{label}</Text>
                            </View>}

                        </TouchableOpacity>
                    );
                })}
            </View>
            <SafeAreaView style={{ backgroundColor: colors.white }}>
            </SafeAreaView>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export function BottomMenuNavigator() {
    return (

        <Tab.Navigator tabBar={props => <BottomTabBar {...props} />} >
            <Tab.Screen name="Schedule Planner" component={HomeScreen} />
            <Tab.Screen name="Manage Transactions" component={Finance} />
        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({

    bottomTabWrapper: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        borderTopWidth: 0.3,
        backgroundColor: colors.white,
        // shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            height: 4,
            width: 5
        },
        //android
        elevation: 10
    },
    bottomTabItemWrapper: {
        alignItems: 'center',
    },
});