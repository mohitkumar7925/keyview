import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Button1 from "../customComponent/button1";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "../url/url";
import Toast from "react-native-root-toast";
import { Overlay } from "react-native-elements";
const Forgotpassword = ({ navigation }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const [email, setEmail] = React.useState("");

    const forgot_button = () => {
        
        _validateEmail(email)
        
    };

    const fetch_user = () => {
        setIsLoading(true);

        let formData = new FormData();

        formData.append("email", email);
        //formData.append('updte','1');

        console.log(formData);

        fetch(API_URL + "/forgot_apis.php", {
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
                    setIsLoading(false);
                    // alert(responseJson.error_msg);
                    navigation.navigate("Verificationcode", {
                        userid: responseJson.user_id,
                        msg: responseJson.error_msg,
                        email: responseJson.email,
                    });
                } else {
                    setToastMsg("Please enter a valid email address");

                    // setTimeout(() => {
                        setIsLoading(false);
                        setShowToast(true);
                    // }, 1000);

                    setTimeout(() => {
                        setShowToast(false);
                    }, 6000);
                    console.log(responseJson.error_msg);
                }
            })
            .catch(function (error) {
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
                setIsLoading(false);
            });
    };

    const _validateEmail = (text) => {
        console.log("hello  " + text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log("asdfasfd" + reg.test(text));
        if (reg.test(text) === false) {
            if (Platform.OS == "ios") {
                setToastMsg("Please enter a valid email address");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
            }

            setEmail("");
        } else {
            // setEmail(text);
            console.log("Email is Correct");
            fetch_user();

        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        style={{ marginBottom: 20 }}
                        name="arrowleft"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>

                <Text style={styles.welcome}>Forgot Password ?</Text>
                <Text style={styles.text}>
                    Please enter your Email Id linked with this account{" "}
                </Text>

                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: "#C0C0C0",
                        borderBottomWidth: 0.5,
                        marginTop: 25,
                    }}
                    placeholder="info@example.com"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    // onSubmitEditing={(event) =>
                    //     forgot_button(event.nativeEvent.text)
                    // }
                    returnKeyType="next"
                />
                {/* <Button1 
                    //onPress={() => navigation.navigate('Verificationcode')}
                    title={
                        isLoading ? (<ActivityIndicator color="#fff" size="small"  />) : "Submit"
                        //    (<AntDesign name="checkcircle" size={24} color="black" />)
                    }
                    onPress={() => forgot_button()}  */}

                {/* style1={{backgroundColor:'#B2C248',marginTop:50}}>
                </Button1> */}
                <TouchableOpacity
                    style={{
                        width: Dimensions.get("window").width / 1.25,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                        borderRadius: 20,
                        marginTop: 30,
                        marginBottom: 50,
                        backgroundColor: "#B2C248",
                    }}
                    onPress={() => forgot_button()}
                >
                    {isLoading ? (
                        <Text
                            style={{
                                textAlignVertical: "center",
                                alignSelf: "center",
                            }}
                        >
                            <ActivityIndicator color="#fff" size="small" />
                        </Text>
                    ) : (
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                                fontFamily: "font2",
                            }}
                        >
                            Send Code
                        </Text>
                    )}
                </TouchableOpacity>

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
        </View>
    );
};

export default Forgotpassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container1: {
        marginHorizontal: 20,
        paddingTop: 20,
    },
    keyview: {
        margin: 80,
        backgroundColor: "#B2C248",
        width: 250,
        height: 130,
        justifyContent: "center",
        borderRadius: 10,
    },
    heading1: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
    welcome: {
        fontFamily: "font2",
        fontSize: 25,
        color: "#B2C248",
    },
    text: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: "font6",
    },
});
