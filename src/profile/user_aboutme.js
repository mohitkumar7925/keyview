import * as React from "react";
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import Input from "../customComponent/input";
import { FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, IMG_URL } from "../url/url";
import { connect } from "react-redux";

const Aboutme = ({
    navigation,
    username,
    location,
    about_me,
    gender,
    profile_pic,
    dob,
    name,
    city,
    country,
    first_name,
    last_name,
    state,
    route,
}) => {

    const {datauser} = route.params;
    React.useLayoutEffect(() => {
        console.log(route)
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

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <ScrollView style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.profile}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 40,
                                    shadowOpacity: 0.2,
                                    shadowOffset: { width: 0, height: 0 },
                                }}
                            >
                                <Image
                                    // onPress={() =>
                                    //     navigation.navigate("Editprofile")
                                    // }
                                    source={{ uri: IMG_URL + datauser.profile_pic }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 40,
                                    }}
                                />
                            </View>

                            <Text style={{ margin: 10, fontSize: 18 }}>
                                {datauser.username}
                            </Text>
                        </View>

                        <Text style={styles.basic}>Basic info</Text>

                        <View style={styles.info}>
                            <View style={styles.row}>
                                <FontAwesome
                                    name="user"
                                    size={20}
                                    color="black"
                                />
                                <Text style={styles.label}>Full Name</Text>
                            </View>
                            <Text style={styles.text}>
                                {datauser.first_name.charAt(0).toUpperCase()+ datauser.first_name.slice(1)} {datauser.last_name.charAt(0).toUpperCase()+ datauser.last_name.slice(1)}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <View style={styles.row}>
                                <FontAwesome
                                    name="user"
                                    size={20}
                                    color="black"
                                />
                                <Text style={styles.label}>UserName</Text>
                            </View>
                            <Text style={styles.text}>{datauser.username} </Text>
                        </View>

                        <View style={styles.info}>
                            <View style={styles.row}>
                                <FontAwesome
                                    name="birthday-cake"
                                    size={18}
                                    color="black"
                                />
                                <Text style={styles.label}>Birthday</Text>
                            </View>
                            <Text style={styles.text}> {datauser.dob}</Text>
                        </View>

                        <View style={styles.info}>
                            <View style={styles.row}>
                                <FontAwesome5
                                    name="genderless"
                                    size={20}
                                    color="black"
                                />
                                <Text style={styles.label}> Gender</Text>
                            </View>
                            <Text style={[styles.text,]}>
                                
                                {datauser.gender}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <View style={styles.row}>
                                <FontAwesome
                                    name="home"
                                    size={20}
                                    color="black"
                                />
                                <Text style={styles.label}>Location</Text>
                            </View>
                            <Text style={[styles.text, { marginLeft: 30 }]}>
                                {datauser.city} {datauser.country} {datauser.location}
                            </Text>
                        </View>

                        <Text style={styles.about}>About Me</Text>

                        <View style={styles.detail}>
                            <Text
                                style={{
                                    fontFamily: "font6",
                                    fontSize: 16,
                                    letterSpacing: 1,
                                }}
                            >
                                {datauser.about_me.replace(/\\n/g, "\n")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        city,
        country,
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
        city,
        country,
        state,
        first_name,
        last_name,
    };
};

export default connect(mapStateToProps)(Aboutme);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        paddingBottom:20
    },
    profile: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 20,
        marginLeft: 30,
        marginRight: 30,
        paddingBottom: 20,
        //width:250,
        borderColor: "black",
        borderBottomWidth: 0.5,
    },
    info: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        padding: 5,
        borderColor: "black",
        borderBottomWidth: 0.5,

        //      borderbottomWidth:0.5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    flex: {
        flexDirection: "row",
        justifyContent: "center",
    },
    label: {
        paddingLeft: 20,
        paddingTop: -10,
        fontSize: 16,
        fontFamily: "font2",
    },
    label1: {
        paddingLeft: 18,
        paddingTop: -10,
        fontSize: 16,
    },
    text: {
        marginLeft: 35,
        //    borderbottomWidth:1,
        fontSize: 15,
    },
    basic: {
        margin: 30,
        marginBottom: 10,
        marginTop: 0,
        fontWeight: "bold",
        fontSize: 18,
    },
    detail: {
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        height:100,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#F0F0F0",
    
    },
    about: {
        margin: 30,
        marginBottom: 0,
        fontWeight: "bold",
        fontSize: 18,
    },
});
