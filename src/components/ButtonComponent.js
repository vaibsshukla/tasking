import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, constants as Constants, Fonts } from '../../res/index';

export default ButtonComponent = ({ buttonText, callBack, width, height, backgroundColor, color, fontWeight, borderColor }) => {
    return (
        <TouchableOpacity
            style={
                [
                    styles.buttonContainer,
                    { width: width ? width : '80%' },
                    { height: height ? height : 50 },
                    { backgroundColor: backgroundColor ? backgroundColor : colors.secondaryColor },
                    { borderColor: borderColor ? borderColor : colors.primaryColor }
                ]
            }
            onPress={() => { callBack() }}>
            <Text
                style={[styles.buttonText, { color: color ? color : colors.primaryColor, fontWeight: fontWeight || Fonts.medium }]}
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: Fonts.medium
    },
});
