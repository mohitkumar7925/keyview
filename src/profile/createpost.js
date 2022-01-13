import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Portal,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import Button1 from "../customComponent/button1";
import {
    Ionicons,
    Entypo,
    AntDesign,
    Feather,
    FontAwesome,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import MapView from "react-native-maps";
import Maplocation from "./maplocation";
import * as Location from "expo-location";
import { API_URL, IMG_URL } from "../url/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants, Permissions } from "expo";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from "react-native-popup-dialog";
import { Overlay } from "react-native-elements";
import Overlayloading from "../customComponent/OverlayLoading";
import Toast from "react-native-root-toast";

const Createpost = ({
    navigation,
    route,
    profile_pic,
    user_id,
    value1,
    username,
    first_name,
    last_name,
}) => {
    const [showToast, setShowToast] = useState(true);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="left"
                            size={24}
                            color="white"
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

    const [uname, setUsername] = React.useState(username);
    const [description, setDescription] = React.useState("");
    //const [image, setImage] = useState();
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        "Wait, we are fetching you current location..."
    );
    const [currentAddress, setCurrentAddress] = useState(
        'Wait, we are fetching you current location..."'
    );
    const [isCurrent, setIsCurrent] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [currentLatitude, setCurrentLatitude] = useState("");
    const [currentLongitude, setCurrentLongitude] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [postId, setPostId] = useState("");
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState("");
    const [img_visible , set_img_visible] = useState(false);

    useEffect(() => {
        if (route.params?.data) {
            setDisplayCurrentAddress(route.params.data.location);

            setLatitude(route.params.data.latitude);
            setLongitude(route.params.data.longitude);
            setPostId(route.params.data.post_id);
        }
        if (route.params?.address) {
            setDisplayCurrentAddress(route.params.address);
            setLatitude(route.params.lat_long.latitude);
            setLongitude(route.params.lat_long.longitude);
        }
    });

    useEffect(() => {
        if (route.params?.data) {
            console.log(route.params);

            setDescription(
                route.params.data.description.replaceAll("\\n", "\n")
            );
        }

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
    }, [isCurrent]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });
        
        console.log("Testing");
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            set_img_visible(true)
            console.log(image);
        }
    };

    const GetCurrentLocation = async () => {
        setIsCurrent(true);
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission not granted",
                "Allow the app to use location service.",
                [{ text: "OK" }],
                { cancelable: false }
            );
        }

        let { coords } = await Location.getCurrentPositionAsync();

        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            setCurrentLatitude(latitude);
            setCurrentLongitude(longitude);

            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}, ${item.country}`;
                // alert(address);
                setCurrentAddress(address);
                setDisplayCurrentAddress(address);
                console.log('here is the starting of console of address')
                console.log(address)
                setLoading(false);
            }
        }
    };

    const [region, setRegion] = useState({});

    //location......................

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
            Alert.alert(
                "Location Service not enabled",
                "Please enable your location services to continue",
                [{ text: "OK" }],
                { cancelable: false }
            );
        } else {
            setLocationServiceEnabled(enabled);
        }
    };

    const crpost_button = () => {
        if (
            description != "" &&
            displayCurrentAddress != "" &&
            displayCurrentAddress !=
                "Wait, we are fetching you current location..."
        ) {
            setIsLoading(true);

            const userId = AsyncStorage.getItem("userid").then((value) => {
                if (
                    JSON.parse(value) != "" &&
                    JSON.parse(value) > 0 &&
                    JSON.parse(value) != null
                ) {
                    console.log("afasv" + value);
                    //alert(value);

                    let formData = new FormData();
                    if (image != null && image != "" && image != undefined) {
                        console.log("helllo");
                        console.log(image);
                        var localUri = image;
                        let name = localUri.split("/").pop();
                        let match = /\.(\w+)$/.exec(name);
                        let type = match ? `image/${match[1]}` : `image`;
                        formData.append("image", {
                            uri: localUri,
                            name: name,
                            type: type,
                        });
                    }

                    formData.append("user_id", JSON.parse(value));
                    if (isCurrent) {
                        formData.append("location", currentAddress);
                        formData.append("latitude", currentLatitude);
                        formData.append("longitude", currentLongitude);
                    } else {
                        formData.append("location", displayCurrentAddress);
                        formData.append("latitude", latitude);
                        formData.append("longitude", longitude);
                    }
                    formData.append("description", description);

                    formData.append("post_id", postId);
                    console.log(formData);

                    fetch(API_URL + "/create_post.php", {
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
                                setUsername(responseJson.username);

                                // setTimeout(() => {
                                    setIsLoading(false);
                                    navigation.navigate("Userprofile");
                                // }, 2000);

                                // alert(responseJson.error_msg);
                            } else {
                                alert(responseJson.error_msg);
                            }
                        })

                        .catch(function (error) {
                            setIsLoading(false);
                            alert("Server bad response");
                            console.log(
                                "There has been a problem with your fetch operation: " +
                                    error.message
                            );
                            // ADD THIS THROW error
                            throw error;
                        });
                }
            });
        } else {
            alert("All field are required");
        }
    };

    const alert_button = () => {
        Alert.alert(
            "Location",
            "Would you like to use your current location",
            [
                { text: "Allow", onPress: () => GetCurrentLocation() },

                {
                    text: "Don't Allow",
                    onPress: () => navigation.navigate("MannualLocation"),
                },
            ],
            { cancelable: false }
        );
    };

    //   alert(description);
    const _onChangeText = (value) => {
        console.log(value)
        if (description.length <= 200) {
            setDescription(value);
        } else {
            setErrorMsg("Character limit is 200");

            setTimeout(() => {
                setShowToast(false);
            }, 4000);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems:'center'
                            }}
                        >
                            <View
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 60,
                                    shadowOpacity: 0.2,
                                    shadowOffset: { width: 0, height: 0 },
                                }}
                            >
                             {
                                 img_visible &&
                                  <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 60,
                                    }}
                                    //source={require('../../assets/icon/man.png')}
                                    source={{ uri: IMG_URL + profile_pic }}
                                />
                             }  
                            </View>
                            <Text style={{ marginLeft:10 ,  fontSize: 20 }}>
                                
                                {first_name} {last_name}
                            </Text>
                        </View>
                    </View>

                    <TextInput
                        multiline={true}
                        style={{
                            marginHorizontal: 10,
                            marginBottom: 20,
                            borderWidth: 1,
                            borderColor: "#D7D7D7",
                            borderRadius: 10,
                            height: 160,
                            width: "94%",
                            textAlignVertical: "top",
                            padding: 10,
                        }}
                        placeholder="Description..."
                        //numberOfLines={5}
                        blurOnSubmit={true}
                        value={description}
                        onChangeText={(value) => _onChangeText(value)}
                        maxLength={200}
                        returnKeyType="next"
                    />

                    <TouchableOpacity
                        onPress={() => {
                            pickImage();
                        }}
                        style={{
                            flexDirection: "row",
                            paddingBottom: 4,
                            marginHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor:'#ccc',
                            alignItems:'center',


                        }}
                    >
                        <MaterialCommunityIcons
                            name="image-multiple"
                            size={26}
                            color="#F9B7A7"
                        />
                        <Text style={{ paddingLeft: 10, fontSize: 16 , width:'70%' , }}>
                            Photo/Video{" "}
                        </Text>
                        <Image
                            style={{
                                width: 35,
                                height: 35,
                                alignSelf: "center",
                            }}
                            borderRadius={3}
                            source={{ uri: image }}
                        ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={
                            displayCurrentAddress !=
                            "Wait, we are fetching you current location..."
                                ? false
                                : false
                        }
                        onPress={() => alert_button()}
                        style={{
                            flexDirection: "row",
                            borderBottomWidth: 1,
                            marginHorizontal: 10,
                            marginTop: 10,
                            paddingBottom: 2,
                            borderBottomColor:'#ccc',
                            alignItems:'center'
                        }}
                    >
                        <Entypo name="location-pin" size={26} color="#F9B7A7" />

                        {isCurrent ? (
                            <Text
                                numberOfLines={2}
                                style={{
                                    paddingLeft: 10,
                                    width: "85%",
                                    fontSize: 16,
                                }}
                            >
                                {currentAddress}
                            </Text>
                        ) : displayCurrentAddress !=
                          "Wait, we are fetching you current location..." ? (
                            <Text
                                numberOfLines={2}
                                style={{
                                    marginLeft: 10,
                                    width: "90%",
                                    fontSize: 18,
                                }}
                            >
                                {displayCurrentAddress}
                            </Text>
                        ) : (
                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: "90%",
                                    fontSize: 18,
                                }}
                            >
                                Location
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginLeft: 10,
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginTop: 20,
                            marginBottom: 10,
                            backgroundColor: "#B2C248",
                        }}
                        onPress={() => crpost_button()}
                    >
                        {isLoading ? (
                            <Text style={{ textAlignVertical: "center" }}>
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
                                Upload Post
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                <Overlayloading visible={loading}>
                    Please wait...
                </Overlayloading>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

//export default Createpost;
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
    };
};

export default connect(mapStateToProps)(Createpost);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
    },
    container1: {
        marginHorizontal: 10,
        marginVertical: 30,
    },
    user: {
        height: 150,
        width: 450,
        padding: 40,
        backgroundColor: "#B2C248",
        flexDirection: "row",
        justifyContent: "flex-start",
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
        fontWeight: "bold",
        fontSize: 25,
        color: "#B2C248",
    },
    text: {
        marginTop: 20,
        fontSize: 20,
    },
    map: {
        width: Dimensions.get("window").width,
        height: 530,
    },
    tab: {
        flexDirection: "column",
    },
});
