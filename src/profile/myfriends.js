import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Alert,
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
import {
    MenuProvider,
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const defaultProfileImg = require("../../assets/profile_picture.png");
const defaultPostImg = require("../../assets/post_img.png");
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Searchtab = ({ navigation, service, user_id }) => {
    useEffect(() => {
        let mounted = true;
        fetch_friend();
        return () => {
            let mounted = false;
        };
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Friends",
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
    const [friend, setFriend] = React.useState([]);
    const [friendList, setFriendList] = React.useState([]);
    const [friendRequest, setFriendRequest] = React.useState([]);
    const [friendRequestList, setFriendRequestList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [total, setTotal] = React.useState("");
    const [totalRequest, setTotalRequest] = React.useState("");

    // useFocusEffect(
    //     React.useCallback(() => {
    //         let isActive = true;
    //         fetch_friend();

    //         return () => {
    //             isActive = false;
    //           };
    //     }, [])
    //   );

    const fetch_friend = async () => {
        setLoading(true);
        let formData = new FormData();
        let userId = await AsyncStorage.getItem("userid");
        formData.append("user_id", user_id);

        console.log(formData);

        fetch(API_URL + "/FriendListing.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson[0]);
                // alert(responseJson[0]['error']);
                if (responseJson[0]["error"] == "1") {
                    setFriend(responseJson[0]["friends"]);
                    setFriendList(responseJson[0]["friends"]);
                    setTotal(responseJson[0]["frienCount"]);
                    setTotalRequest(responseJson[0]["requestCount"]);
                    setFriendRequest(responseJson[0]["friendRequest"]);
                    setFriendRequestList(responseJson[0]["friendRequest"]);

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
                    setFriendRequest(responseJson[0]["data"]);
                    setFriendRequestList(responseJson[0]["data"]);

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

    const fetch_accepted = (value) => {
        let formData = new FormData();

        formData.append("client_id", user_id);
        formData.append("friend_id", value);

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
                console.log(responseJson);
                if (responseJson.error == "1") {
                    alert(responseJson.error_msg);
                    fetch_friend();
                } else {
                    alert(responseJson.error_msg);
                }
            })
            .catch(function (error) {
                alert("Network Problem");
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    };

    const fetch_rejected = (value) => {
        let formData = new FormData();

        formData.append("client_id", user_id);
        formData.append("friend_id", value);

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
                console.log(responseJson);
                if (responseJson.error == "1") {
                    alert(responseJson.error_msg);
                    fetch_friend();
                } else {
                    alert(responseJson.error_msg);
                }
            })
            .catch(function (error) {
                alert("Network Problem");
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    };

    const fetch_remove = (value) => {
        // alert(value);
        let formData = new FormData();

        formData.append("client_id", user_id);
        formData.append("friend_id", value);

        fetch(API_URL + "/remove_friend.php", {
            method: "POST", // or 'PUT'
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("adfasdf");
                console.log(responseJson);
                if (responseJson.error == "1") {
                    console.log(responseJson.error_msg);
                    fetch_friend();
                } else {
                    alert(responseJson.error_msg);
                }
            })
            .catch(function (error) {
                alert("Network Problem");
                console.log(
                    "There has been a problem with your fetch operation: " +
                        error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    };

    const renderItemLocation = ({ item }) => {
        return (
            <MenuProvider
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // shadowOpacity: 0.2,
                    // shadowOffset: { width: 0, height: 0 },
                    borderRadius: 10,
                    marginTop: 10,
                    marginBottom: 5,
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Username", { datauser: item })
                    }
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                            marginBottom: 5,
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

                    <Text
                        style={{
                            fontSize: 14,
                            marginLeft: 2,
                            marginTop: -5,
                            fontFamily: "font2",
                        }}
                    >
                        {item.first_name[0].toUpperCase() +
                            item.first_name.slice(1)}{" "}
                        {item.last_name[0].toUpperCase() +
                            item.last_name.slice(1)}
                    </Text>
                </TouchableOpacity>

                <Menu onSelect={(value) => fetch_remove(item.user_id)}>
                    <MenuTrigger
                        text={
                            <Entypo
                                name="dots-three-horizontal"
                                size={22}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                        }
                    />
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                backgroundColor: "black",
                                width: 100,
                                alignItems: "center",
                                borderRadius: 10,
                                marginBottom: 5,
                            },
                            optionText: { color: "#fff" },
                        }}
                    >
                        <MenuOption value="Delete" text="Remove" />
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        );
    };

    const renderItemUser = ({ item }) => {
        return (
            <TouchableOpacity
                disabled={true}
                onPress={() =>
                    navigation.navigate("Username", { datauser: item })
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
                        width: 55,
                        height: 55,
                        marginRight: 10,
                        marginBottom: 5,
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
                <View style={{ marginTop: 2 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 2,
                            marginTop: -5,
                            fontFamily: "font2",
                        }}
                    >
                        {item.first_name} {item.last_name}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 2  , justifyContent:'center' }}>
                        <TouchableOpacity
                            onPress={() => fetch_accepted(item.user_id)}
                            style={{
                                paddingVertical: "2%",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#B2C248",
                                borderRadius: 5,
                                paddingHorizontal: "8%",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "font2",
                                    fontSize: 13,
                                    color: "#fff",
                                }}
                            >
                                Accept
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => fetch_rejected(item.user_id)}
                            style={{
                                paddingVertical: "2%",
                                marginLeft: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#F5856B",
                                borderRadius: 5,
                                paddingHorizontal: "8%",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "font2",
                                    fontSize: 13,
                                    color: "#fff",
                                }}
                            >
                                Reject
                            </Text>
                        </TouchableOpacity>
                    </View>
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
                ? friend.filter(
                      (x) =>
                          x.first_name
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                          x.last_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                  )
                : friend;

            console.log("helo asdfsadf");
            console.log(filteredData);
            setFriendList(filteredData);
        } else {
            const filteredData = search
                ? friendRequest.filter(
                      (x) =>
                          x.first_name
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                          x.last_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                  )
                : friendRequest;

            console.log("helo asdfsadf");
            console.log(filteredData);
            setFriendRequestList(filteredData);
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
                    placeholder="Search Friends"
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
                        fetch_friend();
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
                        <FontAwesome
                            name="user"
                            size={16}
                            color={activeTab == 1 ? "#fff" : "#BFBFBF"}
                        />{"  "}
                        My Friends
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setActiveTab(2);
                        fetch_friend();
                    }}
                    style={{
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderColor: activeTab == 2 ? "#F5856B" : "#BFBFBF",
                        width: "50%",
                        padding: 5,
                        backgroundColor: activeTab == 2 ? "#F5856B" : "#fff",
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Text
                        style={{
                            color: activeTab == 2 ? "#fff" : "#BFBFBF",
                            fontFamily: "font6",
                        }}
                    >
                        <FontAwesome5
                            name="user-friends"
                            size={16}
                            color={activeTab == 2 ? "#fff" : "#BFBFBF"}
                        />{"  "}
                        Friend Requests
                    </Text>
                </TouchableOpacity>
            </View>
            {activeTab == 1 && total != "" && (
                <View
                    style={{
                        marginTop: 10,
                        paddingBottom: 5,
                        borderBottomWidth: 0.5,
                        borderColor: "lightgrey",
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 10,
                            fontFamily: "font2",
                            fontSize: 16,
                        }}
                    >
                        {total} Friends
                    </Text>
                </View>
            )}

            {activeTab == 2 && (
                <View
                    style={{
                        marginTop: 10,
                        paddingBottom: 5,
                        borderBottomWidth: 0.5,
                        borderColor: "lightgrey",
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 10,
                            fontFamily: "font2",
                            fontSize: 16,
                        }}
                    >
                        {totalRequest} Friend Request
                    </Text>
                </View>
            )}

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
                    ) : friendList.length > 0 ? (
                        <FlatList
                            data={friendList}
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
                            <Text>No Friend Found</Text>
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
                    ) : friendRequestList.length > 0 ? (
                        <FlatList
                            data={friendRequestList}
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
                            <Text>No Request Found</Text>
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
