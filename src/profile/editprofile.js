import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    Dimensions,
    Image,
    StyleSheet,
    Button,
    TextInput,
    Picker,
    Switch,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    Keyboard,
} from "react-native";
import Button1 from "../customComponent/button1";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useState } from "react";
import Input from "../customComponent/input";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { API_URL, IMG_URL } from "../url/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { change_user_detail } from "../../store/actions/user_action";
import { set } from "react-native-reanimated";
import Toast from "react-native-root-toast";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
const Editprofile = ({
    navigation,
    route,
    username,
    profile_pic,
    location,
    about_me,
    gender,
    dob,
    name,
    user_id,
    first_name,
    last_name,
    is_private,
    updateUser,
}) => {
    const defaultProfileImg = require("../../assets/profile_picture.png");
    const ref = useRef();

    const { refresh_edit } = route.params;
    const [refresh, setrefresh] = useState(false);

    const focused = useIsFocused();

    useEffect(()=>{
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        // fetch_user();


        // const [fname, setFirstname] = React.useState(first_name);
        // const [lname, setLastname] = React.useState(last_name);
        // const [uname, setUsername] = React.useState(username);
        // about_me.replaceAll("\\n", "\n");
        // const [about, setAboutme] = React.useState(about_me.replaceAll("\\", ""));
        // const [location1, setLocation] = React.useState(location);
        // const [gender1, setGender] = useState(gender);

        setFirstname(first_name);
        setLastname(last_name);
        setAboutme(about_me.replace(/\\n/g , '\n'));
        setLocation(location);
        setGender(gender);

    },[route,navigation])

    // if (route.params != refresh_edit) {
    //     setrefresh(!refresh);
    // }

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", () => {
    //         console.log("called called *********");
    //         fetch_user();
    //     });

    //     return unsubscribe;
    // }, [navigation]);

    // useFocusEffect(()=>{
    //     fetch_user();
    // })

    const fetch_user = () => {
        setIsLoading(true);
        fetch(API_URL + "/user_details.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.error == "1") {
                    updateUser(responseJson.data);

                    setIsLoading(false);
                    //  setTimeout(() => {
                    //     setIsLoading(false);
                    //     setShowToast(true);
                    // }, 2000);
                    //  setToastMsg("Profile Updated");

                    // setTimeout(() => {
                    //     setShowToast(false);
                    // }, 4000);
                } else {
                    console.log(responseJson.error_msg);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // alert(location);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Edit Profile",
            headerLeft: () => (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.toggleDrawer();
                            Keyboard.dismiss();
                        }}
                    >
                        <Entypo
                            name="menu"
                            size={28}
                            color="#fff"
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "#B2C248",
            },
        });
    }, [navigation]);
    // alert(IMG_URL+profile_pic);
    // alert(username);
    // const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(true);

    // const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate || date;
    //     setDate(currentDate);
    // };

    // const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    // };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    //console.log(route);
    //const data = route.params;

    const [date, setDate] = React.useState(dob);

    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };
    
    const showTimepicker = () => {
        showMode("time");
    };

    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    const ref_input4 = useRef(null);
    const ref_input5 = useRef(null);
    
    const [fname, setFirstname] = React.useState(first_name);
    const [lname, setLastname] = React.useState(last_name);
    const [uname, setUsername] = React.useState(username);
    about_me.replace(/\\n/g, "\n");

    const [about, setAboutme] = React.useState(about_me.replace(/\\/g, ""));
    const [location1, setLocation] = React.useState(location);
    const [gender1, setGender] = useState(gender);
    
    const [addressText, setAddressText] = React.useState("asdf");
    // const [dob, setDob] = React.useState('');

    const [newuser, setNewUser] = React.useState([]);

    // const [date, setDate] = React.useState('');

    // alert(about_me);
    const [isLoading, setIsLoading] = useState(false);
    const [isImage, setIsImage] = useState(false);

    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
        // setTimeout(() => {
            setLoading(false);
        // }, 5000);
    };

    const [isEnabled, setIsEnabled] = useState(
        is_private === "0" ? false : true
    );
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const [image, setImage] = useState(profile_pic);

    useEffect(() => {
        ref.current?.setAddressText(location1);
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, [navigation, ref]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });
        console.log("hgdhghs");
        console.log(result);

        if (!result.cancelled) {
            setIsImage(true);
            setImage(result.uri);
            console.log(image);
        }
    };

    //location................
    // useEffect(() => {
    //     CheckIfLocationEnabled();
    //     GetCurrentLocation();
    //   }, []);

    //   // create the handler method

    //   const GetCurrentLocation = async () => {
    //     let { status } = await Location.requestPermissionsAsync();

    //     if (status !== 'granted') {
    //       Alert.alert(
    //         'Permission not granted',
    //         'Allow the app to use location service.',
    //         [{ text: 'OK' }],
    //         { cancelable: false }
    //       );
    //     }

    //     let { coords } = await Location.getCurrentPositionAsync();

    //     if (coords) {
    //       const { latitude, longitude } = coords;
    //       let response = await Location.reverseGeocodeAsync({
    //         latitude,
    //         longitude,

    //       });
    //       setLatitude(latitude);
    //       setLongitude(longitude);

    //       for (let item of response) {
    //         let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

    //         setDisplayCurrentAddress(address);
    //       }
    //     }
    //   };

    const editprofile_button = () => {
        setIsLoading(true);

        let formData = new FormData();

        if (image != null && image != "" && image != undefined && isImage) {
            var localUri = image;
            let filename = localUri.split("/").pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            formData.append("image", {
                uri: localUri,
                name: filename,
                type: type,
            });
            formData.append("user_id", user_id);
            // console.log("hello"+uri);
            //console.log(IMG_URL+profile_pic);
            console.log(formData);
        }

        console.log(IMG_URL + profile_pic);

        // formData.append('name',fname+lname);
        formData.append("first_name", fname);
        formData.append("last_name", lname);
        formData.append("username", uname);
        formData.append("dob", date);
        formData.append("location", location1);
        formData.append("gender", gender1);
        formData.append("about_me", about);
        formData.append("updte", "1");
        formData.append("is_private", isEnabled);
        //formData.append('user_id',JSON.parse(value));
        formData.append("user_id", user_id);
        console.log(formData);

        fetch(API_URL + "/create_profile.php", {
            method: "POST", // or 'PUT'
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.error == "1") {
                    update_user();
                } else {
                    setIsLoading(false);
                    alert(responseJson.error_msg);
                }
            })
            .catch(function (error) {
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });

        //});
        //});

        const update_user = () => {
            fetch(API_URL + "/user_details.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user_id,
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.error == "1") {
                        updateUser(responseJson.data);

                        // setTimeout(() => {
                            setIsLoading(false);
                            setShowToast(true);
                        // }, 2000);
                        setToastMsg("Profile Updated");

                        setTimeout(() => {
                            setShowToast(false);
                        }, 4000);
                    } else {
                        console.log(responseJson.error_msg);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <TouchableOpacity
                            onPress={() => {
                                pickImage();
                            }}
                        >
                            {profile_pic && !isImage ? (
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 60,
                                        borderWidth: 1,
                                        borderColor: "transparent",
                                        alignSelf: "center",
                                    }}
                                    source={{ uri: IMG_URL + profile_pic }}
                                />
                            ) : image === "" ? (
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 60,
                                        borderWidth: 1,
                                        borderColor: "#9B9B9B",
                                        alignSelf: "center",
                                    }}
                                    source={defaultProfileImg}
                                />
                            ) : (
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 60,
                                        borderWidth: 1,
                                        borderColor: "#9B9B9B",
                                        alignSelf: "center",
                                    }}
                                    source={{ uri: image }}
                                />
                            )}

                            <View
                                style={{
                                    alignSelf: "center",
                                    width: 30,
                                    height: 30,
                                    borderRadius: 20,
                                    backgroundColor: "#F5866B",
                                    marginLeft: 70,
                                    marginTop: -30,
                                }}
                            >
                                <Feather
                                    name="edit-3"
                                    size={18}
                                    color="black"
                                    style={{
                                        alignSelf: "center",
                                        paddingTop: 5,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TextInput
                            style={{
                                height: 20,
                                borderBottomColor: "#C0C0C0",
                                width: "100%",
                                borderBottomWidth: 0.5,
                                marginTop: 30,
                            }}
                            placeholder="Firstname"
                            value={fname}
                            onChangeText={(value) => {
                                setFirstname(value);
                            }}
                            returnKeyType="next"
                            ref={ref_input1}
                            onSubmitEditing={() => {
                                ref_input2.current.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={{
                                height: 20,
                                width: "100%",
                                borderBottomColor: "#C0C0C0",
                                borderBottomWidth: 0.5,
                                marginTop: 30,
                            }}
                            placeholder="Lastname"
                            value={lname}
                            onChangeText={(value) => {
                                setLastname(value);
                            }}
                            returnKeyType="next"
                            ref={ref_input2}
                            onSubmitEditing={() => {
                                ref.current.focus();
                            }}
                            blurOnSubmit={false}
                        />

                        {/* <TextInput
                    style={{ height: 20, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30 }}
                    placeholder='Username'
                    value={uname}
                    onChangeText={(value)=>{setUsername(value)}}
                    returnKeyType="next"
                    ref={ref_input3}
                    onSubmitEditing={() => {
                        ref_input4.current.focus();
                    }}
                    blurOnSubmit={false}
    
                /> */}

                        <View
                            style={{
                                height: 40,
                                borderBottomColor: "#C0C0C0",
                                borderBottomWidth: 0.5,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <DatePicker
                                style={{
                                    height: 40,
                                    borderBottomColor: "#C0C0C0",
                                    borderBottomWidth: 0.5,
                                    borderTopWidth: 0,
                                }}
                                date={date}
                                //showIcon={false}
                                mode="date"
                                placeholder="Birthday"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                format="YYYY-MM-DD"
                                minDate="1920-01-01"
                                maxDate="3000-01-01"
                                onDateChange={(date) => {
                                    setDate(date);
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 20,
                                    marginLeft: 10,
                                    color: "#C0C0C0",
                                }}
                            >
                                Birthday
                            </Text>

                            {/* <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    /> */}
                        </View>

                        <View
                            style={{
                                height: 20,
                                borderBottomColor: "#C0C0C0",
                                borderBottomWidth: 0.5,
                                marginTop: 30,
                            }}
                        >
                            {/* <Picker
                            selectedValue={gender1}
                            style={{ height: 40, width: 340, marginTop:10, borderBottomWidth:0.5, borderBottomColor: '#C0C0C0', }}
                            onValueChange={(value, itemIndex) => setGender(value)}
                            placeholder="Gender"
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                    </Picker> */}

                            <RNPickerSelect
                                placeholder={{ label: "Gender" }}
                                value={gender1}
                                onValueChange={(value) => setGender(value)}
                                items={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                ]}
                            />
                        </View>

                        {/* <View 
                    onPress={() => navigation.navigate('Maplocation')}

                    //style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#C0C0C0',borderBottomWidth:0.5}}>
                    style={{flexDirection:'row', justifyContent:'space-around', marginLeft:20, marginRight:20}}>


                       

                    <TextInput
                        style={{ height: 20,width:Dimensions.get('screen').width-80, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30, fontSize:14 }}
                        //style={{ height: 20,width:300, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30 }}
                        placeholder="Location"
                        value={location1}
                        onChangeText={(value)=>{setLocation(value)}}
                        returnKeyType="next"
                        ref={ref_input4}
                        onSubmitEditing={() => {
                            ref_input5.current.focus();
                        }}
                        blurOnSubmit={false}
    

                    />
                    <Ionicons 
                        onPress={() => navigation.navigate('Maplocation')}
                        name="ios-location" size={20} style={{marginTop:20}} color="black" /> 
            
                </View> */}
                        <Text
                            style={{
                                fontSize: 16,
                                marginTop: 10,
                                marginBottom: 10,
                                fontWeight: "bold",
                            }}
                        >
                            Location
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#C0C0C0",
                                borderRadius: 2,
                            }}
                        >
                            <GooglePlacesAutocomplete
                                ref={ref}
                                placeholder="Location"
                                onPress={(data, details) => {
                                    // 'details' is provided when fetchDetails = true
                                    setLocation(details.terms[0]["value"]);
                                    console.log(details.terms[0]["value"]);
                                }}
                                query={{
                                    key: "AIzaSyB4QdZFNywIg4_KwOO_ZpuCHrJHg_D9a34",
                                    language: "en",
                                }}
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    fontWeight: "bold",
                                }}
                            >
                                About Me
                            </Text>
                            <View
                                style={{
                                    borderWidth: 0.5,
                                    height: 120,
                                    borderColor: "#C0C0C0",
                                    borderRadius: 2,
                                }}
                            >
                                <TextInput
                                    multiline={true}
                                    style={{
                                        height: 100,
                                        width:
                                            Dimensions.get("screen").width /
                                            1.42,
                                        textAlignVertical: "top",
                                        margin: 10,
                                    }}
                                    value={about}
                                    onChangeText={(value) => {
                                        setAboutme(value);
                                    }}
                                    // returnKeyType="done"
                                    ref={ref_input5}
                                    // onSubmitEditing={() => {
                                    //     ref_input2.current.focus();
                                    // }}
                                    // blurOnSubmit={false}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                                paddingBottom: 10,
                                borderBottomColor: "#C0C0C0",
                                borderBottomWidth: 0.5,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <Entypo name="lock" size={24} color="#F5866B" />
                                <Text style={{ color: "#F5866B" }}>
                                    Private
                                </Text>
                            </View>

                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "#FEE0DA",
                                }}
                                thumbColor={isEnabled ? "#F5866B" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 10,
                                borderRadius: 20,
                                marginTop: 20,
                                backgroundColor: "#B2C248",
                            }}
                            onPress={() => editprofile_button()}
                        >
                            {isLoading ? (
                                <Text style={{ textAlignVertical: "center" }}>
                                    <ActivityIndicator
                                        color="#fff"
                                        size="small"
                                    />
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 16,
                                        fontFamily: "font2",
                                    }}
                                >
                                    Save
                                </Text>
                            )}
                        </TouchableOpacity>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state) => {
    const {
        dob,
        gender,
        username,
        name,
        location,
        about_me,
        profile_pic,
        user_id,
        first_name,
        last_name,
        is_private,
    } = state.userReducer;

    return {
        username,
        name,
        gender,
        dob,
        location,
        about_me,
        profile_pic,
        user_id,
        first_name,
        last_name,
        is_private,
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (value) => dispatch(change_user_detail(value)),
});

Editprofile.propTypes = {
    updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editprofile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
    },
    container1: {
        margin: 20,

        marginTop: 10,
    },

    text: {
        marginTop: 20,
        fontSize: 20,
    },
    labeltext: {
        fontSize: 10,
        marginTop: 10,
        color: "#A8A8A8",
    },
});
