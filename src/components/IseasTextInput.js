import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../res/index';

export default class IseasTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
      secureTextEntry: false,
      isVisible: false,

    }
  }

  render() {


    return (
      <View style={
        [
          styles.container,
          { width: this.props.width ? this.props.width : '80%' },
          { height: this.props.height ? this.props.height : 50 },
          { borderWidth: this.state.isFocussed ? 3 : 1 },
          { borderColor: this.props.borderColor ? this.props.borderColor : colors.placeholderColor },
          this.props.style
        ]
      }>

        {this.props.leftImage && <Image source={this.props.leftImage} style={{ marginLeft: 10, marginRight: 6 }} />}
        {this.props.type == 'contact_number' && <Text
          style={[
            //   { width: '100%', height: 50, marginHorizontal: 10, fontSize: 16, padding: 5 },
            { color: this.props.color ? this.props.color : colors.secondaryColor, marginLeft: 18, fontSize: 16, },
            //   this.props.textStyle
          ]}>+ 65</Text>}
        <TextInput
          {...this.props}
          style={[
            { width: '100%', height: 50, marginHorizontal: 10, fontSize: 16, color: 'black' },
            { color: this.props.color ? this.props.color : colors.secondaryColor, flex: 1 },
            this.props.textStyle
          ]}
          //refer contactUs for  onRef use this.props.onRef(r)
          // ref = {r => this.props.onRef(r)}
          ref='textField'
          onChangeText={(text) => {
            if (text.length >= 0) {
              if (this.props.onChangeTextProps)
                this.props.onChangeTextProps(text)
            }
          }}
          onSubmitEditing={() => {
            if (this.props.onSubmitEditing)
              this.props.onSubmitEditing()
          }}
          keyboardType={this.props.keyboardType != undefined ? this.props.keyboardType : 'default'}
          multiline={this.props.multiline}
          numberOfLines={this.props.numberOfLines}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderColor || colors.placeholderColor}
          value={this.props.value}
          secureTextEntry={this.props.secureTextEntry}
          onFocus={() => this.setState({ isFocussed: true }, this.props.onFocus)}
          onBlur={() => this.setState({ isFocussed: false }, this.props.onBlur)}

        />

        {this.props.rightImage &&
          <TouchableOpacity
            {...this.props}
            style={{ position: 'absolute', right: 10, justifyContent: 'flex-end', marginLeft: 15 }}
          >
            <Image source={this.props.rightImage} />
          </TouchableOpacity>
        }

      </View>
    );
  }

  focus() {
    this.refs.textField.focus()
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: colors.placeholderColor,
    borderRadius: 25,
    marginVertical: 10
  },

});
