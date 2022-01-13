import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    ActivityIndicator,
    Modal,
} from "react-native";
import {
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    Ionicons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { API_URL, IMG_URL } from "../url/url";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { Image } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { Overlay } from "react-native-elements";
import Toast from "react-native-root-toast";

const Username = ({
    navigation,
    route,
    user_id,
    profile_pic,
    first_name,
    latitude,
    longitude,
}) => {
    const [s_color, set_s_color] = useState(-1);

    const [change, set_change] = useState(false);
    const [post_seen_form, set_post_seen_form] = useState([]);

    const [save, set_save] = useState();
    // useEffect(() => {
    //     set_save(false);
    // }, []);

    useEffect(() => {
        // console.log(change)
        console.log("refreshing...");
    }, [change]);

    const [isPost, setIsPost] = useState(true);
    const defaultProfileImg = require("../../assets/profile_picture.png");
    const privateImg = require("../../assets/lock.jpg");
    const defaultPostImg = require("../../assets/post_img.png");
    const [value, onChangeText] = React.useState("");
    const [uname, setUsername] = React.useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState("Add as a Friend");
    const [buttonCheck, setButtonCheck] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [fstatus, setFstatus] = React.useState("");
    const [post, setPost] = useState([]);

    const [errorMsg, setErrorMsg] = useState(null);
    const [friend, setFriend] = React.useState([]);
    const [friendList, setFriendList] = React.useState([]);
    const [total, setTotal] = React.useState("");
    const [showToast, setShowToast] = useState(false);
    const [region, setRegion] = useState({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.00503,
        longitudeDelta: 0.00534,
    });

    const hit_seen_post = (index) => {
        let data = new FormData();
        
        data.append("user_id" ,datauser.user_id ) 
        data.append("post_id", post[index].post_id);
        data.append("updte", "1");

        console.log("*****\n\n");
        // console.log(data);
        console.log(index);

        fetch(API_URL + "/post_seen.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: data,
        })
            .then((response) => {
                console.log("post seen");
                // console.log(response.json());
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        
        console.log("entered focuseffect ");
    
        if (route.params.datauser.friendstatus) {
            setFstatus(route.params.datauser.friendstatus);
            console.log("$$$$$$$$$$$$$$$");
            // console.log(route.params.datauser);
        }

        if (
            datauser.is_private == "0" ||
            (route.params.datauser.friendstatus != "" &&
                route.params.datauser.friendstatus[0]["status"] == "Accepted")
        ) {
            console.log("fetch_post__");
            fetch_post();
        } else {
            setIsPost(false);
        }

        fetch_friend();
       
    }, [navigation, route]);

    const datauser = route.params.datauser;

    // console.log(fstatus);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: Dimensions.get("screen").width / 1.1,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="left"
                            size={24}
                            color="white"
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 4,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                textAlign: "center",
                                fontFamily: "font2",
                                fontSize: 20,
                            }}
                        >
                            {datauser.first_name} {datauser.last_name}
                        </Text>
                    </View>
                </View>
            ),
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "#B2C248",
            },
        });
    }, [navigation]);

    // useEffect(() => {
    //     console.log("entered focuseffect ");

    //     if (
    //         datauser.is_private == "0" ||
    //         (route.params.datauser.friendstatus != "" &&
    //             route.params.datauser.friendstatus[0]["status"] == "Accepted")
    //     ) {
    //         console.log("fetch_post__");
    //         fetch_post();
    //     } else {
    //         setIsPost(false);
    //     }

    //     fetch_friend();
    // }, []);

    const sendrequest_button = () => {
        setIsLoading(true);

        let formData = new FormData();

        formData.append("client_id", user_id);
        formData.append("friend_id", datauser.user_id);
        // console.log(formData);
        //alert(formData);

        fetch(API_URL + "/send_request.php", {
            method: "POST", // or 'PUT'
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("adfasdf");
                // console.log(responseJson);

                if (responseJson.error == "1") {
                    setUsername(responseJson.username);
                    // setTimeout(() => {
                        setIsLoading(false);
                        alert(responseJson.error_msg);
                        setButtonCheck(true);
                        setRequest("Request Sent");
                    // }, 2000);
                } else {
                    if (responseJson.error == "2") {
                        setUsername(responseJson.username);
                        // setTimeout(() => {
                            setIsLoading(false);
                            alert(responseJson.error_msg);
                            setRequest("Add as a friend");
                        // }, 2000);
                    } else {
                        alert(responseJson.error_msg);
                        setIsLoading(false);
                    }
                }
            })
            .catch(function (error) {
                setIsLoading(false);
                alert("Network Problem");
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    };

    const fetch_accepted = () => {
        setIsLoading(true);
        let formData = new FormData();

        formData.append("client_id", user_id);
        formData.append("friend_id", datauser.user_id);

        fetch(API_URL + "/accept_request.php", {
            method: "POST", // or 'PUT'
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("adfasdf");
                // console.log(responseJson);
                if (responseJson.error == "1") {
                    setIsLoading(false);
                    alert(responseJson.error_msg);
                    navigation.goBack();
                } else {
                    setIsLoading(false);
                    alert(responseJson.error_msg);
                    navigation.goBack();
                }
            })
            .catch(function (error) {
                setIsLoading(false);
                alert("Network Problem");
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    };

    const fetch_rejected = () => {
        setIsLoading(true);
        let formData = new FormData();

        formData.append("client_id", user_id);
        formData.append("friend_id", datauser.user_id);

        fetch(API_URL + "/rejected_request.php", {
            method: "POST", // or 'PUT'
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("adfasdf");
                // console.log(responseJson);
                if (responseJson.error == "1") {
                    setIsLoading(false);
                    alert(responseJson.error_msg);
                    navigation.goBack();
                } else {
                    setIsLoading(false);
                    alert(responseJson.error_msg);
                    navigation.goBack();
                }
            })
            .catch(function (error) {
                setIsLoading(false);
                alert("Network Problem");
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    };

    const fetch_post = async () => {

        console.log("Loading post...");

        let formData = new FormData();
        // let userId = await AsyncStorage.getItem("userid");
        formData.append("user_id", datauser.user_id);
        console.log(user_id);
        formData.append("client_id" , user_id);
        // console.log(formData);
        fetch(API_URL + "/all_posts.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("helloooo");
                // console.log(responseJson);

                if (responseJson[0]["error"] != "0") {
                    setPost(responseJson);

                    let f = [];

                    for (let index = 0; index < responseJson.length; index++) {

                        if(responseJson[index].is_seen == "0" )
                        {

                            f.push("red");
                        }
                        else{
                            f.push("blue");
                        }
                        // console.log(f);

                        // post_seen_form.append(index.toString(), 'red');

                        // console.log(responseJson.length);
                    }
                    set_post_seen_form(f);

                    setRegion({
                        latitude: responseJson[0].latitude,
                        longitude: responseJson[0].longitude,
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                    });

                    if (responseJson == []) {
                        setErrorMsg("No post yet");
                        // setTimeout(() => {
                            setIsPost(false);
                            setShowToast(true);
                        // }, 2000);

                        setTimeout(() => {
                            setShowToast(false);
                        }, 4000);
                    } else {
                        // setTimeout(() => {
                            setIsPost(false);
                            setErrorMsg("");
                        // }, 2000);
                    }
                } else {
                    // console.log(responseJson);
                    setPost([]);
                    setErrorMsg("No post yet");

                    // setTimeout(() => {
                        setIsPost(false);
                        setShowToast(true);
                    // }, 2000);

                    setTimeout(() => {
                        setShowToast(false);
                    }, 4000);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetch_friend = async () => {
        let formData = new FormData();
        formData.append("user_id", datauser.user_id);
        formData.append("friend_id",user_id );

        // console.log(formData);

        fetch(API_URL + "/FriendListing.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // alert(responseJson[0]['error']);
                if (responseJson[0]["error"] == "1") {
                    setFriend(responseJson[0]["friends"]);
                    setFriendList(responseJson[0]["friends"]);
                    setTotal(responseJson[0]["frienCount"]);
                } else {
                    console.log("No friend list");
                }
            })

            .catch((error) => {
                console.error(error);
            });
    };

    const renderItemUser = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(false);
                    navigation.push("Username", { datauser: item });
                }}
                style={{
                    flexDirection: "row",
                    // shadowOpacity: 0.2,
                    // shadowOffset: { width: 0, height: 0 },
                    borderRadius: 10,
                    marginTop: 15,
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                    padding: 5,
                    alignItems: "center",
                    marginBottom: 2,
                }}
            >
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        resizeMode: "cover",
                        borderRadius: 40,
                    }}
                    PlaceholderContent={
                        <ActivityIndicator size="small" color="white" />
                    }
                    source={
                        item.profile_pic === ""
                            ? defaultProfileImg
                            : { uri: IMG_URL + item.profile_pic }
                    }
                />
                <View style={{}}>
                    <View
                        style={{
                            flexDirection: "row",
                            width: "55%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                marginLeft: 2,
                                fontFamily: "font2",
                            }}
                        >
                            {item.username}
                        </Text>
                        <Text
                            style={{
                                color: "red",
                                fontSize: 12,
                                marginLeft: 2,
                                fontFamily: "font2",
                            }}
                        >
                            {item.user_id == user_id ? "You" : ""}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 10,
                            fontFamily: "font6",
                            width: Dimensions.get("window").width / 1.3,
                        }}
                    >
                        <Ionicons
                            name="ios-location-sharp"
                            size={16}
                            color="#F5856B"
                        />{" "}
                        {item.location}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.user}>
                            <View
                                style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 60,
                                    shadowOpacity: 0.3,
                                    shadowOffset: { width: 0, height: 0 },
                                }}
                            >
                                <Image
                                    style={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: 60,
                                    }}
                                    PlaceholderContent={
                                        <ActivityIndicator
                                            size="small"
                                            color="white"
                                        />
                                    }
                                    source={
                                        profile_pic === ""
                                            ? defaultProfileImg
                                            : {
                                                  uri:
                                                      IMG_URL +
                                                      datauser.profile_pic,
                                              }
                                    }
                                    //source={require('../../assets/icon/man.png')}>
                                />
                            </View>

                            <View
                                style={{
                                    marginLeft: 10,
                                    justifyContent: "space-between",
                                    // backgroundColor:'red',
                                    height: 75,
                                    width: "70%",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 16,
                                        fontFamily: "font2",
                                    }}
                                >
                                    {datauser.username}
                                </Text>
                                {/* <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 16,
                                        fontFamily: "font2",
                                    }}
                                >
                                    (
                                    {datauser.first_name[0].toUpperCase() +
                                        datauser.first_name
                                            .slice(1)
                                            .toLowerCase()}{" "}
                                    {datauser.last_name[0].toUpperCase() +
                                        datauser.last_name
                                            .slice(1)
                                            .toLowerCase()}
                                    )
                                </Text> */}

                                {/* <Text
                                    numberOfLines={1}
                                    style={{
                                        color: "#fff",
                                        fontSize: 15,
                                        fontFamily: "font6",
                                        marginBottom: 5,
                                    }}
                                >
                                    {datauser.about_me.replaceAll("\\n", " ")}
                                </Text> */}

                                {/* <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                        <TouchableOpacity onPress={() => navigation.navigate('Aboutme')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                            <View style={{ borderWidth: 1, height: 18, width: 18, borderRadius: 30, borderColor: 'transparent', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                <Text  ><FontAwesome name="user" size={12} color="#B2C248" /></Text>
                            </View>
                            <Text style={{ color: '#fff', paddingLeft: 5, fontFamily: 'font2', fontSize: 13 }}>About me </Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Createpost')}
                            style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 0 }}>
                            <View style={{ borderWidth: 1, height: 18, width: 18, borderRadius: 30, borderColor: 'transparent', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                <Text  ><FontAwesome name="user" size={12} color="#B2C248" /></Text>
                            </View>
                            <Text style={{ color: '#fff', paddingLeft: 5, fontFamily: 'font2', fontSize: 13 }}>Upload Post</Text>
                        </TouchableOpacity>

                    </View> */}

                                {route.params.datauser.friendstatus == "" && (
                                    <TouchableOpacity
                                        onPress={() => sendrequest_button()}
                                        disabled={buttonCheck}
                                        style={{
                                            backgroundColor: "#F5866B",
                                            paddingVertical: "3%",
                                            borderRadius: 5,
                                            // borderWidth: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingHorizontal: "10%",
                                            alignSelf: "flex-end",
                                        }}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator
                                                color="#fff"
                                                size="small"
                                            />
                                        ) : (
                                            <View>
                                                {/* <FontAwesome5 name="user-check" size={22} color="#fff" style={{ marginTop:5}} /> */}

                                                <Text style={{ color: "#fff" }}>
                                                    {request}
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                )}

                                {route.params.datauser.friendstatus != "" &&
                                    route.params.datauser.friendstatus[0][
                                        "status"
                                    ] == "Pending" && (
                                        <View>
                                            {route.params.datauser
                                                .friendstatus[0]["sentby"] ==
                                            user_id ? (
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            "#F5866B",
                                                        paddingVertical: "3%",
                                                        borderRadius: 5,
                                                        paddingHorizontal:
                                                            "10%",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        alignSelf: "flex-end",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        Request Sent
                                                    </Text>
                                                </View>
                                            ) : (
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            fetch_accepted()
                                                        }
                                                        style={{
                                                            paddingVertical:
                                                                "3%",
                                                            backgroundColor:
                                                                "#F5866B",
                                                            borderRadius: 5,
                                                            paddingHorizontal:
                                                                "10%",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontFamily:
                                                                    "font2",
                                                                fontSize: 15,
                                                                color: "#fff",
                                                            }}
                                                        >
                                                            Accept
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            fetch_rejected()
                                                        }
                                                        style={{
                                                            paddingVertical:
                                                                "3%",

                                                            backgroundColor:
                                                                "#F5856B",
                                                            borderRadius: 5,
                                                            paddingHorizontal:
                                                                "10%",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontFamily:
                                                                    "font2",
                                                                fontSize: 15,
                                                                color: "#fff",
                                                            }}
                                                        >
                                                            Reject
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    )}

                                {fstatus != "" &&
                                    fstatus[0]["status"] == "Accepted" && (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "User_Search_AboutMe",
                                                        {
                                                            datauser: datauser,
                                                        }
                                                    );
                                                }}
                                                style={{
                                                    paddingVertical: "3%",
                                                    backgroundColor: "#F5866B",
                                                    borderRadius: 5,
                                                    paddingHorizontal: "10%",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "font2",
                                                        // fontSize: 15,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    About
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    setModalVisible(true)
                                                }
                                                style={{
                                                    paddingVertical: "3%",

                                                    backgroundColor: "#F5856B",
                                                    borderRadius: 5,
                                                    paddingHorizontal: "10%",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "font2",
                                                        // fontSize: 15,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    Friend list
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        // <TouchableOpacity
                                        //     onPress={() =>

                                        //     }
                                        //     style={{
                                        //         backgroundColor: "#F5866B",
                                        //         height: 35,
                                        //         borderRadius: 10,
                                        //         width:'60%',
                                        //         alignItems: "center",
                                        //         justifyContent: "center",
                                        //         alignSelf:'flex-end'
                                        //     }}
                                        // >
                                        //     <Text style={{ color: "#fff" }}>

                                        //     </Text>
                                        // </TouchableOpacity>
                                    )}
                            </View>
                        </View>

                        <View>
                            {datauser.is_private == "0" ||
                            (fstatus != "" &&
                                fstatus[0]["status"] == "Accepted") ? (
                                <View>
                                    {post != [] &&
                                    post.length > 0 &&
                                    !isPost ? (
                                        <MapView
                                            style={styles.map}
                                            initialRegion={region}
                                            // onRegionChangeComplete={(e)=>{

                                            //     setRegion(e);

                                            // }}
                                        >
                                            {post.map((item, index) => {
                                                return (
                                                    <Marker
                                                        pinColor={
                                                            post_seen_form[
                                                                index
                                                            ]
                                                        }
                                                        onSelect={(e) => {
                                                            console.log(
                                                                post_seen_form[
                                                                    index
                                                                ]
                                                            );
                                                            console.log("8888");

                                                            hit_seen_post(
                                                                index
                                                            );

                                                            let temp =
                                                                post_seen_form;

                                                            temp[index] =
                                                                "blue";

                                                            set_post_seen_form(
                                                                temp
                                                            );

                                                            set_change(!change);
                                                            set_save(true);
                                                        }}
                                                        onDeselect={() => {}}
                                                        key={item.post_id}
                                                        // onPress={()=>navigation.navigate("Userpost", {item:item})}
                                                        coordinate={{
                                                            latitude:
                                                                parseFloat(
                                                                    item.latitude
                                                                ),
                                                            longitude:
                                                                parseFloat(
                                                                    item.longitude
                                                                ),
                                                        }}
                                                    >
                                                        <Callout
                                                            onPress={() =>
                                                                navigation.navigate(
                                                                    "Userpost",
                                                                    {
                                                                        item: item,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <View
                                                                style={{
                                                                    flexDirection:
                                                                        "row",
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        marginRight: 10,
                                                                    }}
                                                                    PlaceholderContent={
                                                                        <ActivityIndicator
                                                                            size="small"
                                                                            color="white"
                                                                        />
                                                                    }
                                                                    source={
                                                                        item.image_file ===
                                                                        ""
                                                                            ? defaultPostImg
                                                                            : {
                                                                                  uri:
                                                                                      IMG_URL +
                                                                                      item.image_file,
                                                                              }
                                                                    }
                                                                    // defaultSource={defaultPostImg}
                                                                />
                                                                <View>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 10,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 8,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.location
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 8,
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {item.description.replace(
                                                                            /\\n/g,
                                                                            "\n"
                                                                        )}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </Callout>
                                                    </Marker>
                                                );
                                            })}
                                        </MapView>
                                    ) : (
                                        <View
                                            style={[
                                                styles.map,
                                                {
                                                    alignItems: "center",
                                                    backgroundColor: "#fff",
                                                },
                                            ]}
                                        >
                                            <MapView
                                                style={styles.map}
                                                region={{
                                                    latitude: 20.5937,
                                                    longitude: 78.9629,
                                                }}
                                            ></MapView>
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "75%",
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 200,
                                            height: 150,
                                            borderRadius: 60,
                                        }}
                                        resizeMode="contain"
                                        PlaceholderContent={
                                            <ActivityIndicator
                                                size="small"
                                                color="white"
                                            />
                                        }
                                        source={privateImg}
                                        //source={require('../../assets/icon/man.png')}>
                                    />
                                    <Text
                                        style={{
                                            marginTop: 20,
                                            fontFamily: "font2",
                                            color: "#B2C248",
                                            fontSize: 18,
                                        }}
                                    >
                                        Private Account
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Overlay
                            isVisible={isPost}
                            overlayBackgroundColor="transparent"
                            overlayStyle={{
                                backgroundColor: "transparent",
                                opacity: 1,
                                elevation: 0,
                            }}
                        >
                            <Text>
                                <ActivityIndicator color="#fff" size="large" />
                            </Text>
                        </Overlay>

                        <Toast
                            visible={showToast}
                            position={-100}
                            shadow={false}
                            animation={true}
                            hideOnPress={true}
                        >
                            {errorMsg}
                        </Toast>
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "font2",
                                        fontSize: 16,
                                    }}
                                >
                                    Friends({total != "" ? total : 0})
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#B2C248",
                                        borderRadius: 20,
                                    }}
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                >
                                    <Text style={{}}>
                                        <Entypo
                                            name="cross"
                                            size={24}
                                            color="#fff"
                                        />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={{ width: "100%" }}>
                                {friendList.length > 0 ? (
                                    <FlatList
                                        data={friendList}
                                        renderItem={renderItemUser}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item) => item.user_id}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            marginTop: "30%",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>No Friends</Text>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

//export default Username;
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
        longitude,
        latitude,
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
        longitude,
        latitude,
    };
};

export default connect(mapStateToProps)(Username);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 1.25,
    },

    profile: {
        flexDirection: "row",
        justifyContent: "flex-start",

        marginTop: 7,
    },

    user: {
        width: "100%",
        paddingVertical: "5%",
        paddingHorizontal: "3%",
        backgroundColor: "#B2C248",
        flexDirection: "row",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        bottom: 0,
        width: Dimensions.get("screen").width / 1.1,
        height: Dimensions.get("screen").height / 1.5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        paddingBottom: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexWrap: "wrap",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
