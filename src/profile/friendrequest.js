import React, {useRef, useEffect, useState} from 'react';
import { View,Text,FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome,FontAwesome5 ,MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';
import Menu ,{MenuItem} from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { API_URL, IMG_URL } from '../url/url';

const Friendrequest = ({navigation,username,location,about_me,gender,profile_pic,dob,name, user_id}) => {
    

    const [value, onChangeText] = React.useState('');
    const [usertitle, setUserTitle] = React.useState([]);
    const [search, onSearchText] = React.useState('');
    const [friend, setFriendText] = React.useState('');
    const defaultProfileImg = require('../../assets/profile_picture.png');
    

    const Item = ({ title ,imgUrl, onPress , fun, friend}) => {

        return (
            <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
            <ScrollView>
                <TouchableOpacity onPress={onPress} style={styles.item}>
                    <Image
                        //source={{uri:imgUrl}}
                        source={ imgUrl ==="" ? defaultProfileImg : { uri:imgUrl}} 
                        style={{height:50,width:50,borderRadius:40,resizeMode:'cover'}}
                    />

                        <View style={{flexDirection:'column'}}>
                            <Text onPress={onPress}
                                style={{paddingLeft:20}}> {title} </Text>                    

                            <View style={{flexDirection:'row', justifyContent:'center', marginTop:10 }}>
                                <TouchableOpacity 
                                    onPress={() => take_action('Accepted',friend)} 
                                    style={{width:80, height:30, borderRadius:6, backgroundColor:'#F5866B', marginLeft:10}}>
                                    <Text style={{color:'#fff',alignSelf:'center'}}>Accept</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => take_action('Declined',friend)} 
                                    style={{width:80, height:30, borderRadius:6, backgroundColor:'#B2C248', marginLeft:5}}>
                                    <Text style={{color:'#fff',alignSelf:'center'}}>Decline</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
 
                </TouchableOpacity>
            
            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    useEffect(() => {
            let formData = new FormData();
                
                formData.append('username',search);
                formData.append('user_id',user_id);
                console.log(formData);
                //alert(user_id);
                fetch(API_URL+ '/pending_request.php',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        body:formData
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            
                            if (responseJson.error = '1') {  
                                setUserTitle(responseJson);

                            }else{    
                                alert(responseJson.error_msg); 
                            }   
                        })
                        .catch((error) => {
                        console.error(error);
                        });
        }, []);

        const search_user =()=>{
    
            //useEffect(() => {
    
                let formData = new FormData();
                
                formData.append('username',search);
                formData.append('user_id',user_id);
                console.log(formData);
                //alert(user_id);
    
                fetch(API_URL+ '/pending_request.php',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        body:formData
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                        console.log(responseJson);

                            if (responseJson.error = '1') {  
                                setUserTitle(responseJson);

                            }else{    
                                alert(responseJson.error_msg); 
                            }   
                        })
                        .catch((error) => {
                        console.error(error);
                        });
                        
            //}, []);
        }


        const take_action =(type,friendid)=>{
        //alert(friendid);    
            let formData = new FormData();
            
            //alert(usertitle.user_id);
            formData.append('user_id',user_id);
            formData.append("friend_id",friendid);
            formData.append('status',type);
            
            console.log(formData);
          
    
            fetch(API_URL+ '/request.php',{
                
              method: 'POST', // or 'PUT'
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              
              })
              .then(response => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                    if(responseJson.error == "0"){
                        alert(responseJson.error_msg);
                    }   
                    else{
                        alert("else");
                    }

              })
              .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                  throw error;
            });
        } 
        
        

        
    const renderItem = ({ item }) => (
        <Item title={item.username} about={item.about_me} imgUrl={IMG_URL+item.profile_pic} friend={item.user_id} onPress={() => navigation.navigate('Username1',{datauser:item}) } /> 
    );

    return (

        <View style={styles.container}>
       
            <View style={styles.container1}>
                <TouchableOpacity style={{height:50, borderRadius:30, borderWidth:1,borderColor:'#D7D7D7', flexDirection:'row', justifyContent:'flex-start'}}>
                    <AntDesign name="search1" size={20} color="black" style={{padding:12,color:'#C2C2C2'}} />
      
                    <TextInput
                        onKeyPress={search_user}
                        style={{ height: 40, width:350, }}
                        onChangeText={text => onSearchText(text)}
                        value={search}
                        placeholder="search friend"
                    />
      
                </TouchableOpacity>

                <View style={{flexDirection:'row', paddingTop:10, paddingLeft:5, paddingRight:5}}>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Friends')}
                        style={styles.location}>
                            <FontAwesome name="user" size={18} color="#CFCFCF" style={styles.icon} />
                            <Text style={{ fontSize:14, color:'#CFCFCF'}}>My Friends</Text>                        
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Friendequest')}
                        style={styles.user}>
                            <FontAwesome5 name="user-friends" size={18} color="#fff" />
                            <Text style={{ fontSize:14, color:"#fff"}}>Friend Requests</Text>                        
                    </TouchableOpacity>
                </View>

                {/* <View style={{flexDirection:'row', justifyContent:'space-between', margin:20}}>
                    <Text style={{ marginTop:30, fontWeight:'bold' }}>Friend requests</Text>
                    <Text style={{ marginTop:30, marginRight:20, fontSize:14, color:'#F69C86' }}>See All</Text>
                    
                </View> */}
      
            </View>



            <View style={styles.flatlist}>

                <FlatList 
                        numColumns={1}
                        showsHorizontalScrollIndicator={false} 
                        data={usertitle}
                        renderItem={renderItem} 
                        style={{marginTop:10}}                
                        keyExtractor={(item,index) => index.toString()} 
                />

            </View>

            <View style={{margin:20}}>

            </View>
            {/* <TouchableOpacity
                    style={styles.load}>
                <Text style={{padding:7, color:'#B2C248'}}>load more...</Text>
            </TouchableOpacity> */}



 
        </View>

    );
}

//export default Friendrequest;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic, user_id} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic, user_id
    }
}
 
    export default connect(mapStateToProps)(Friendrequest); 



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    container1:{
        margin:15,
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
        backgroundColor:'#fff'
    },
    user:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        borderWidth:1, 
        borderColor:'#D7D7D7', 
        width:'50%', 
        height:30,
        backgroundColor:'#F5866B',
    },
    icon:{
        paddingLeft:10, 
        paddingTop:3 
    },
    item:{
        margin:10,
      //  width:350,
        height:50,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    flatlist:{
        borderTopWidth:1,
        borderColor:'#D7D7D7',
        marginBottom:100,
        height:Dimensions.get('screen').height,
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
        
    }, 
})