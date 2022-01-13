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
import Overlayloading from "../customComponent/OverlayLoading";

const defaultProfileImg = require("../../assets/profile_picture.png");
const defaultPostImg = require("../../assets/post_img.png");
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const MannualLocation = ({ navigation, service, user_id }) => {
    const [location1, setLocation] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [current_address, setCurrent_address] = useState("Select address");
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0053,
        longitudeDelta: 0.0034,
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Manual search",
            headerLeft: () => (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="chevron-back"
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
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                style={{ backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
            >
                <View style={styles.container}>
                    <GooglePlacesAutocomplete
                        placeholder="Please enter a location to upload the post"
                        minLength={1} // minimum length of text to search
                        autoFocus={true}
                        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed="auto" // true/false/undefined
                        fetchDetails={true}
                        renderDescription={(row) => row.description} // custom description render
                        onPress={(data, details = null) => {
                            // alert(details.geometry.location.lat);
                            //    console.log('details', details.formatted_address);
                            // setLatitude(details.geometry.location.lat);
                            // updateLatitute(details.geometry.location.lat);

                            // updateLongitute(details.geometry.location.lng);
                            // setLongitude(ldetails.geometry.location.lng);
                            setCurrent_address(details.formatted_address);
                            //  alert(current_address);
                            // addCustomeraddress(details.address_components[0].formatted_address);
                            setRegion({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.0053,
                                longitudeDelta: 0.0034,
                            });

                            // console.log(region);
                            setLoading(true);
                            // setTimeout(() => {
                                navigation.navigate("Createpost", {
                                    address: details.formatted_address,
                                    lat_long: {
                                        latitude: details.geometry.location.lat,
                                        longitude:
                                            details.geometry.location.lng,
                                        latitudeDelta: 0.0053,
                                        longitudeDelta: 0.0034,
                                    },
                                });
                                setLoading(false);
                            // }, 2000);

                            // setLatitude_ad(details.geometry.location.lat);
                            // setLongitude_ad(details.geometry.location.lng);
                        }}
                        getDefaultValue={() => {
                            return ""; // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: "AIzaSyB4QdZFNywIg4_KwOO_ZpuCHrJHg_D9a34",
                            language: "en", // language of the results
                        }}
                        styles={{
                            textInputContainer: {
                                backgroundColor: "white",
                                borderRadius: 40,
                                marginHorizontal: 10,
                                marginTop: 15,
                                marginBottom:5,
                                shadowOpacity:0.2,
                                shadowOffset:{x:0 , y:0},

                                paddingHorizontal: 15,
                                // borderWidth: 1,
                                // borderColor: "#888",

                                width: Dimensions.get("window").width / 1.05,
                                // alignItems:'center',
                                justifyContent: "center",
                                
                                // backgroundColor:'red',
                                // paddingVertical:3
                            },
                            description: {
                                fontWeight: "bold",
                                color: "black",
                            },
                            predefinedPlacesDescription: {
                                color: "#1faadb",
                            },
                            textInput: {
                                backgroundColor: "transparent",
                                height: 35,
                                fontSize:12
                            },
                        }}
                        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={
                            {
                                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }
                        }
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: "distance",
                        }}
                        // filterReverseGeocodingByTypes={[
                        //   'locality',
                        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        debounce={200}
                        renderLeftButton={() => (
                            <FontAwesome
                                style={{ marginTop: 10 }}
                                name="search"
                                size={14}
                                color="#ccc"
                            />
                        )}
                    />

                    <Overlayloading visible={loading}>
                        Please wait...
                    </Overlayloading>
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

export default connect(mapStateToProps)(MannualLocation);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
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
