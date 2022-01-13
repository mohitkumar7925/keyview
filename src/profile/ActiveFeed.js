import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
    KeyboardAvoidingView,
    FlatList,
} from "react-native";
import {
    FontAwesome,
    Fontisto,
    MaterialIcons,
    FontAwesome5,
    AntDesign,
    Entypo,
    Feather,
    Ionicons,
} from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { API_URL } from "../url/url";
import { connect } from "react-redux";
import { IMG_URL } from "../url/url";
import { Image } from "react-native-elements";
import { set } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const defaultProfileImg = require("../../assets/profile_picture.png");
const defaultPostImg = require("../../assets/post_img.png");
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const Searchtab = ({ navigation, service, user_id }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Active Feed",
            headerLeft: () => (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo
                            name="menu"
                            size={28}
                            color="#fff"
                            style={{ marginHorizontal: 10 }}
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

    const [activeTab, setActiveTab] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [error, setError] = React.useState("");
    const [locationPost, setLocationPost] = React.useState([]);
    const [locationPostList, setLocationPostList] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        fetch_location();
    }, []);

    const fetch_location = async () => {
        setLoading(true);
        let formData = new FormData();
        let userId = await AsyncStorage.getItem("userid");
        formData.append("location", search);
        formData.append("user_id", user_id);

        console.log(formData);

        fetch(API_URL + "/nearby_user.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson[0]["error"]);
                // alert(responseJson[0]['error']);
                if (responseJson[0]["error"] == "1") {
                    setLocationPost(responseJson[0]["posts"]);
                    setLocationPostList(responseJson[0]["posts"]);
                    // setTimeout(() => {
                        setLoading(false);
                    // }, 3000);
                } else {
                    // setTimeout(() => {
                        setLoading(false);
                    // }, 3000);
                }
            })

            .catch((error) => {
                console.error(error);
            });
    };

    const fetch_user = () => {
        setLoading(true);
        let formData = new FormData();

        formData.append("username", search);
        formData.append("user_id", user_id);

        console.log(formData);

        fetch(API_URL + "/searchby_username.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson[0]["error"] == "1") {
                    setUser(responseJson[0]["data"]);
                    setUserList(responseJson[0]["data"]);

                    // setTimeout(() => {
                        setLoading(false);
                    // }, 3000);
                } else {
                    // setTimeout(() => {
                        setLoading(false);
                    // }, 3000);
                }
            })

            .catch((error) => {
                console.error(error);
            });
    };

    const renderItemLocation = ({ item }) => {
        return (
            <TouchableOpacity
                disabled={item.user_id == user_id ? false : true}
                onPress={() => navigation.navigate("Userpost", { item: item })}
                style={{
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 0 },
                    marginTop: "5%",
                    marginBottom: "5%",
                    borderWidth: 0,
                    borderRadius: 20,
                    borderColor: "transparent",
                    backgroundColor: "#fff",
                    marginHorizontal:10
                }}
            >
                <Image
                    style={{
                        width: Dimensions.get("screen").width / 1.1,
                        height: 160,
                        borderColor: "transparent",
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        resizeMode: "cover",
                    }}
                    PlaceholderContent={
                        <ActivityIndicator size="small" color="white" />
                    }
                    source={
                        item.image_file === ""
                            ? defaultPostImg
                            : { uri: IMG_URL + item.image_file }
                    }
                />
                <View
                    style={{
                        width: Dimensions.get("screen").width / 1.1,
                        paddingLeft: 10,
                        marginTop: 5,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "transparent",
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 60,
                                marginRight: 10,
                            }}
                            PlaceholderContent={
                                <ActivityIndicator size="small" color="white" />
                            }
                            source={
                                item.profile_pic === ""
                                    ? defaultProfileImg
                                    : { uri: IMG_URL + item.profile_pic }
                            }
                            //source={require('../../assets/icon/man.png')}>
                        />
                        <View>
                            <Text
                                style={{ color: "black", fontFamily: "font2"  , }}
                            >
                                {item.name ? item.name : "User name"}
                            </Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontFamily: "font6",
                                    fontSize: 11,
                                    textAlignVertical: "center",
                                    overflow:'hidden',
                                    maxWidth:'85%'
                                }}
                            >
                                <Entypo
                                    name="location-pin"
                                    size={12}
                                    color="red"
                                />{" "}
                                {item.location}
                            </Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontFamily: "font6",
                                    fontSize: 11,
                                    textAlignVertical: "center",
                                }}
                            >
                                {item.created_at}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            marginTop: 15,
                            color: "grey",
                            fontFamily: "font6",
                        }}
                    >
                        {item.description.replace(/\\n/g, "\n")}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderItemUser = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 0 },
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
                    <Text
                        style={{
                            fontSize: 12,
                            marginLeft: 2,
                            fontFamily: "font2",
                        }}
                    >
                        {item.first_name} {item.last_name}
                    </Text>
                    <Text style={{ fontSize: 10, fontFamily: "font6" }}>
                        <Ionicons
                            name="ios-location-sharp"
                            size={16}
                            color="#F5856B"
                        />{" "}
                        {item.location}
                    </Text>
                </View>
            </View>
        );
    };

    const search_button = () => {
        // setSearch(text);
        // console.log(text);
        console.log(search);
        if (activeTab == 1) {
            const filteredData = search
                ? locationPost.filter((x) =>
                      x.location.toLowerCase().includes(search.toLowerCase())
                  )
                : locationPost;

            console.log("helo asdfsadf");
            console.log(filteredData);
            setLocationPostList(filteredData);
        } else {
            const filteredData = search
                ? user.filter(
                      (x) =>
                          x.first_name
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                          x.last_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                  )
                : user;

            console.log("helo asdfsadf");
            console.log(filteredData);
            setUserList(filteredData);
        }
    };

    return (
        <View style={styles.container}>
            {locationPostList.length > 0 ? (
                <FlatList
                    data={locationPostList}
                    renderItem={renderItemLocation}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.post_id}
                />
            ) : (
                <View
                    style={{
                        justifyContent: "center",
                        marginTop: "30%",
                        alignItems: "center",
                    }}
                >
                    <Text>No Active Feed</Text>
                </View>
            )}
        </View>
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

export default connect(mapStateToProps)(Searchtab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    container1: {
        margin: 15,
        // marginRight:10,
        // marginLeft:10,
        marginTop: 15,
        marginBottom: 10,
    },
    location: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#D7D7D7",
        width: "50%",
        height: 30,
        backgroundColor: "#F5866B",
    },
    user: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#D7D7D7",
        width: "50%",
        height: 30,
    },
    icon: {
        paddingLeft: 10,
        paddingTop: 3,
    },
    itemuser: {
        margin: 10,
        //  width:350,
        height: 50,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    item: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 2,
        //paddingBottom:20,
        width: Dimensions.get("screen").width - 40,
        height: 80,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D7D7D7",
        //flex:1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    flatlist: {
        //borderTopWidth:1,
        //borderColor:'#D7D7D7',
        // marginBottom:100,
        //height:'100%',
        //height:Dimensions.get('screen').height,
        //flex:1,
    },
    flatlistuser: {
        borderTopWidth: 1,
        borderColor: "#D7D7D7",
        marginBottom: 100,
        height: Dimensions.get("screen").height,
    },

    item1: {
        margin: 10,
        marginLeft: 50,
        //marginBottom:2,
        //paddingBottom:20,
        width: 350,
        height: 50,
        borderRadius: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    // itemuser:{
    //     margin:10,
    //     marginLeft:50,
    //     //marginBottom:2,
    //     //paddingBottom:20,
    //     width:350,
    //     height:50,
    //     borderRadius:20,
    //     flexDirection:'row',
    //     justifyContent:'flex-start',
    // },

    load: {
        width: 100,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#B2C248",
        alignSelf: "center",
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
