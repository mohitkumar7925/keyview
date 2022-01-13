import React, {useRef, useEffect} from 'react';
import { View,Text,FlatList, Dimensions, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator, SectionList } from 'react-native';
import Button1 from '../customComponent/button1';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome, MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';
import {ToggleButton} from 'react-native';
import { useState } from 'react';
import Input from '../customComponent/input';
import MapView from 'react-native-maps';
import Input1 from '../customComponent/input';
import { API_URL, IMG_URL } from '../url/url';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { connect } from 'react-redux';
import { Image } from 'react-native-elements';



    // const Item1 = ({ title ,about,imgUrl, onPress }) => {
    //     return (
    //         <TouchableOpacity onPress={onPress} style={styles.item1}>
    //             <Image
    //                 source={{uri:imgUrl}} style={{height:50,width:50,borderRadius:40,resizeMode:'cover'}}/>
    
    //             <View style={{padding:10}}>
    //                 <Text style={styles.title}>{title} </Text>
    //                 <Text>{about}</Text>
    //             </View>
                    
    //         </TouchableOpacity>
    //     );
    // }


const Search = ({navigation, user_id}) => {
    const [usertitle, setUserTitle] = React.useState([]);
    const [search, onSearchText] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const defaultProfileImg = require('../../assets/profile_picture.png');

    const Item = ({ title ,imgUrl, onPress, about }) => {
        return (
            <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
            <ScrollView>
            <TouchableOpacity onPress={onPress} style={styles.item}>
                <Image
                    //source={{uri:imgUrl}} 
                    source={ imgUrl ==="" ? defaultProfileImg : { uri:imgUrl}} 
                    PlaceholderContent={<ActivityIndicator size="small" color="white" />}               
                    style={{height:78,width:100,borderTopLeftRadius:10,borderBottomLeftRadius:10 ,resizeMode:'cover'}}/>
    
                <View style={{padding:20}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{about}</Text>
                </View>
                    
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
    

    const renderItem = ({ item }) => (
        <Item title={item.username} about={item.about_me} imgUrl={IMG_URL+item.profile_pic} onPress={() => navigation.navigate('Username',{datauser:item}) } />
       
    );


    // let formData = new FormData();
          
    // formData.append('location',search);
    // formData.append('user_id',user_id);

    // fetch(API_URL+ '/nearby_user.php',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body:formData
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //         //console.log(responseJson);
    //             if(responseJson > 0){
    //                 setUserTitle(responseJson);
    //                 setTimeout(() => {
    //                     setIsLoading(false);
                    
    //                 }, 2000);
            
            
    //             }
    //             else{
    //                 //alert("hello");
    //                 setUserTitle(responseJson);
    //               //  alert(responseJson.error);
    //             }
                
    //         })
    //         .catch((error) => {
    //         console.error(error);
    //         });


    const search_location =()=>{

        setIsLoading(true);
        let formData = new FormData();
            
            formData.append('location',search);
            formData.append('user_id',user_id);

            console.log(search);
            console.log(user_id);

            fetch(API_URL+ '/nearby_user.php',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formData
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                    console.log(responseJson);

                    if(responseJson[0].error ="1" ){
                        //alert(JSON.stringify(responseJson));
                        setUserTitle(responseJson[0].data);
                        // setTimeout(() => {
                            setIsLoading(false);
                        
                        // }, 2000);
                    }
                    else{
                        alert("hello");
                        console.log(responseJson);
                        setErrorMsg("No User Found");
                        // setTimeout(() => {
                        //     setIsLoading(false);
                        // }, 4000);

                    }
                        
                })
                    .catch((error) => {
                    console.error(error);
                    });        
        //    }
        //})
    }

    return (

        <View style={styles.container}>
             
            <View>
                <View style={styles.container1}>
                    <TouchableOpacity style={{height:50, borderRadius:30, borderWidth:1,borderColor:'#D7D7D7', flexDirection:'row', justifyContent:'flex-start'}}>
                        <AntDesign name="search1" size={24} color="black" style={{padding:12,color:'#C2C2C2'}} />
        
                        <TextInput
                            onKeyPress={search_location}
                            style={{ height: 40, width:350 }}
                            onChangeText={text => onSearchText(text)}
                           // value={search}
                        />
        
                    </TouchableOpacity>
                    
                    <View style={{flexDirection:'row', justifyContent:'flex-start', paddingTop:10, paddingLeft:7}}>
                        
                        <TouchableOpacity 
                            //onPress={search_location}
                            style={styles.location}>
                            <Entypo name="location-pin" size={20} color="#fff" style={styles.icon} />
                            <Text style={{ fontSize:18, color:'#fff'}}>location</Text>
                            
                        </TouchableOpacity>

                        <TouchableOpacity 
                            //onPress={search_user}
                            onPress={() => navigation.navigate('Usersearch')}
                            style={styles.user}>
                            <FontAwesome name="user" size={20} color="#CFCFCF" style={styles.icon} />
                            <Text style={{ fontSize:18, color:"#CFCFCF"}}>user</Text>
                            
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={{ borderBottomWidth:1, borderColor:'#D7D7D7' }}></View>
                
                {usertitle!=[] && usertitle.length> 0 && usertitle.error!=[0] && !isLoading?
           

                    <View style={styles.flatlist}>
                        <SafeAreaView>
                        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
                        <ScrollView>

                        <FlatList 
                                onPress={() => navigation.navigate('')} 
                                numColumns={1}
                                showsHorizontalScrollIndicator={true}
                                //showsVerticalScrollIndicator={true}
                                data={usertitle}
                                renderItem={renderItem} 
                                style={{marginTop:10}}        
                                keyExtractor={(item,index) => index.toString()}         
                        />
                        </ScrollView>
                        </KeyboardAvoidingView>
                        </SafeAreaView>
                    </View>

                    :<View style={[styles.map, { alignItems:'center', paddingTop:'30%', backgroundColor:'#fff' }]}>
                        {isLoading && <ActivityIndicator color='#B2C248' size='large' />}
                        <Text style={{fontFamily:'font2', marginTop:20, fontSize:18, color:'#B2C248'}}>{errorMsg}</Text>
                    </View>}

            </View>
        </View>

    );
}

//export default Search;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic,user_id, first_name, last_name} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic,user_id, first_name, last_name
    }
}

export default connect(mapStateToProps)(Search);



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,

    },
    container1:{
        margin:15,
        // marginRight:10,
        // marginLeft:10,
        marginTop:15,
        marginBottom:10,
    },
    location:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        borderWidth:1, 
        borderColor:'#D7D7D7', 
        width:'50%', 
        height:30,
        backgroundColor:'#F5866B'
    },
    user:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        borderWidth:1, 
        borderColor:'#D7D7D7', 
        width:'50%', 
        height:30
    },
    icon:{
        paddingLeft:10, 
        paddingTop:3 
    },
    item:{
        marginLeft:20,
        marginBottom:2,
        //paddingBottom:20,
        width:Dimensions.get('screen').width-40,
        height:80,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#D7D7D7',
        //flex:1, 
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    flatlist:{
        //borderTopWidth:1,
        //borderColor:'#D7D7D7',
       // marginBottom:100,
        //height:'100%',
        //height:Dimensions.get('screen').height,
        //flex:1,

    },
    item1:{
        margin:10,
        marginLeft:50,
        //marginBottom:2,
        //paddingBottom:20,
        width:350,
        height:50,
        borderRadius:20,
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
    },

    load:{
        width:100, 
        height:40, 
        borderRadius:10, 
        borderWidth:1, 
        borderColor:'#B2C248', 
        alignSelf:'center'
    },
    keyview:{
        margin:80,
        backgroundColor:'#B2C248',
        width:250,
        height:130,
        justifyContent:'center',
        borderRadius:10
    },
    heading1:{
        fontSize:25,
        color:'#fff',
        fontWeight:'bold',
        alignSelf:'center'
    },
    welcome:{
        fontWeight:'bold',
        fontSize:25,
        color:'#B2C248'
    },
    text:{
        marginTop:20,
        fontSize:20
    }, 
    map:{
        width: Dimensions.get('window').width,
        height: 530,
    },
    tab:{
        flexDirection:'column',
        
    }
 
})