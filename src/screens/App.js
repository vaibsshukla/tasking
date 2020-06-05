import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import { apis } from '../../res/URL';
import { API_CALL, DUMMY_API_CALL } from "../redux/Actions"
import { connect } from "react-redux";
import { Strings, Color } from '../../res'

class App extends Component {

  apiHandler = () => {
    let data = {
      api: apis.dummy_api,
      requestType: apis.getRequest,
      type: DUMMY_API_CALL
    }
    this.props.apiDispatcher(data);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <TouchableOpacity
              onPress={() => this.apiHandler()}
              style={styles.apiButton}>
              <Text style={styles.apiButtonText}>{Strings.app.apiButtonText}</Text>
            </TouchableOpacity>

            {this.props.data != '' && <Text style={styles.responseText}>{Strings.app.apiResponseText}</Text>}
          </View>
        </SafeAreaView>
      </>
    )
  };
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Color.white,
  },
  apiButton: {
    height: 50,
    alignItems: 'center',
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
    margin: 20
  },
  apiButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: Color.white
  },
  responseText: {
    alignSelf: 'center',
    fontSize: 18
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(App);