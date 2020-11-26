import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, Image, } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NetworkManager from '../utils/NetworkManager';
import { colors, constants, assets, AsyncStorageValues, Fonts } from '../../res/index';
import { ButtonComponent, IseasTextInput } from '../components/index';
import Utility, { validateEmail, showToast, } from '../utils/Utility';
import SharedInstance from '../utils/SharedInstance';
import { apis } from '../../res/URL';
import Modal from "react-native-modal";
import OptionsMenu from "react-native-options-menu";
import { CommonActions } from '@react-navigation/native';
import Strings from '../../res/String';
import Color from '../../res/Color';

let { height, width } = Dimensions.get('window');
class HomeScreen extends Component {
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
            fcmToken: '',
            time: '',
            isNoteModalVisible: false,
            title: '',
            estimatedHrs: '',
            desc: '',
            isEditEnable: false,
            taskId: ''
            // list: [

            //     {
            //         "_id": "5fbe70ec778ff67b162ddc5f",
            //         "status": "Not Done",
            //         "createdBy": "5fbe51701d7530700b7a673f",
            //         "description": "Sprint 3 Project Discussion",
            //         "title": "Team Discussion",
            //         "estimationTime": "4h",
            //         "createdAt": "2020-11-25T14:57:48.737Z",
            //         "updatedAt": "2020-11-25T14:57:48.737Z",
            //         "__v": 0
            //     },
            //     {
            //         "_id": "5fbe70ec778ff67b162ddc5f",
            //         "status": "Done",
            //         "createdBy": "5fbe51701d7530700b7a673f",
            //         "description": "Identify resources to be monitored.",
            //         "title": "Design the solution	",
            //         "estimationTime": "4h",
            //         "createdAt": "2020-11-25T14:57:48.737Z",
            //         "updatedAt": "2020-11-25T14:57:48.737Z",
            //         "__v": 0
            //     }, {
            //         "_id": "5fbe70ec778ff67b162ddc5f",
            //         "status": "In-progress",
            //         "createdBy": "5fbe51701d7530700b7a673f",
            //         "description": "Identify the implementation team.",
            //         "title": "Prepare for implementation	",
            //         "estimationTime": "4h",
            //         "createdAt": "2020-11-25T14:57:48.737Z",
            //         "updatedAt": "2020-11-25T14:57:48.737Z",
            //         "__v": 0
            //     },
            //     {
            //         "_id": "5fbe70ec778ff67b162ddc5f",
            //         "status": "Cancelled",
            //         "createdBy": "5fbe51701d7530700b7a673f",
            //         "description": "Install test and QA servers and prerequisite software.",
            //         "title": "Prepare the test/QA environment",
            //         "estimationTime": "4h",
            //         "createdAt": "2020-11-25T14:57:48.737Z",
            //         "updatedAt": "2020-11-25T14:57:48.737Z",
            //         "__v": 0
            //     },

            //     {
            //         "_id": "5fbe70ec778ff67b162ddc5f",
            //         "status": "Not Done",
            //         "createdBy": "5fbe51701d7530700b7a673f",
            //         "description": "Install Tivoli Business Systems Manager and appropriate patches on test or QA servers.",
            //         "title": "Install the product in the test/QA environment.	",
            //         "estimationTime": "4h",
            //         "createdAt": "2020-11-25T14:57:48.737Z",
            //         "updatedAt": "2020-11-25T14:57:48.737Z",
            //         "__v": 0
            //     },


            // ]
        };


    }

    async componentDidMount() {
        await this.getTaskList()
    }

    render() {
        console.log('Utility.sharedInsta    ' + NetworkManager.networkManagerInstance.token)
        return (
            <View style={styles.container} >
                <View style={{ height: 100, width: '100%', backgroundColor: Color.primaryColor, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }} >
                    <TouchableOpacity
                        onPress={async () => {
                            NetworkManager.networkManagerInstance.token = ''

                            Utility.sharedInstance.token = ''
                            Utility.sharedInstance.name = ''
                            Utility.sharedInstance.email = ''
                            Utility.sharedInstance.id = ''
                            await AsyncStorage.setItem(AsyncStorageValues.token, '')
                            await AsyncStorage.setItem(AsyncStorageValues.name, '')
                            await AsyncStorage.setItem(AsyncStorageValues.email, '')
                            await AsyncStorage.setItem(AsyncStorageValues.id, '')
                            this.props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'Login' },

                                    ],
                                })
                            );
                        }}
                    >
                        <Text style={{ color: 'white' }}>LOGOUT</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={assets.loginSignUp.taskIcon} style={{ tintColor: Color.white, height: 30, width: 30 }} />
                        <Text style={{ fontSize: 20, color: Color.white, paddingLeft: 10 }}>" TASKS "</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}>        </Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={this.state.list}
                        contentContainerStyle={{ paddingTop: 40, paddingBottom: 200 }}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                    />
                </View>

                <View style={{ position: 'absolute', bottom: 0, height: 80, width: '100%', justifyContent: 'space-around', flexDirection: 'row', backgroundColor: Color.white }}>
                    <View style={{ justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: this.getStatusColor('Done'), height: 20, width: 20 }}></View>
                            <Text>  COMPLETED</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: this.getStatusColor('Not Done'), height: 20, width: 20 }}></View>
                            <Text>  Not Done</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: this.getStatusColor('In-progress'), height: 20, width: 20 }}></View>
                            <Text>  In-progress</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: this.getStatusColor('Cancelled'), height: 20, width: 20 }}></View>
                            <Text>  Cancelled</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        this.setState({
                            isNoteModalVisible: !this.state.isNoteModalVisible,
                            title: '',
                            estimatedHrs: '',
                            desc: '',
                        },
                        )
                    }
                    style={{ position: 'absolute', bottom: 80, right: 40, height: 60, width: 60, borderRadius: 30, backgroundColor: Color.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={assets.loginSignUp.plusIcon} />
                </TouchableOpacity>
                {this.taskPopup()}
            </View>
        );
    }

    // ["Not Done", "In-progress", "Done", "Cancelled"],
    renderItem(item, index) {
        return (
            <View style={{ height: 80, alignItems: 'center', }}>
                <View style={{ height: 70, width: '90%', backgroundColor: this.getStatusColor(item.status), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                    <View style={{ flex: 0.8, alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={1}>{item.title}</Text>
                            <Text style={{ fontSize: 12 }}>{item.description}</Text>
                        </View>
                    </View>

                    {item?.Efficency && <View>
                        <Text>Efficiency</Text>
                        <Text>{parseFloat(item.Efficency).toFixed(1)} %</Text>
                    </View>}
                    {(item.status == 'Not Done' || item.status == 'In-progress') && <OptionsMenu
                        button={assets.loginSignUp.moreIcon}
                        buttonStyle={{ width: 32, height: 20, margin: 7.5, resizeMode: "contain" }}
                        destructiveIndex={1}
                        options={["Edit", "Cancel", item.status == 'In-progress' ? 'Mark Completed' : 'Start Now']}
                        actions={[() => {
                            console.log('item.estimationTime' + item.estimationTime)
                            this.setState({
                                isEditEnable: true,
                                isNoteModalVisible: !this.state.isNoteModalVisible,
                                title: item.title,
                                estimatedHrs: parseInt(item.estimationTime) + '',
                                desc: item.description,
                                taskId: item._id
                            })


                        }, () => {

                            this.cancelTask(item._id)
                        }, () => {
                            this.setState({
                                estimatedHrs: parseInt(item.estimationTime) + '',
                                taskId: item._id
                            })

                            this.startAndEndTask(item._id, item.status)
                        }]} />}
                </View>
                <View style={{ height: 10, width: '100%' }}>

                </View>
            </View>
        )
    }



    addNoteToggleModal = () => {
        this.setState({ isNoteModalVisible: !this.state.isNoteModalVisible, isEditEnable: false });
    };

    taskPopup() {

        return (
            <Modal isVisible={this.state.isNoteModalVisible}

                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} hasBackdrop={true} coverScreen={true} onBackdropPress={this.addNoteToggleModal}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <View style={{ borderRadius: 10, borderColor: 'rgba(117, 117, 117, 0.48)', backgroundColor: 'white', height: (height * 0.688), width: (width * 0.85), alignItems: 'center' }}>
                        <Image style={{ marginTop: 25 }} source={assets.loginSignUp.noteicon}></Image>
                        <Text style={[{ marginLeft: (width * 0.042), marginTop: 10 }]}>Add Task</Text>
                        <Text style={[{
                            fontSize: 12,
                            color: colors.grayTextColor,
                            marginTop: 4
                        }]}>{this.state.date}</Text>

                        <TextInput
                            ref={(ref) => { this.noteTextInput = ref; }}
                            style={{
                                marginTop: (height * 0.019),
                                height: 40,
                                width: (width * 0.74),
                                borderRadius: 10,
                                borderColor: colors.grayTextColor,
                                borderWidth: 0.75,
                                padding: 13,
                                fontSize: 12,
                                color: colors.grayTextColor
                            }}
                            placeholder={'Task title'}
                            textAlignVertical='top'
                            maxLength={200}
                            value={this.state.title}
                            onChangeText={(text) => this.setState({ title: text })}
                        >
                        </TextInput>

                        <TextInput
                            ref={(ref) => { this.noteTextInput = ref; }}
                            style={{
                                alignContent: 'flex-start',
                                marginTop: (height * 0.019),
                                height: 40,
                                width: 150,
                                borderRadius: 10,
                                borderColor: colors.grayTextColor,
                                borderWidth: 0.75,
                                padding: 13,
                                fontSize: 12,
                                color: colors.grayTextColor
                            }}
                            placeholder={'Estimated time (In hrs)'}
                            textAlignVertical='top'
                            keyboardType={'number-pad'}
                            value={this.state.estimatedHrs}
                            onChangeText={(text) => this.setState({ estimatedHrs: text })}
                        >
                        </TextInput>
                        <TextInput
                            ref={(ref) => { this.noteTextInput = ref; }}
                            style={{
                                marginTop: (height * 0.019),
                                height: height > 800 ? (height * 0.225) : (height * 0.20),
                                width: (width * 0.74),
                                borderRadius: 10,
                                borderColor: colors.grayTextColor,
                                borderWidth: 0.75,
                                padding: 13,
                                fontSize: 12,
                                color: colors.grayTextColor
                            }}
                            placeholder={'Task description'}
                            multiline={true} textAlignVertical='top'
                            maxLength={200}
                            value={this.state.desc}
                            onChangeText={(text) => this.setState({ desc: text })}
                        >
                        </TextInput>
                        <View style={{ paddingTop: 20, width: '100%' }}>
                            <ButtonComponent
                                callBack={() => {
                                    if (this.state.isEditEnable) {
                                        this.editTask()
                                    } else {
                                        this.createTaskApiHandler()
                                    }

                                }}
                                buttonCont={{ paddingTop: 20 }}
                                backgroundColor={colors.primaryColor}
                                buttonText={'CREATE TASK'}
                                color={colors.white}
                            />
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    changeStatus = () => {

    }

    getStatusColor(status) {
        if (status == 'Not Done')
            return '#db9e9e'
        if (status == 'In-progress')
            return '#afb2de'
        if (status == 'Done')
            return '#afdec5'
        if (status == 'Cancelled')
            return '#a0a3a1'

    }

    getTaskList = async () => {
        let api = apis.taskListing + "/" + Utility.sharedInstance.id
        let res = await NetworkManager.networkManagerInstance.fetchRequest(api, apis.getRequest, true, {}, () => this.getTaskList())

        if (res.status == 200) {
            showToast(res.message)
            this.setState({ list: res.data })
        } else {
            showToast(res.message)

        }

    }

    editTask = async () => {
        let data = {}
        data.createdBy = Utility.sharedInstance.id
        data.description = this.state.desc
        data.title = this.state.title
        data.estimationTime = this.state.estimatedHrs

        let api = apis.editDetail + "/" + this.state.taskId

        let res = await NetworkManager.networkManagerInstance.fetchRequest(api, apis.putRequest, true, data, () => this.editTask())

        if (res.status == 200) {
            await this.getTaskList()

            this.addNoteToggleModal()
        } else {
            showToast(res.message)
            this.addNoteToggleModal()
        }

    }
    cancelTask = async (id) => {
        let data = {}
        let api = apis.editDetail + "/" + id
        data.createdBy = Utility.sharedInstance.id
        data.status = 'Cancelled'

        let res = await NetworkManager.networkManagerInstance.fetchRequest(api, apis.putRequest, true, data, () => this.getTaskList())

        if (res.status == 200) {
            await this.getTaskList()
            showToast(res.message)

        } else {
            showToast(res.message)

        }

    }
    startAndEndTask = async (id, status) => {
        let d = new Date();
        let n = d.getTime();
        // ["Not Done", "In-progress", "Done", "Cancelled"],
        let data = {}
        let api = apis.editDetail + "/" + id
        data.createdBy = Utility.sharedInstance.id
        data.status = status == 'In-progress' ? 'Done' : 'In-progress'
        if (status == 'In-progress') {
            data.EndTime = n
        } else {
            data.StartTime = n
        }

        data.estimationTime = this.state.estimatedHrs

        let res = await NetworkManager.networkManagerInstance.fetchRequest(api, apis.putRequest, true, data, () => this.getTaskList())

        if (res.status == 200) {
            await this.getTaskList()
            showToast(res.message)

        } else {
            showToast(res.message)

        }
    }

    createTaskApiHandler = async () => {
        let data = {}
        data.createdBy = Utility.sharedInstance.id
        data.description = this.state.desc
        data.title = this.state.title
        data.estimationTime = this.state.estimatedHrs


        let res = await NetworkManager.networkManagerInstance.fetchRequest(apis.createTask, apis.postRequest, true, data, () => this.createTaskApiHandler())

        if (res.status == 200) {
            showToast(res.message)
            this.getTaskList()
            this.setState({ isNoteModalVisible: false })
        } else {
            showToast(res.message)
            this.setState({ isNoteModalVisible: false })
        }

    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1
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
