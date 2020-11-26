import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Image, Dimensions, TouchableOpacity, StatusBar, TextInput, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, KeyboardAvoidingView, SectionList } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { strings, assets, colors, constants, AsyncStorageValues, Fonts, URL, } from '../../res/index';
import { ButtonComponent, IseasTextInput, AppHeader } from '../components/index';
import Utility, { validateEmail, validatePassword, validateMobile, showToast, isPasswordValid } from '../utils/Utility';
import SharedInstance from '../utils/SharedInstance';
import NetworkManager from '../utils/NetworkManager';
import { Header } from '@react-navigation/stack'
import { apis } from '../../res/URL';
import Constants from '../../res/Constants';
var { width, height } = Dimensions.get('window');
const keypadPadding = height < 700 ? height * 0.25 : height * 0.35

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',

        };
    }




    render() {
        return (
            <View style={styles.container}>

                {!this.state.onContinuePress && <ImageBackground
                    // source={assets.loginSignUp.login_backgroud_image}
                    style={{ width: '100%', height: '100%', backgroundColor: colors.primaryColor }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        {this.renderSignUpView()}
                    </SafeAreaView>
                </ImageBackground>
                }
            </View>
        );
    }

    renderTextInput = () => {
        let { name, email, organisation, designation, contact_number, password } = this.state;
        let textInputField = [
            { type: 'name', placeholder: strings.name, secureTextEntry: false, value: name, keyboardType: 'default' },
            { type: 'email', placeholder: strings.email, secureTextEntry: false, value: email, keyboardType: 'default' },
            { type: 'password', placeholder: strings.password, secureTextEntry: this.state.isVisible, value: password, rightImage: this.state.isVisible ? assets.loginSignUp.hide_eye : assets.loginSignUp.eye, keyboardType: 'default' },
        ]
        return (textInputField).map((textInput) => {
            return (
                <IseasTextInput
                    placeholder={textInput.placeholder}
                    onChangeTextProps={(text) => this.setState({ [textInput.type]: text })}
                    maxLength={textInput.type == 'contact_number' ? 8 : undefined}
                    secureTextEntry={textInput.secureTextEntry}
                    value={textInput.value}
                    rightImage={textInput.rightImage}
                    keyboardType={textInput.keyboardType}
                    type={textInput.type}
                    onPress={() => this.setState({ isVisible: !this.state.isVisible })}

                />
            )
        });
    }

    renderSignUpView = () => {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, flexDirection: 'column', }}
                // keyboardVerticalOffset={Header.HEIGHT}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled>
                <ScrollView
                    style={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flexGrow: 1 }}>
                            <AppHeader
                                imageStyle={{ tintColor: colors.secondaryColor }}
                                onPress={() => { this.props.navigation.goBack() }} />
                            <StatusBar barStyle="light-content" backgroundColor="black" />
                            <View style={{ marginTop: 50 }}>
                                {this.renderTextInput()}
                            </View>
                            <View style={{ marginTop: 200, bottom: 0 }}>
                                <ButtonComponent
                                    callBack={() => {
                                        this.signupApiHandler()
                                    }}
                                    buttonText={'Sign Up'} />
                            </View>
                            {/* <View style={{ marginTop: 15, paddingBottom: 40 }} >
                                <Text style={{ fontSize: 12, fontWeight: Fonts.medium, color: colors.lightBlueTextColor, alignSelf: 'center' }}>{strings.by_click}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(constants.router.TermsandConditions)}>
                                        <Text style={{ fontSize: 12, fontWeight: Fonts.medium, color: colors.secondaryColor }} >{strings.terms}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 12, fontWeight: Fonts.medium, color: colors.lightBlueTextColor }} >{strings.and}</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(constants.router.PrivacyPolicy)}>
                                        <Text style={{ fontSize: 12, fontWeight: Fonts.medium, color: colors.secondaryColor }} >{strings.privacy_policy}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    validate(name, email, password,) {
        if (name != undefined) {
            if (name == '') {
                showToast(strings.please_enter_your_name)
                return false;
            }
        }
        if (!email) {
            showToast(strings.please_enter_your_email)
            this.refs.refLogin.focus()
            return false;
        }
        if (!validateEmail(email)) {
            showToast(strings.please_enter_your_valid_email)
            this.refs.refLogin.focus()
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


    signupApiHandler = async () => {
        let data = {}
        data.emailId = this.state.email
        data.password = this.state.password
        data.fullName = this.state.name

        if (this.validate(
            this.state.name,
            this.state.email,
            this.state.password,
        )) {
            let res = await NetworkManager.networkManagerInstance.secretTokenfetchRequest(apis.signUp, apis.postRequest, true, data, () => this.signupApiHandler())
            if (res.status == 200) {
                NetworkManager.networkManagerInstance.token = res.token

                Utility.sharedInstance.token = res.token
                Utility.sharedInstance.name = res.data.fullName
                Utility.sharedInstance.email = res.data.emailId
                Utility.sharedInstance.id = res.data._id
                await AsyncStorage.setItem(AsyncStorageValues.token, res.token || '')
                await AsyncStorage.setItem(AsyncStorageValues.name, res.data.fullName || '')
                await AsyncStorage.setItem(AsyncStorageValues.email, res.data.emailId || '')
                await AsyncStorage.setItem(AsyncStorageValues.id, res.data.id || '')



                this.props.navigation.navigate(Constants.router.homescreen)
                Alert.alert('Account created');

            } else {
                showToast(res.message)
            }
        }
    }


};
const mapStateToProps = state => {
    return {
        data: state.apiReducer.testResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        apiDispatcher: (data) => dispatch({ type: API_CALL, data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        margin: 20
    },
    textStyle: {
        fontSize: 14
    }
});