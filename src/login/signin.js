import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
    ToastAndroid,
} from "react-native";
import Input from "../customComponent/input";
import { API_URL } from "../url/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_user_detail } from "../../store/actions/user_action";
import { FontAwesome, MaterialIcons, Fontisto } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { Overlay } from "react-native-elements";
import * as Location from "expo-location";

const Signin = ({ navigation, route, updateUser }) => {
    // console.error("Warning message");
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visible, setVisible] = React.useState(true);
    const [toastMsg, setToastMsg] = useState("");

    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        (async () => {
            const value = await AsyncStorage.getItem("userid").then(
                (value1) => {
                    console.log("Check Async " + value1);
                    if (value1 !== null) {
                        fetch_user(JSON.parse(value1));
                    } else {
                        // setTimeout(() => {
                            setVisible(false);
                        // }, 2000);
                    }
                }
            );
        })();
        return () => {
            unmounted = true;
        };
    }, []);

    const _validateEmail = (text) => {
        console.log("hello  " + text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log("asdfasfd" + reg.test(text));
        if (reg.test(text) === false) {
            if (Platform.OS == "ios") {
                setToastMsg("Please enter a valid email address ");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
            }

            setEmail("");
        } else {
            setEmail(text);
            console.log("Email is Correct");
            ref_input2.current.focus();
        }
    };

    // console.log(route);
    const data = route.params;

    const signin_button = () => {
        setIsLoading(true);
        if (email != "" && password != "") {
            let formData = new FormData();

            formData.append("email", email);
            formData.append("password", password);
            //formData.append('updte','1');
            console.log(formData);

            fetch(API_URL + "/login_check.php", {
                method: "POST", // or 'PUT'
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.error == 1) {
                        const async_id_value = AsyncStorage.setItem(
                            "userid",
                            JSON.stringify(responseJson.user_id)
                        );

                        // fetch_current_location(responseJson.user_id);

                        // setTimeout(() => {
                            setIsLoading(false);
                        // }, 4000);
                        console.log(responseJson.error_msg);
                        console.log(responseJson);

                        fetch_user(responseJson.user_id);

                        // setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "DrawerTab" }],
                            });
                        // }, 2000);
                    } else {
                        setToastMsg(responseJson.error_msg);
                        // ToastAndroid.show(responseJson.error_msg, ToastAndroid.SHORT);

                        // setTimeout(() => {
                            setIsLoading(false);
                            setShowToast(true);
                        // }, 2000);

                        setTimeout(() => {
                            setShowToast(false);
                        }, 4000);
                        console.log(responseJson.error_msg);
                    }
                })
                .catch(function (error) {
                    console.log(
                        "There has been a problem with your fetch operation: " +
                            error.message
                    );
                    // ADD THIS THROW error

                    alert(error);
                    setIsLoading(false);
                    throw error;
                });
        } else {
            setToastMsg("Both field are required!");
            // setTimeout(() => {
                setIsLoading(false);
                setShowToast(true);
            // }, 3000);

            setTimeout(() => {
                setShowToast(false);
            }, 4000);
        }
    };

    const fetch_user = (value) => {
        fetch(API_URL + "/user_details.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: value,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.error == "1") {

                    updateUser(responseJson.data);

                    // setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "DrawerTab" }],
                        });
                    // }, 2000);

                } else {
                    console.log(responseJson.error_msg);
                    
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetch_current_location = (value) => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            fetch(API_URL + "/update_latlong.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: value,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error == 0) {
                        // setTimeout(() => {
                            setIsLoading(false);
                        // }, 4000);
                        console.log(responseJson.error_msg);
                        console.log(responseJson);

                        fetch_user(responseJson.user_id);

                        // setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "DrawerTab" }],
                            });
                        // }, 2000);
                    } else {
                        alert("try after some time");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        })();
    };

    if (visible) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                }}
            >
                <ActivityIndicator color="#B2C248" size="large" />
            </View>
        );
    } else {
        return (
            <SafeAreaView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.keyview}>
                                <Text style={styles.heading1}>WYDGYD</Text>
                            </View>

                            <Text style={styles.welcome}>Welcome !</Text>
                            <Text style={styles.text}>
                                Get Ready for a unique experience with your
                                "WYDGYD"
                            </Text>

                            <View style={styles.view1}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        height: 25,
                                        width: 25,
                                        borderRadius: 30,
                                        borderColor: "transparent",
                                        backgroundColor: "lightgrey",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text>
                                        <MaterialIcons
                                            name="email"
                                            size={16}
                                            color="#9B9B9B"
                                        />
                                    </Text>
                                </View>

                                <TextInput
                                    style={{
                                        paddingLeft: 10,
                                        width: Dimensions.get("screen").width,
                                    }}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={(value) => {
                                        setEmail(value);
                                    }}
                                    onSubmitEditing={(event) =>
                                        _validateEmail(event.nativeEvent.text)
                                    }
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={styles.view1}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        height: 25,
                                        width: 25,
                                        borderRadius: 30,
                                        borderColor: "transparent",
                                        backgroundColor: "lightgrey",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text>
                                        <Fontisto
                                            name="locked"
                                            size={15}
                                            color="#9B9B9B"
                                        />
                                    </Text>
                                </View>

                                <TextInput
                                    style={{
                                        paddingLeft: 10,
                                        width: Dimensions.get("screen").width,
                                    }}
                                    placeholder="Password"
                                    onChangeText={(value) => {
                                        setPassword(value);
                                    }}
                                    returnKeyType="done"
                                    ref={ref_input2}
                                    // onSubmitEditing={() => {
                                    //     ref_input2.current.focus();
                                    // }}
                                    // blurOnSubmit={false}
                                    secureTextEntry={true}
                                />
                            </View>

                            {/* <Input 
                icon='locked' icontype="Fontisto" color="#9B9B9B"
                styles={{fontSize:20, padding:10, height:44,BorderBottomWidth:1, width:250, }} 
                placeholder='Password'
                value={password}
                ref={ref_input2}
                secureTextEntry={true}
                onChangeText={(value)=>{setPassword(value)}}
                returnKeyType="next"

            /> */}

                            <View
                                style={{
                                    alignSelf: "flex-end",
                                    paddingRight: 40,
                                }}
                            >
                                <Text
                                    onPress={() =>
                                        navigation.navigate("Forgotpassword")
                                    }
                                    style={{ color: "red", margin: 10 }}
                                >
                                    Forgot Password ?
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => signin_button()}
                                style={styles.signinbtn}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        color="#fff"
                                        size="small"
                                    />
                                ) : (
                                    <Text style={styles.btntext}>Sign In</Text>
                                )}
                            </TouchableOpacity>

                            <View style={styles.flex}>
                                <Text style={{ fontFamily: "font6" }}>
                                    Don't have an account
                                </Text>
                                <Text
                                    onPress={() =>
                                        navigation.navigate("Signup")
                                    }
                                    style={{
                                        fontFamily: "font6",
                                        color: "red",
                                    }}
                                >
                                    {" "}
                                    SIGN UP
                                </Text>
                            </View>
                            <Toast
                                visible={showToast}
                                position={100}
                                shadow={false}
                                animation={true}
                                hideOnPress={true}
                            >
                                {toastMsg}
                            </Toast>
                        </View>
                        <Overlay
                            isVisible={isLoading}
                            overlayBackgroundColor="transparent"
                            overlayStyle={{ opacity: 0, shadowOpacity: 0 }}
                        ></Overlay>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (value) => dispatch(change_user_detail(value)),
});

Signin.propTypes = {
    updateUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Signin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height + 50,
        width: Dimensions.get("screen").width,
        //  paddingLeft:30,
        //paddingRight:30,
    },
    keyview: {
        margin: 50,
        alignSelf: "center",
        backgroundColor: "#B2C248",
        width: 250,
        height: 130,
        justifyContent: "center",
        borderRadius: 10,
    },
    heading1: {
        fontSize: 25,
        color: "#fff",
        fontFamily: "font2",
        alignSelf: "center",
    },
    view1: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 50,
        marginRight: 50,
        margin: 6,
        fontSize: 20,
        padding: 10,
        height: 44,
        //width:300,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(0, 0, 0, 0.25)",
    },

    welcome: {
        alignSelf: "center",

        fontSize: 25,
        fontFamily: "font2",
    },
    text: {
        textAlign: "center",
        fontFamily: "font6",
        margin: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    img: {
        width: 30,
        height: 30,
        margin: 80,
        backgroundColor: "#DCDCDC",
        resizeMode: "cover",
        borderRadius: 30,
    },
    signinbtn: {
        backgroundColor: "#B2C248",
        width: 150,
        height: 50,
        alignSelf: "center",
        borderRadius: 30,
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    btntext: {
        fontSize: 20,
        fontFamily: "font6",
        color: "#fff",
        alignSelf: "center",
        padding: 10,
    },
    flex: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
