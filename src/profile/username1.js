import React, {Profiler, useRef} from 'react';
import { View,Text,FlatList,Image, Dimensions, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome,FontAwesome5 ,MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';
import Menu ,{MenuItem} from 'react-native-material-menu';
import { API_URL,IMG_URL } from '../url/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
//import { Image } from 'react-native-elements';


const Username1 = ({navigation, route, user_id, profile_pic, about_me}) => {
    const [username, setUsername] =React.useState('');
    const [friend, setFriendText] = React.useState('');
    
    const defaultProfileImg = require('../../assets/profile_picture.png');
    const defaultPostImg = require('../../assets/post_img.png');

    const datauser = route.params.datauser;
    console.log("user id "+datauser.user_id);
    console.log("friend id  "+datauser.friend_id);
    
    console.log(user_id);

    const take_action =(type,friendid)=>{
        //alert("hello");        
        
        let formData = new FormData();
        //alert(usertitle.user_id);
        formData.append('user_id',datauser.user_id);
        formData.append("friend_id",datauser.friend_id);
        formData.append('status',type);
        
        console.log(formData);
        console.log("response");

        fetch(API_URL+ '/request.php',{
            
          method: 'POST', // or 'PUT'
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          
          })
          .then(response => response.json())
          .then((responseJson) => {
            console.log("hello"+JSON.stringify(responseJson));
                // if(responseJson.length > 0){
                //     alert("jshjd");
                // }
                if(responseJson.error == "0"){
                    alert(responseJson.error_msg);
                }   
                else{
                    alert(responseJson.error_msg);
                }

          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
        });
    }
    return (
        <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <ScrollView>        
        <View style={styles.container}>
            <View>
                <Image 
                    style={{ width:Dimensions.get('window').width, height:200}}
                    PlaceholderContent={<ActivityIndicator size="small" color="white" />}               
                    source={ profile_pic ==="" ? defaultPostImg : { uri:IMG_URL+datauser.profile_pic}} 
                    //source={require('../../assets/icon/man.png')}   
                    //source={{uri: IMG_URL+datauser.profile_pic}} 

                />
                
                <View style={{alignItems:'center', }}>
                    <Image 
                        style={{ width:120, height:120, position:'absolute', borderRadius:500,borderWidth:1, resizeMode:'cover', top:-60,borderColor:'#E1A086' }}                       
                        PlaceholderContent={<ActivityIndicator size="small" color="white" />}               
                        source={ profile_pic ==="" ? defaultProfileImg : { uri:IMG_URL+datauser.profile_pic}}         
                        //source={{uri: IMG_URL+datauser.profile_pic}} 
                        // source={require('../../assets/icon/man.png')}   
                    />
                </View>

                <Text style={{alignSelf:'center', marginTop:80, fontSize:16}}>{datauser.username}</Text>
                <Text style={{alignSelf:'center', fontSize:12, textAlign:'center', margin:30, marginTop:10}}>{datauser.about_me}</Text>


                <View style={{flexDirection:'row', justifyContent:'flex-start', marginLeft:50 }}>
                    <TouchableOpacity 
                        onPress={() => take_action('Accepted',friend)} 
                        style={{width:100, height:40, borderRadius:6, backgroundColor:'#F5866B', marginLeft:10}}>
                        
                        <View style={{flexDirection:'row', justifyContent:'center' }}>
                            <FontAwesome5 name="user-check" size={16} color="#fff" style={{marginTop:8}} />
                            <Text style={{color:'#fff',margin:5 }}>Accept</Text>
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => take_action('Declined',friend)} 
                        style={{width:100, height:40, borderRadius:6, backgroundColor:'#B2C248', marginLeft:10}}>
                        
                        <View style={{flexDirection:'row', justifyContent:'center' }}>
                            <MaterialIcons name="delete-sweep" size={20} color="#fff" style={{marginTop:8}} />
                            <Text style={{color:'#fff',margin:5 }}>Decline</Text>
                        </View>
                        
                    </TouchableOpacity>

                </View>

                
                <View style={styles.profile}>
                    <View style={{width:40, height:40, borderRadius:30,backgroundColor:'#F5866B', marginTop:-5}}>
                        <FontAwesome5 name="lock" size={20} color="#fff" style={{padding:10}} />
                    </View>
                    <Text style={{fontSize:16, paddingLeft:20}}>User profile is locked</Text>
                </View>

                <View style={styles.profile}>
                    <View style={{width:40, height:40, borderRadius:30,backgroundColor:'#F5866B', marginTop:-5}}>
                        <FontAwesome name="home" size={20} color="#fff" style={{padding:10}} />
                    </View>
                    <Text style={{fontSize:16, paddingLeft:20}}>User profile is locked</Text>
                </View>

            </View>
            
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

//export default Username1;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic, user_id} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic,user_id
    }
}

export default connect(mapStateToProps)(Username1);


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
    },
    container1:{
        marginLeft:30,
        marginTop:15,
        marginBottom:10,
    },
    profile:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        marginLeft:60, 
        marginTop:30,
    },

})