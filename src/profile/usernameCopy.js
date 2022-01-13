import React, {useState, useEffect} from 'react';
import { View,Text, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView, ActivityIndicator } from 'react-native';
import { FontAwesome,FontAwesome5, AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { API_URL,IMG_URL } from '../url/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';


const Username = ({navigation,route, user_id, profile_pic, first_name}) => {
    const [value, onChangeText] = React.useState('');
    const [uname, setUsername] =React.useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState('Add as a Friend');
    const [buttonCheck, setButtonCheck] = useState(false);
    const [fstatus, setFstatus] =React.useState("");
  
    useEffect(() => {
        if(route.params.datauser.friendstatus){
            setFstatus(route.params.datauser.friendstatus);
            alert(fstatus[0]['status']);
        }
        
    }, [navigation])
    
    const datauser = route.params.datauser;
    console.log(fstatus);
    React.useLayoutEffect(() => {
        navigation.setOptions({
    
              title:'',
              headerLeft: () => (
                <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignItems:'center', width:Dimensions.get("screen").width/1.25 }}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        >
                        <AntDesign name="left" size={24} color="white"  style={{ marginLeft: 10 }} />
                        
                    </TouchableOpacity>
                    <View style={{flex:4, alignItems:'center', justifyContent:'center', marginRight:10}}>
                        <Text style={{ color:'#fff', textAlign:'center', fontFamily:'font2', fontSize:20 }}>{datauser.first_name}</Text>
                    </View>
                </View>
              ),  
              headerTintColor: '#fff',
              headerTitleAlign:'center',
              headerStyle: {
                backgroundColor: '#B2C248'
              },
    
        });
    }, [navigation]);
    //console.log(datauser);
    //alert(datauser.user_id);
      //alert(user_id);  
    const sendrequest_button =()=>{
        
        setIsLoading(true);

                let formData = new FormData();

                formData.append('client_id',user_id);
                formData.append('friend_id',datauser.user_id);
                console.log(formData);
                //alert(formData);
                
                fetch(API_URL+ '/send_request.php',{
                    
                    method: 'POST', // or 'PUT'
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                
                })
                .then(response => response.json())
                .then((responseJson) => {
                    console.log("adfasdf");
                    console.log(responseJson);
                    
                    if (responseJson.error == "1") {  
                        setUsername(responseJson.username);
                        // setTimeout(() => {
                            setIsLoading(false);
                            alert(responseJson.error_msg);
                            setButtonCheck(true);
                            setRequest('Request Sent');

                        // }, 2000);
                        
                    }else{  
                        if (responseJson.error == "2") {  
                            setUsername(responseJson.username);
                            // setTimeout(() => {
                                setIsLoading(false);
                                alert(responseJson.error_msg);
                                setRequest('Add as a friend');
                            // }, 2000);
                            
                        }else{  
                                 
                            alert(responseJson.error_msg); 
                            setIsLoading(false);                        
                        }
                             
                                              
                    }                
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    // ADD THIS THROW error
                    throw error;
                });
    
        //    });
        //});
    
    }
    
    return (
        <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <ScrollView>        
        <View style={styles.container}>
            <View>
                <Image 
                    style={{ width:Dimensions.get('window').width, height:200}}
                    source={{uri: IMG_URL+datauser.profile_pic}} 
                    PlaceholderContent={<ActivityIndicator size="small" color="white" />}
                    source={ profile_pic ==="" ? defaultProfileImg : { uri:IMG_URL+datauser.profile_pic}} 

                    //source={require('../../assets/icon/man.png')}   
                />
                
                <View style={{alignItems:'center', }}>
                    <Image 
                        style={{ width:120, height:120, position:'absolute', borderRadius:500,borderWidth:1, resizeMode:'cover', top:-60,borderColor:'#E1A086' }}
                        source={{uri: IMG_URL+datauser.profile_pic}} 
                        //source={require('../../assets/icon/man.png')}  
                    />
                </View>

                <Text style={{alignSelf:'center', marginTop:80, fontSize:16}}>{datauser.first_name} {datauser.last_name}</Text>
                <Text style={{alignSelf:'center', fontSize:12, textAlign:'center', margin:30, marginTop:10}}>{datauser.about_me.replace(/\\n/g,'')}</Text>

                      
                { route.params.datauser.friendstatus[0].status=="" && <TouchableOpacity
                    onPress={() => sendrequest_button()} 
                    disabled={buttonCheck}
                    style={{ backgroundColor:'black' ,height:40, width:300, borderRadius:10,borderWidth:1, flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>

                    { isLoading ? (<ActivityIndicator color="#fff" size="small"  />) : 
                    <View>
                        {/* <FontAwesome5 name="user-check" size={22} color="#fff" style={{ marginTop:5}} /> */}

                        <Text style={{color:'#fff', marginLeft:10,marginTop:10, fontSize:12}}>{request}</Text>
                    </View>
                    }
                </TouchableOpacity>}


                { fstatus[0]['status']=="Accepted" && <View style={{alignItems:'center'}}>
                    
                    <Text style={{color:'black', fontFamily:'font2', fontSize:18}}>Friends</Text>
                </View>}

                { fstatus[0]['status']=="Pending" && <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>route.params.datauser.friendstatus[0].status='Accepted'} style={{paddingVertical:'2%',  backgroundColor:'#F5856B', borderRadius:5, paddingHorizontal:'8%'}}>
                            <Text style={{fontFamily:'font2', fontSize:15, color:'#fff'}}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ paddingVertical:'2%', marginLeft:10,  backgroundColor:'#B2C248', borderRadius:5, paddingHorizontal:'8%'}}>
                            <Text style={{fontFamily:'font2', fontSize:15, color:'#fff'}}>Reject</Text>
                        </TouchableOpacity>
                    </View>}

                <View style={styles.profile}>
                    <View style={{width:40, height:40, borderRadius:30,backgroundColor:'#F5866B', marginTop:-5}}>
                        <FontAwesome5 name="lock" size={20} color="#fff" style={{padding:10}} />
                    </View>
                    <Text style={{fontSize:16, paddingLeft:20}}>User profile is {datauser.is_private=='0'? 'Public':'Public'}</Text>
                </View>

                <View style={styles.profile}>
                    <View style={{width:40, height:40, borderRadius:30,backgroundColor:'#F5866B', marginTop:-5}}>
                        <FontAwesome name="home" size={20} color="#fff" style={{padding:10}} />
                    </View>
                    <Text style={{fontSize:16, paddingLeft:20}}>{datauser.location}</Text>
                </View>

            </View>            
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

//export default Username;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic, user_id, first_name, last_name} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic,user_id, first_name, last_name
    }
}

export default connect(mapStateToProps)(Username);


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