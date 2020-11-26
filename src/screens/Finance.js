import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground, BackHandler, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NetworkManager from '../utils/NetworkManager';
import { colors, constants, assets, AsyncStorageValues, Fonts } from '../../res/index';
import { ButtonComponent, IseasTextInput } from '../components/index';
import { validateEmail, showToast, } from '../utils/Utility';
import SharedInstance from '../utils/SharedInstance';

import Strings from '../../res/String';

let window = Dimensions.get('window');
class Finance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [{ type: "credit", amount: "$1000", app: "GooglePay" }, { type: "debit", amount: "$1000", app: "PhonePe" }, { type: "credit", amount: "$1000", app: "Paytm" }]
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <FlatList
                    data={this.state.transactions}
                    renderItem={({ item }) => {
                        const { type, amount, app } = item;
                        return <View style={{
                            height: 60, padding: 10, margin: 5, backgroundColor: "skyblue",
                            borderRadius: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
                        }}>
                            <Text style={{ width: 100 }}>{type}</Text>
                            <Text style={{ width: 100, fontSize: 18, color: type == "credit" ? "green" : "red" }}>{type == "credit" ? <Text style={{ color: "green" }}>+</Text> : <Text style={{ color: "red" }}>-</Text>}{amount}</Text>
                            <Text style={{ width: 100 }}>{app}</Text>

                        </View>
                    }} />
                <View>
                    <View style={{
                        height: 60, padding: 10, margin: 5, backgroundColor: "skyblue",
                        borderRadius: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <Text>TotalCredit</Text>
                        <Text>$2000</Text>
                        <Text>TotalDebit</Text>
                        <Text>$1000</Text>

                    </View>
                </View>


            </SafeAreaView>
        )
    }

}



const mapStateToProps = state => {
    return {
        // user: state.auth.login
    }
}
const mapDispatchToProps = {
    // login
}
export default connect(mapStateToProps, mapDispatchToProps)(Finance)

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    titleContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightBlueTextColor
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ImageBackground: {
        width: '100%',
        height: '100%'
    },
    logo: {
        height: 45,
        // width: '70%',
        alignSelf: 'center',
        marginBottom: 60
    },
    image: {
        height: 40,
        width: 40
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '80%',
        alignSelf: 'center'
    },
    titletext: {
        fontSize: 24,
        fontWeight: Fonts.medium,
        color: colors.white
    }, socialLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
        marginBottom: 60,
        alignItems: 'center',
        alignContent: 'center'
    },
    colomnView: {
        height: 15,
        width: 1,
        borderWidth: 1,
        marginHorizontal: 10,
        borderColor: colors.secondaryColor
    }
});