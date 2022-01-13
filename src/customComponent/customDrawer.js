import * as React from 'react';
import { View,Text,ImageBackground, Dimensions,TouchableOpacity, Image, ActivityIndicator, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import Input from '../customComponent/input';
import { FontAwesome,FontAwesome5, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL ,IMG_URL} from '../url/url';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
// import { Image } from 'react-native-elements';

const CustomDrawerContent=(props)=> {
    const defaultProfileImg = require('../../assets/profile_picture.png');

    const [refresh_edit , set_refresh_edit] = React.useState(false)

    const state = useSelector(state => state);
    const user = state.userReducer.profile_pic;
    // const name = state.userReducer.username;
    const first_name = state.userReducer.first_name;
    const last_name = state.userReducer.last_name;
    // console.log(user);
    // console.log("hello"+user);


    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userid');
            
        
            await AsyncStorage.clear;
            AsyncStorage.clear();
         
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Signin' }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (

      <View style={{flex:1}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Userprofile')} >
          <Image 
             PlaceholderContent={<ActivityIndicator size="small" color="white" />}
            style={{ position : 'relative' , top :0 , height :200  , width : '100%' }}
            source={user ==="" ? defaultProfileImg : { uri:IMG_URL+user}} 
          />
          </TouchableOpacity>

                
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Userprofile')}
                    style={{
                        flexDirection: 'row',  alignItems: 'center', marginBottom: 20, marginTop:30, marginLeft:12
                    }}>
                    <View style={{  height: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontSize: 16, color: '#000a'}}><Ionicons name="person" size={18} color="black" />  {first_name} {last_name}</Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>{

                        set_refresh_edit(!refresh_edit);
                                                
                        props.navigation.navigate('Editprofile' , {
                        'refresh_edit':refresh_edit
                    })}}
                    style={{
                        flexDirection: 'row', marginBottom: 20, alignItems: 'center',
                    }}>
                    <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text><FontAwesome5 name="user-edit" size={18} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Edit Profile</Text>
                </TouchableOpacity>


                
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Searchmenu')}
                    style={{
                        flexDirection: 'row', marginBottom: 20, alignItems: 'center'
                    }}>
                    <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text><AntDesign name="search1" size={18} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Myfriends')}
                    style={{
                        flexDirection: 'row', marginBottom: 20, alignItems: 'center'
                    }}>
                    <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text><FontAwesome5 name="user-friends" size={18} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Friend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => logout()}
                    style={{
                        flexDirection: 'row', marginBottom: 20, alignItems: 'center'
                    }}>
                    <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text> <MaterialIcons name="logout" size={18} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Logout</Text>
                </TouchableOpacity>

          
        </View> 
      
  );
}




  
  
   
export default CustomDrawerContent; 
