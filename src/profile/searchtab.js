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
const defaultProfileImg = require("../../assets/profile_picture.png");
const defaultPostImg = require("../../assets/post_img.png");
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { useFocusEffect } from "@react-navigation/native";

const Searchtab = ({ navigation, route, service, user_id }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Search",
            headerLeft: () => (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
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

    const [activeTab, setActiveTab] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [error, setError] = React.useState("");
    const [locationPost, setLocationPost] = React.useState([]);
    const [locationPostList, setLocationPostList] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        let mounted = true;
        fetch_location();

        return () => {
            mounted = false;
        };
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
                    const data = responseJson[0]["posts"].sort(function (a, b) {
                        var textA = a.location.toUpperCase();
                        var textB = b.location.toUpperCase();
                        return textA < textB ? -1 : textA > textB ? 1 : 0;
                    });
                    setLocationPost(data);
                    setLocationPostList(data);
                    // setTimeout(() => {
                        setLoading(false);
                    // }, 1000);
                } else {
                    // setTimeout(() => {
                        setLoading(false);
                    // }, 1000);
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
                    let data = responseJson[0]["data"].sort(function (a, b) {
                        var textA = a.username.toUpperCase();
                        var textB = b.username.toUpperCase();
                        return textA < textB ? -1 : textA > textB ? 1 : 0;
                    });

                    setUser(data);
                    setUserList(data);
                    setLoading(false);

                    // setTimeout(() => {
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

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            fetch_user();

            return () => {
                isActive = false;
            };
        }, [])
    );

    const renderItemLocation = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Userpost", { item: item })}
                style={{
                    flexDirection: "row",
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 0 },
                    borderRadius: 6,
                    marginTop: 10,
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    marginBottom: 2,
                }}
            >
                <View style={{ overflow: "hidden", borderRadius: 6 }}>
                    <Image
                        style={{
                            width: 80,
                            height: 80,
                            marginRight: 10,
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
                </View>
                <View style={{ margin: 5 }}>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                marginRight: 5,
                                resizeMode: "cover",
                                borderRadius: 10,
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
                        <Text style={{ fontSize: 10, fontFamily: "font2" }}>
                            {item.name}
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontSize: 9,
                            fontFamily: "font6",
                            width: Dimensions.get("screen").width / 1.7,
                            marginTop:3
                        }}
                    >
                        <Ionicons
                            name="ios-location-sharp"
                            size={10}
                            color="#F5856B"
                        />{" "}
                        {item.location}
                    </Text>
                    <Text style={{ fontSize: 8, fontFamily: "font6" }}>
                        {item.created_at}
                    </Text>
                    <Text
                        style={{
                            fontSize: 8,
                            width: "65%",
                            fontFamily: "font6",
                        }}
                    >
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const refresh = () => {
        console.log("Hello");
    };

    const renderItemUser = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Search_Username", { datauser: item })
                }
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
                    <Text
                        style={{
                            fontSize: 14,
                            marginLeft: 2,
                            fontFamily: "font2",
                            marginBottom:3
                        }}
                    >
                        {item.username}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: "font6",
                            width: Dimensions.get("window").width / 1.3,

                        }}
                    >
                        <Ionicons
                            name="ios-location-sharp"
                            size={12}
                            color="#F5856B"
                        />{" "}
                        {item.location}
                    </Text>
                </View>
            </TouchableOpacity>
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
                          x.username
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) == 0
                  )
                : user;

            console.log("helo asdfsadf");
            console.log(filteredData);

            setUserList(filteredData);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
                style={{
                    flexDirection: "row",
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 0 },
                    borderRadius: 30,
                    marginVertical: 20,
                    marginHorizontal: 10,
                    padding: 5,
                    backgroundColor: "#fff",
                }}
            >
                <Text>
                    <Feather name="search" size={24} color="#CDCDCD" />
                </Text>
                <TextInput
                    placeholder="Search location, user's name"
                    style={{ marginLeft: 10, width: "65%" }}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    onSubmitEditing={() => search_button()}
                ></TextInput>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setActiveTab(1);
                        fetch_location();
                    }}
                    style={{
                        borderWidth: 1,
                        borderRightWidth: 0,
                        borderColor: activeTab == 1 ? "#F5856B" : "#BFBFBF",
                        backgroundColor: activeTab == 1 ? "#F5856B" : "#fff",
                        width: "50%",
                        padding: 5,
                        justifyContent: "center",
                        alignItems:'center'
                    }}
                >
                    <Text
                        style={{
                            color: activeTab == 1 ? "#fff" : "#BFBFBF",
                            fontFamily: "font6",
                        }}
                    >
                        <Ionicons
                            name="ios-location-sharp"
                            size={16}
                            color={activeTab == 1 ? "#fff" : "#BFBFBF"}
                        />{"  "}
                        Location
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setActiveTab(2);
                        fetch_user();
                    }}
                    style={{
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderColor: activeTab == 2 ? "#F5856B" : "#BFBFBF",
                        width: "50%",
                        padding: 5,
                        backgroundColor: activeTab == 2 ? "#F5856B" : "#fff",
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <Text
                        style={{
                            color: activeTab == 2 ? "#fff" : "#BFBFBF",
                            fontFamily: "font6",
                        }}
                    >
                        <FontAwesome
                            name="user"
                            size={16}
                            color={activeTab == 2 ? "#fff" : "#BFBFBF"}
                        />{"  "}
                        User
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab == 1 ? (
                <View style={{ marginBottom: 100 }}>
                    {loading ? (
                        <View
                            style={{
                                justifyContent: "center",
                                marginTop: "30%",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator size="large" color="#B2C248" />
                        </View>
                    ) : locationPostList.length > 0 ? (
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
                            <Text>No Post Found</Text>
                        </View>
                    )}
                </View>
            ) : (
                <View style={{ marginBottom: 100 }}>
                    {loading ? (
                        <View
                            style={{
                                justifyContent: "center",
                                marginTop: "30%",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator size="large" color="#B2C248" />
                        </View>
                    ) : userList.length > 0 ? (
                        <FlatList
                            data={userList}
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
                            <Text>No User Found</Text>
                        </View>
                    )}
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
        width: Dimensions.get("screen").width,
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
