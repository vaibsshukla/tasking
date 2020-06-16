import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from "react-redux";
import { apis } from '../../res/URL';
import { API_CALL, DUMMY_API_CALL } from "../redux/Actions"
import { NetworkManager } from '../utils/index'

class LandingScreen extends Component {

    apiHandler = async () => {
        const res = await NetworkManager.networkManagerInstance.fetchRequest(apis.dummy_api, apis.getRequest, true, null, () => this.apiHandler())
        return
        let data = {
            api: apis.dummy_api,
            requestType: apis.getRequest,
            type: DUMMY_API_CALL
        }
        this.props.apiDispatcher(data);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.apiHandler()}>
                    <Text style={styles.textStyle}>Landing Screen</Text>
                </TouchableOpacity>

                {this.props.data != '' && <Text>Data Fetched</Text>}
            </View>
        )
    };
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
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);

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