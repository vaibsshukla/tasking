import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground, BackHandler, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NetworkManager from '../utils/NetworkManager';
import { colors, constants, assets, AsyncStorageValues, Fonts } from '../../res/index';
import { ButtonComponent, IseasTextInput } from '../components/index';
import Utility, { validateEmail, showToast, } from '../utils/Utility';
import SharedInstance from '../utils/SharedInstance';
import { apis } from '../../res/URL';

import Strings from '../../res/String';
import Constants from '../../res/Constants';

let window = Dimensions.get('window');
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            // vaibhav.shukla@affle.com  
            password: '',
            // Affle@1234!
            // email: '',
            // password: '',
            loading: false,
            isVisible: true,
            fcmToken: ''
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <ImageBackground

                    style={[styles.ImageBackground,]}>
                    <SafeAreaView style={{ flex: 1 }} >
                        <ScrollView
                            contentContainerStyle={{ marginBottom: 50, flexGrow: 1, }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={"always"}>
                            <KeyboardAvoidingView

                                style={{ flex: 1, }}
                                behavior={Platform.OS == 'ios' ? 'padding' : null}
                                enabled>
                                {this.renderTextInput()}
                                {this.renderRowView()}
                                {/* {this.renderSocialLogin()} */}
                            </KeyboardAvoidingView>
                        </ScrollView>

                    </SafeAreaView>
                </ImageBackground>
            </View >
        );
    }

    renderTextInput() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, }}>

                    {/* <Text
                        onPress={async () => {
                            await SharedInstance.sharedInstance.logout()
                            this.onSkipforNow()
                        }}
                        style={{ fontSize: 14, fontWeight: Fonts.medium, color: colors.secondaryColor, alignSelf: 'flex-end', padding: 30 }} >SKIP FOR NOW</Text> */}
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Image source={assets.loginSignUp.logo} style={{ marginBottom: 250, height: 150, width: 150, tintColor: colors.white, alignSelf: 'center' }} />

                        <IseasTextInput
                            ref='refLogin'
                            placeholder={strings.email}
                            value={this.state.email}
                            onChangeTextProps={(text) => this.setState({ email: text })}
                            onSubmitEditing={() => { this.refs.refPwd.focus() }}
                        />
                        <IseasTextInput
                            ref={'refPwd'}
                            placeholder={strings.password}
                            rightImage={this.state.isVisible ? assets.loginSignUp.hide_eye : assets.loginSignUp.eye}
                            value={this.state.password}
                            secureTextEntry={this.state.isVisible}
                            isVisible={this.state.isVisible}
                            onChangeTextProps={(text) => this.setState({ password: text })}
                            onSubmitEditing={() => { this.loginPress() }}
                            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                        />
                        <View style={{ marginTop: 10 }}>
                            <ButtonComponent
                                callBack={() => {
                                    this.loginPress()
                                }}
                                buttonText={strings.login}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderRowView = () => {
        return (
            <View style={styles.row} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate(constants.router.signUp)}>
                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={styles.rowText}
                    >
                        {strings.create_account}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderSocialLogin() {
        return (
            <View style={styles.socialLogin} >
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        source={assets.loginSignUp.facebook}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        source={assets.loginSignUp.google}
                        style={[styles.image, { marginHorizontal: 20 }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        source={assets.loginSignUp.twitter}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);


    }

    componentWillUnmount = async () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    handleBackButtonClick() {
        return true;
    }



    //3


    //2


    validate(email, password) {
        if (!email) {
            showToast(strings.please_enter_your_email)
            return false;
        }
        if (!validateEmail(email)) {
            showToast(strings.please_enter_your_valid_email)
            return false;
        }
        if (password != undefined) {
            if (password == '') {
                showToast(strings.please_enter_your_password)
                return false;
            }

        }
        return true;
    }


    async loginPress() {
        let data = {}
        data.emailId = this.state.email
        data.password = this.state.password
        if (this.validate(this.state.email, this.state.password)) {
            let res = await NetworkManager.networkManagerInstance.secretTokenfetchRequest(apis.signin, apis.postRequest, true, data, () => this.loginPress())

            if (res.status == 200) {

                NetworkManager.networkManagerInstance.token = res.data.token

                Utility.sharedInstance.token = res.data.token
                Utility.sharedInstance.name = res.data.fullName
                Utility.sharedInstance.email = res.data.emailId
                Utility.sharedInstance.id = res.data.id
                await AsyncStorage.setItem(AsyncStorageValues.token, res.data.token || '')
                await AsyncStorage.setItem(AsyncStorageValues.name, res.data.fullName || '')
                await AsyncStorage.setItem(AsyncStorageValues.email, res.data.emailId || '')
                await AsyncStorage.setItem(AsyncStorageValues.id, res.data.id || '')

                this.props.navigation.navigate(Constants.router.homescreen)

            } else {
                showToast(res.message)
            }
        }

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
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primaryColor
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
    rowText: {
        fontSize: 12,
        fontWeight: Fonts.medium,
        color: colors.secondaryColor
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
