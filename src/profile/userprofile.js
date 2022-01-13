import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
//import { Location, Permissions } from 'expo';
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../url/url";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IMG_URL } from "../url/url";
import { change_user_detail } from "../../store/actions/user_action";
import Toast from "react-native-root-toast";
import { Image } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { Overlay } from "react-native-elements";

const Userprofile = ({
    navigation,
    updateUser,
    route,
    username,
    profile_pic,
    user_id,
    city,
    latitude,
    longitude,
    about_me,
    first_name,
    last_name,
}) => {
    const [s_color, set_s_color] = useState(-1);
    var post_seen = [];
    const [change, set_change] = useState(false);
    const [post_seen_form, set_post_seen_form] = useState([]);

    const [region, setRegion] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 100.0,
        longitudeDelta: 100.0,
    });

    const [save, set_save] = useState(false);
    useEffect(() => {
        // set_save(false);
        console.log("$$$");
        // console.log(Number(latitude))
        setRegion({
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 100.0,
            longitudeDelta: 100.0,
        });
    }, []);

    useEffect(() => {
        // console.log(change)
        console.log("333");
    }, [change]);
    // let post_seen_form = new FormData();
    // const [post_seen_form] = useState(new FormData())

    const hit_seen_post = (index) => {
        let data = new FormData();
        data.append("user_id", post[index].user_id);
        data.append("post_id", post[index].post_id);
        data.append("updte", "1");

        console.log("*****\n\n");
        console.log(data);
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
                console.log(response.json());
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const defaultProfileImg = require("../../assets/profile_picture.png");
    const defaultPostImg = require("../../assets/post_img.png");
    const [msgShown, setShowToast] = useState(true);
    const msg = route.params?.msg ? route.params.msg : null;

    if (msg != null && msgShown) {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    }
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [post, setPost] = useState([]);
    const [isPost, setIsPost] = useState(true);
    //const [latitude, setLatitude] = useState('');
    //const [longitude, setLongitude] = useState('');
    const [usertitle, setUserTitle] = React.useState([]);
    const [annotations, setAnnotations] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            fetch_post();

            return () => {
                isActive = false;
            };
        }, [])
    );

    React.useLayoutEffect(() => {
        navigation.setOptions({
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

    const fetch_post = async () => {
        setErrorMsg("Loading post...");

        let formData = new FormData();
        let userId = await AsyncStorage.getItem("userid");

        formData.append("user_id", JSON.parse(userId));
        formData.append("client_id" , JSON.parse(userId) );
        console.log(formData);
        fetch(API_URL + "/all_posts.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                

                if (responseJson[0]["error"] != "0") {
                    setPost(responseJson);

                  
                        let f = [];

                        for (
                            let index = 0;
                            index < responseJson.length;
                            index++
                        ) {
                            if (responseJson[index].is_seen === "0") {
                                f.push("red");
                            } else {
                                f.push("blue");
                            }
                            console.log(f);

                            // post_seen_form.append(index.toString(), 'red');

                            console.log(responseJson.length);
                        }
                        set_post_seen_form(f);
                    

                    // post_seen_form.map((item , index)=>{
                    //     console.log(item)
                    //     console.log(index)
                    //     if(index==2){
                    //         let temp = post_seen_form;
                    //         temp[2]='green'
                    //         set_post_seen_form(temp);
                    //     }
                    // })
                    // console.log(post_seen_form)

                    setRegion({
                        latitude: Number(responseJson[0].latitude),
                        longitude: Number(responseJson[0].longitude),
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                    });

                    // setTimeout(() => {
                        setIsPost(false);
                        setErrorMsg("");
                    // }, 4000);
                } else {
                    console.log(responseJson);
                    setPost([]);
                    setErrorMsg("No post yet");
                    setIsPost(false);
                }
            })
            .catch((error) => {
                setIsPost(false);
                alert("Server not Responding");
                console.error(error);
            });
    };

    const _getAnnotations = (region) => {
        return [
            {
                longitude: region.longitude,
                latitude: region.latitude,
                title: "You Are Here",
            },
        ];
    };

    const test_function = () => {
        console.log("hello world");
    };

    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <View
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 60,
                        shadowOpacity: 0.3,
                        shadowOffset: { width: 0, height: 0 },
                    }}
                >
                    <Image
                        style={{ width: 70, height: 70, borderRadius: 60 }}
                        PlaceholderContent={
                            <ActivityIndicator size="small" color="white" />
                        }
                        source={
                            profile_pic === ""
                                ? defaultProfileImg
                                : { uri: IMG_URL + profile_pic }
                        }
                        //source={require('../../assets/icon/man.png')}>
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: "space-around",
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 20,
                            fontFamily: "font2",
                        }}
                    >
                        {username}
                    </Text>
                    {/* <Text numberOfLines={1} style={{ color: '#fff', fontSize: 15, fontFamily: 'font6',  }}>({first_name.toUpperCase()} {last_name.toUpperCase()})</Text> */}
                    <Text
                        // numberOfLines={1}
                        // lineBreakMode={'clip'}
                        ellipsizeMode={"tail"}
                        numberOfLines={1}
                        style={{
                            color: "#fff",
                            fontSize: 15,
                            fontFamily: "font6",
                        }}
                    >
                        {/* {about_me.replaceAll("\\n", " ")} */}
                        {about_me.replace(/\\n/g, "\n").split("\n")[0]}
                    </Text>

                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Aboutme")}
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 1,
                                    height: 18,
                                    width: 18,
                                    borderRadius: 30,
                                    borderColor: "transparent",
                                    backgroundColor: "#fff",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>
                                    <FontAwesome
                                        name="user"
                                        size={12}
                                        color="#B2C248"
                                    />
                                </Text>
                            </View>
                            <Text
                                style={{
                                    color: "#fff",
                                    paddingLeft: 5,
                                    fontFamily: "font2",
                                    fontSize: 13,
                                }}
                            >
                                About me
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Createpost")}
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                marginLeft: 0,
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 1,
                                    height: 18,
                                    width: 18,
                                    borderRadius: 30,
                                    borderColor: "transparent",
                                    backgroundColor: "#fff",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>
                                    <FontAwesome
                                        name="user"
                                        size={12}
                                        color="#B2C248"
                                    />
                                </Text>
                            </View>
                            <Text
                                style={{
                                    color: "#fff",
                                    paddingLeft: 5,
                                    fontFamily: "font2",
                                    fontSize: 13,
                                }}
                            >
                                Upload Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                {post != [] && post.length > 0 && !isPost ? (
                    <MapView
                        style={styles.map}
                        // initialRegion={region}
                        initialRegion={{
                            'latitude': Number(latitude),
                            'longitude': Number(longitude),
                            'latitudeDelta': 100.0000,
                            'longitudeDelta': 100.0000,
                        }}
                        annotations={annotations}
                        // onRegionChange={(e)=>{
                        //     // console.log(e)
                        //     setRegion(e)
                        // }}
                        // onRegionChangeComplete={(e) => {
                        //     // console.log(e)
                        // }}
                    >
                        {post.map((item, index) => {
                            var status = false;
                            return (
                                <Marker
                                    pinColor={post_seen_form[index]}
                                    onSelect={(e) => {
                                        console.log(post_seen_form[index]);

                                        hit_seen_post(index);

                                        console.log("8888");

                                        let temp = post_seen_form;

                                        temp[index] = "blue";

                                        set_post_seen_form(temp);

                                        set_change(!change);
                                        // set_save(true);
                                    }}
                                    onDeselect={() => {
                                        console.log("deselect");
                                    }}
                                    key={index}
                                    // onPress={()=>navigation.navigate("Userpost", {item:item})}
                                    coordinate={{
                                        latitude: Number(item.latitude),
                                        longitude: Number(item.longitude),
                                    }}
                                >
                                    <Callout
                                        onPress={() =>
                                            navigation.navigate("Userpost", {
                                                item: item,
                                            })
                                        }
                                    >
                                        <View style={{ flexDirection: "row" }}>
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
                                                    item.image_file === ""
                                                        ? defaultPostImg
                                                        : {
                                                              uri:
                                                                  IMG_URL +
                                                                  item.image_file,
                                                          }
                                                }
                                            />
                                            <View>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontFamily: "font7",
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    numberOfLines={2}
                                                    style={{
                                                        fontSize: 9,
                                                        width: 150,
                                                    }}
                                                >
                                                    {item.location}
                                                </Text>
                                                <Text
                                                    numberOfLines={2}
                                                    style={{
                                                        fontSize: 9,
                                                        width: 100,
                                                    }}
                                                >
                                                    {/* {item.description.replaceAll(
                                                        "\\n",
                                                        "\n"
                                                    )} */}
                                                    {item.description.replace(
                                                        /\\n/g,
                                                        /\n/
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
                            { alignItems: "center", backgroundColor: "#fff" },
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
            {msg && (
                <Toast
                    visible={msgShown}
                    position={100}
                    shadow={false}
                    animation={true}
                    hideOnPress={true}
                >
                    {msg}
                </Toast>
            )}

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
        </View>
    );
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (value) => dispatch(change_user_detail(value)),
});

Userprofile.propTypes = {
    updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const {
        username,
        profile_pic,
        user_id,
        location,
        city,
        latitude,
        longitude,
        about_me,
        first_name,
        last_name,
    } = state.userReducer;

    return {
        username,
        profile_pic,
        user_id,
        location,
        city,
        latitude,
        longitude,
        about_me,
        first_name,
        last_name,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userprofile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    },
    user: {
        width: "100%",
        paddingVertical: "5%",
        paddingHorizontal: "3%",
        backgroundColor: "#B2C248",
        flexDirection: "row",
        alignItems: "center",
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
        height: Dimensions.get("window").height / 1.25,
    },
    tab: {
        flexDirection: "column",
    },
    plainView: {
        width: 100,
    },
    calloutButton: {
        width: "auto",
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
});
