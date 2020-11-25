import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { assets as a, Fonts, colors, assets } from '../../res/index'
import SharedInstance from '../utils/SharedInstance';

const AppHeader = props => {
    const {
        containerStyle,
        imageStyle,
        onPress,
        headerText,
        showRightIcon,
        callBack,
        callBackDownload,
        onPressrightIcon,
        headerTextStyle,
        leftIcon,
        rightImageStyle,
        showRightIcon2
    } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                style={{}}
                onPress={onPress == undefined ? () => {
                    props.navigation.goBack()
                    SharedInstance.sharedInstance.rootComponnant.changeProgressBarStatus(false)
                } : onPress}>
                <View style={{
                    marginRight: 40,
                    alignItems: 'flex-start',
                    justifyContent: "flex-start"
                }}>
                    <Image
                        style={[{ alignSelf: 'flex-start', }, imageStyle]}
                        source={leftIcon ? leftIcon : a.common.back} />
                </View>
            </TouchableOpacity>
            <Text style={[{ alignSelf: 'center', fontSize: 20, marginRight: 40, fontWeight: Fonts.medium, color: colors.secondaryColor, }, headerTextStyle]}>
                {headerText}
            </Text>
            {/* <Text></Text> */}
            <View style={[{ flexDirection: 'row' }]}>
                {showRightIcon2 != '' &&
                    <TouchableOpacity
                        onPress={onPressrightIcon}>
                        <Image
                            style={{ marginRight: 15, width: 20, height: 20 }}
                            source={showRightIcon2 == undefined ? '' : assets.myBookings.download}
                        />
                    </TouchableOpacity>}
                {showRightIcon != '' &&
                    <TouchableOpacity
                        style={{}}
                        onPress={callBack}>
                        <Image
                            style={[{}, rightImageStyle]}
                            source={showRightIcon} />
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default AppHeader;
