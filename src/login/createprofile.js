import React, {useEffect, useRef, useState} from 'react';
import { View,Text, Image, StyleSheet, TextInput, Switch, ScrollView, TouchableOpacity, KeyboardAvoidingView, SafeAreaView,ActivityIndicator, Dimensions, Platform } from 'react-native';
import Button1 from '../customComponent/button1';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Input from '../customComponent/input';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { API_URL ,IMG_URL} from '../url/url';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {change_user_detail} from "../../store/actions/user_action";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import DropdownMenu from 'react-native-dropdown-menu';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-root-toast';
import {  Overlay } from 'react-native-elements';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//import {change_user_detail_value} from "../../store/actions/user_action";



const Createprofile = ({navigation, route, user_id, updateUserDetail, updateUser}) => {
    const ref = useRef();
    const [msgShown, setShowToast] = useState(true);
    const msg = route.params.msg? route.params.msg : null;
    const [toastMsg, setToastMsg] = useState(""); 
    if (msg != null && msgShown) {        
        
        setTimeout(() => {
            setShowToast(false);
    }, 3000);       

    }

    const data = route.params;
    const defaultProfileImg = require('../../assets/profile_picture.png');

    const [isLoading, setIsLoading] = useState(false);
    const [visibleCalander, setVisibleCalander] = useState(false);
    

    const [image, setImage] = useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [username, setUsername] = React.useState(route.params.username);
 
    const [location, setLocation] = React.useState('');

    const [gender, setGender] = useState();
    const [aboutme, setAboutme] = React.useState('');

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    const ref_input4 = useRef(null);
    const ref_input5 = useRef(null);
    

    //const gender = ["Male", "Female"]
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // const showTimepicker = () => {
    //     showMode('time');
    // };

    
  

    useEffect(() => {
     
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

       
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(image);
        }
    };


            
        

    const createprofile_button =()=>{
        setIsLoading(true);
        if(firstname!="" && lastname!="" && date!="" && location!="" && gender!="" && aboutme!="" ){

        
        
        
                
        let formData = new FormData();


        if(image != null && image != "" && image != undefined){
        
            var localUri = image;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            formData.append('image', { uri: localUri, name: filename, type: type});
           
        
        }    
            formData.append('first_name',firstname);
            formData.append('last_name',lastname);
            formData.append('username',username);
            formData.append('dob',date);
            formData.append('location',location);
            formData.append('gender',gender);
            formData.append('about_me',aboutme);
            formData.append('updte','1');
            formData.append('private',isEnabled);      
            formData.append('user_id',route.params.userid);

            
            console.log(formData);
        //}
            fetch(API_URL+ '/create_profile.php',{
                
                method: 'POST', // or 'PUT'
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                //alert("dhsbdhss");                
                if (responseJson.error == '1') {  

                        // alert(responseJson.error_msg);
                        //const async_userid_value = AsyncStorage.setItem('userid', userid1); 
                        const async_id_value = AsyncStorage.setItem('userid', JSON.stringify(responseJson.user_id)); 
                        fetch_current_location(responseJson.user_id);
                        fetch_user(responseJson.user_id);
                   
        
                    }else{       
                        setIsLoading(false);
                        alert(responseJson.error_msg);           
                        //alert("jdhsghd");
                    }
                                
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });

        }else{
           
            // setTimeout(() => {                      
                setIsLoading(false); 
                alert("All field are required!")
            // }, 500);
            
          
        }

            
             
        
    }


    const fetch_user =(value)=>{
    
        fetch(API_URL+'/user_details.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: value,
            })
          })
            .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson);
              if (responseJson.error == "1") {
                 updateUser(responseJson.data);

              }else{
                console.log(responseJson.error_msg);
                
              }
    
            })
            .catch((error) => {
              console.error(error);
            });
         
      }

      const fetch_current_location =(value)=>{
     
        (async () => {
  
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
            
  
  
  
            let location = await Location.getCurrentPositionAsync({});
         
           
            
            
            fetch(API_URL + '/update_latlong.php',{
              method: 'POST', 
              headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                             
                  user_id:value,
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude ,
              }),
              })
              .then(response => response.json())
              .then((responseJson) => {
                    if(responseJson.error == 0){      
                        
                        // setTimeout(() => {                      
                            setIsLoading(false); 
                        // }, 4000);
                     console.log(responseJson.error_msg);
                     console.log(responseJson);

                     fetch_user(responseJson.user_id);
               
                        // setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'DrawerTab', }],
                            
                        });  
                    // }, 2000);
                   
                    }else{
                        alert("try after some time");
                    }
  
              })
              .catch((error) =>{
                console.error(error);
              })  
            
                  
              
        })();
  }

      
    
    return (
      
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' >        

        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity
                    style={{width:80, height:80, borderRadius:60,borderWidth:1,borderColor:"transparent", alignSelf:'center'}}
                    onPress={()=>{pickImage(); }}>
                    {image==""?
                        <Image 
                        style={{width:80, height:80, borderRadius:60,borderWidth:1,borderColor:"transparent", alignSelf:'center'}} 
                        source={defaultProfileImg} />

                    :
                    <Image 
                        style={{width:80, height:80, borderRadius:60,borderWidth:1,borderColor:"#9B9B9B", alignSelf:'center'}} 
                        source={{ uri: image }} />

                    }

                </TouchableOpacity>
  
                <TextInput
                    style={{marginTop:20, height: 20, width:Dimensions.get("screen").width/1.20, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:15, fontSize:14 }}
                    placeholder='Firstname'
                    value={firstname}
                    onChangeText={(value)=>{setFirstname(value)}}
                    returnKeyType="next"
                    ref={ref_input1}
                    onSubmitEditing={() => {
                        ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
    
    
                />
                <TextInput
                    style={{ height: 20, borderBottomColor: '#C0C0C0', width:Dimensions.get("screen").width/1.20,  borderBottomWidth:0.5, marginTop:30, fontSize:14 }}
                    placeholder='Lastname'
                    value={lastname}
                    onChangeText={(value)=>{setLastname(value)}}
                    returnKeyType="next"
                    ref={ref_input2}
                    onSubmitEditing={() => {
                        ref.current.focus();
                    }}
                 
    
                />
                <TextInput
                    style={{ height: 20, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30, fontSize:14 }}
                    placeholder='Username'
                    value={username}
                    editable={false}
                    onChangeText={(value)=>{setUsername(value)}}
                    returnKeyType="next"
                    ref={ref_input3}
                    blurOnSubmit={false}
    
                />
                <View 
                    style={{ height: 40, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:10, flexDirection:'row' }} >
              

                    <DatePicker
                            style={{ height: 40, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, borderTopWidth:0 }}
                            date={date} 
                            //showIcon={false}
                            mode="date" 
                            placeholder="Birthday"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            format="YYYY-MM-DD"
                            minDate="1920-01-01"
                            maxDate="3000-01-01"
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                            
                    />
                    <Text style={{marginTop:20, marginLeft:10, color:'#C0C0C0'}}>Birthday</Text>

                </View>

                <View style={{ height: 20, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30 }} >
                   
                    <RNPickerSelect
                        placeholder={{ label: "Gender" }}
                        style={{width:Dimensions.get("screen").width/1.20}}
                        onValueChange={(value) => setGender(value)}
                        items={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                    />

                </View>

                {/* <View 
                   
                    style={{flexDirection:'row', justifyContent:'space-around', marginLeft:20, marginRight:20}}>
                    <TextInput 
                        style={{ height: 20,width:Dimensions.get('screen').width-80, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30, fontSize:14 }}
                        placeholder="Location"
                        value={location}
                        onChangeText={(value)=>{setLocation(value)}}
                        returnKeyType="next"
                        ref={ref_input4}
                        onSubmitEditing={() => {
                            ref_input5.current.focus();
                        }}
                        blurOnSubmit={false}
    
        
                    />
                    <Ionicons
              

                     name="ios-location" size={20} style={{marginTop:20, marginRight:20}} color="black" /> 
            
                </View> */}

                <Text style={{fontSize:16, marginTop:10, marginBottom:10, fontWeight:'bold'}}>Location</Text>
                <View style={{borderWidth:1, borderColor:'#C0C0C0', borderRadius:2 }}>
                
                <GooglePlacesAutocomplete
                        ref={ref}
                   
                        placeholder='Location'
                        onPress={(data, details) => {
                            // 'details' is provided when fetchDetails = true
                            setLocation(details.terms[0]['value'])
                            console.log( details.terms[0]['value']);
                        }}
                        query={{
                            key: 'AIzaSyB4QdZFNywIg4_KwOO_ZpuCHrJHg_D9a34',
                            language: 'en',
                        }}
                        
                    />  
                    
                    
              
                </View>



                <View>
                    <Text style={{fontSize:16, marginTop:20, marginBottom:20, fontWeight:'bold'}}>About Me</Text>
                    <View style={{borderWidth:0.5, height:120, borderColor:'#C0C0C0', borderRadius:2}}>
                        <TextInput
                            multiline={true} 
                            style={{ height: 100, width:280,textAlignVertical:"top", margin:10}}
                            value={aboutme}
                            onChangeText={(value)=>{setAboutme(value)}}
                            ref={ref_input5}
                            returnKeyType="next"
 
        
                        />
 
                    </View>
                
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30,paddingBottom:10, borderBottomColor:'#C0C0C0',borderBottomWidth:0.5,}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                        <Entypo name="lock" size={24} color="#F5866B" />
                        <Text style={{color:"#F5866B"}}>Private</Text>
                    </View>       

                    <Switch
                        trackColor={{ false: '#767577', true: '#FEE0DA' }}
                        thumbColor={isEnabled ? '#F5866B' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                
                <TouchableOpacity style={{ alignItems:'center', justifyContent:'center',  paddingVertical:8, borderRadius:10, marginTop:20, marginBottom:50, backgroundColor:'#B2C248'}} onPress={()=>createprofile_button()}>
                    {isLoading?
                    <Text style={{textAlignVertical:'center'}}><ActivityIndicator color="#fff" size="small"  /></Text>
                :<Text style={{color:'#fff', fontSize:16, fontFamily:'font2'}}>Save</Text>}
                    
                </TouchableOpacity>
                
            </View>
          <Toast
                visible={msgShown}
                position={100}
                shadow={false}
                animation={true}
                hideOnPress={true}
            >{msg}</Toast>
           
            
        </View>
   
        </ScrollView>
        </KeyboardAvoidingView>

    );
}

//export default Createprofile;
// const mapDispatchToProps = (dispatch) => ({ 
//     updateUserDetail: (value) => dispatch(change_user_detail_value(value)),
// });
  
  
//     Createprofile.propTypes = {
//         updateUserDetail: PropTypes.func.isRequired,
   
//     }
  
//   const mapStateToProps = (state) => {
//    const { username, profile_pic, user_id} = state.userReducer;
    
//     return {
//         username, profile_pic,user_id
//     }
//   }


const mapDispatchToProps = (dispatch) => ({ 
    updateUser: (value) => dispatch(change_user_detail(value)),
});
  
  
Createprofile.propTypes = {
        updateUser: PropTypes.func.isRequired,
   
    }
  
  
  export default connect(null,mapDispatchToProps)(Createprofile) ; 





const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        //height:Dimensions.get('screen').height,
    },
    container1:{
        margin:20,
        marginTop:20,
    },
    spinnerTextStyle: {
        color: '#FFF',
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
 
})