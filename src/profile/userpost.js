import * as React from "react";
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
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
import { useState } from "react";
import Input from "../customComponent/input";
import MapView from "react-native-maps";
import { Image } from "react-native-elements";
import { IMG_URL } from "../url/url";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
const Userpost = ({ navigation, route, user_id }) => {
    const data = route.params.item;
    console.log(data);
    const [visible, setVisible] = useState(false);
    const [viewImage, setViewImage] = useState("");
    const defaultPostImg = require("../../assets/post_img.png");
    const defaultProfileImg = require("../../assets/profile_picture.png");

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
                            User Post
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
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={true}
                style={{
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 0 },
                    marginTop: "5%",
                    marginBottom: "5%",
                    borderWidth: 0,
                    borderRadius: 20,
                    borderColor: "transparent",
                    backgroundColor: "#fff",
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
                        data.image_file === ""
                            ? defaultPostImg
                            : { uri: IMG_URL + data.image_file }
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
                                data.profile_pic === ""
                                    ? defaultProfileImg
                                    : { uri: IMG_URL + data.profile_pic }
                            }
                            //source={require('../../assets/icon/man.png')}>
                        />
                        <View style={{ width: "95%" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "78%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "black",
                                        fontFamily: "font2",
                                        width: "60%",
                                    }}
                                >
                                    {data.name[0].toUpperCase() +
                                        data.name.slice(1)}
                                </Text>
                                {data.user_id == user_id && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Createpost", {
                                                data: data,
                                            })
                                        }
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="image-edit"
                                            size={20}
                                            color="#F5866B"
                                        />
                                        <Text
                                            style={{
                                                color: "#F5866B",
                                                fontFamily: "font6",
                                            }}
                                        >
                                            Edit Post
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Text
                                style={{
                                    marginTop: 2,
                                    color: "black",
                                    fontFamily: "font6",
                                    fontSize: 10,
                                    width: "70%",
                                    textAlignVertical: "center",
                                }}
                            >
                                <Entypo
                                    name="location-pin"
                                    size={12}
                                    color="red"
                                />
                                {data.location}
                            </Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontFamily: "font6",
                                    fontSize: 13,
                                    textAlignVertical: "center",
                                }}
                            >
                                {data.created_at}
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
                        {/* {data.description.replaceAll("\\n", "\n")} */}
                        {data.description.replace(/\\n/g,'\n')}
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal
                visible={visible}
                animationType="fade"
                onRequestClose={() => {
                    setVisible(!visible);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#000",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={{ uri: IMG_URL + data.image_file }}
                        PlaceholderContent={
                            <ActivityIndicator size="small" color="white" />
                        }
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            setVisible(false);
                        }}
                        style={{
                            position: "absolute",
                            width: 50,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            top: 0,
                            right: 0,
                        }}
                    >
                        <MaterialIcons name="close" color={"#fff9"} size={24} />
                    </TouchableOpacity>
                </View>
            </Modal>
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

export default connect(mapStateToProps)(Userpost);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
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
