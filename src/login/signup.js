import  React, {useState, useRef} from 'react';
import {API_URL} from '../url/url';
import { View,Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, KeyboardAwareScrollView,KeyboardAvoidingView, TextInput,ActivityIndicator } from 'react-native';
import Input from '../customComponent/input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons,Fontisto } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import {  Overlay } from 'react-native-elements';

//import Spinner from 'react-native-loading-spinner-overlay';

// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import {change_user_id} from "../../store/actions/user_action";




const Signup = ({navigation, updateUserid}) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");       
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    

    const [isLoading, setIsLoading] = useState(false);


    const signup_button =()=>{
        setIsLoading(true);
        if(name!="" && password!="" && email!=""){

        
        
    
        // alert(name+email+password)
  
        let formData = new FormData();
        
        formData.append('username',name);
        formData.append("password",password);
        formData.append('email',email);
        formData.append('updte','1');
        
        console.log(formData);
      

        fetch(API_URL+ '/register.php',{
            
          method: 'POST', // or 'PUT'
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          
          })
            .then(response => response.json())
            .then((responseJson) => {
            console.log(responseJson);
              if (responseJson.error == 1) {  
                    setIsLoading(false);
                   //updateUserid(responseJson);
                    //navigation.navigate('Createprofile')
                    navigation.navigate('Createprofile', {userid:responseJson.user_id, username:responseJson.username, msg:responseJson.error_msg})
                    //alert(responseJson.error_msg);
                    //const async_id_value = AsyncStorage.setItem('userid', JSON.stringify(responseJson.user_id)); 
                             
                    
      
                }else{       
                       
                    setToastMsg(responseJson.error_msg);
                    // setTimeout(() => {                      
                        setIsLoading(false); 
                        setShowToast(true);
                    // }, 3000);
                    
                    setTimeout(() => {
                        setShowToast(false);                      
                    }, 4000);       
                }
                            
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
        });

    }else{
        setToastMsg("All field are required!");
        // setTimeout(() => {                      
            setIsLoading(false); 
            setShowToast(true);
        // }, 3000);
        
        setTimeout(() => {
            setShowToast(false);                      
        }, 4000);
    }
    } 

    const _validateEmail = (text) => {

        console.log("hello  "+text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log("asdfasfd"+reg.test(text));
        if (reg.test(text) === false) {
         
            if(Platform.OS == 'ios'){
                setToastMsg("Please enter valid Email")
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
            }
            
          setEmail("");
          
        }
        else {
          setEmail(text)
          console.log("Email is Correct");
          ref_input3.current.focus();
        }
      }
    
    return (
        <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

            <View style={styles.keyview}>
                <Text style={styles.heading1}>WYDGYD</Text>
            </View>

            <Text style={styles.welcome}>Welcome !</Text>
            <Text style={styles.text}>Get Ready for a unique experience with your "WYDGYD"</Text>


            <View style={styles.view1}>
                <View style={{borderWidth:1, height:25, width:25, borderRadius:30, borderColor:'transparent', backgroundColor:'lightgrey',  justifyContent:'center', alignItems:'center' }}>
                    <Text ><FontAwesome name="user" size={16} color="#9B9B9B" /></Text>
                </View>
               
                <TextInput
                    style={{paddingLeft:10, width:Dimensions.get('screen').width}}
                    placeholder="Username"
                    onChangeText={(value)=>{setName(value)}}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
    
                />
            </View> 

            <View style={styles.view2}>
               <View style={{borderWidth:1, height:25, width:25, borderRadius:30, borderColor:'transparent', backgroundColor:'lightgrey',  justifyContent:'center', alignItems:'center' }}>
                    <Text ><MaterialIcons name="email" size={16} color="#9B9B9B" /></Text>
                </View>
                
                <TextInput
                    style={{paddingLeft:8, width:Dimensions.get('screen').width}}
                    placeholder="Email"
                    value={email}
                    onChangeText={(value)=>{setEmail(value)}}
                    ref={ref_input2}
                    returnKeyType="next"
                    onSubmitEditing={(event) =>_validateEmail(event.nativeEvent.text)}                  
                    blurOnSubmit={false}
    
                />
            </View> 

            <View style={styles.view1}>
                <View style={{borderWidth:1, height:25, width:25, borderRadius:30, borderColor:'transparent', backgroundColor:'lightgrey',  justifyContent:'center', alignItems:'center' }}>
                    <Text ><Fontisto name="locked" size={15} color="#9B9B9B" /></Text>
                </View> 
                <TextInput
                    style={{paddingLeft:10, width:Dimensions.get('screen').width}}
                    placeholder="Password"
                    onChangeText={(value)=>{setPassword(value)}}
                    returnKeyType="next"
                    ref={ref_input3}
                    secureTextEntry={true}
                    //value={password}
        
                />
            </View> 


            {/* <Input 
                icon='user' icontype="FontAwesome" color="#9B9B9B" 
                styles={{fontSize:20, padding:10, height:44,borderbottomWidth:1, width:250, }} 
                placeholder='Name'
                value={name}
                autoFocus={true}
                returnKeyType="next"
                //ref={ref_input1}           
                onChangeText={(value)=>{setName(value)}}
    
                onSubmitEditing={() => {
                    ref_input2.current.focus();
                }}
                //blurOnSubmit={false}
                  
                
                
            />
            <Input 
                icon='email' icontype="MaterialIcons" color="#9B9B9B" 
                styles={{fontSize:20, padding:10, height:44,borderbottomWidth:1, width:250, }} 
                placeholder='Email'
                value={email}
                returnKeyType="next"
                ref={ref_input2}  
                //autoFocus={true}
                onChangeText={(value)=>{setEmail(value)}}
    
            />
            <Input 
                icon='locked' icontype="Fontisto" color="#9B9B9B" 
                styles={{fontSize:20, padding:10, height:44,borderbottomWidth:1, width:250, }} 
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                returnKeyType="next"
                onChangeText={(value)=>{setPassword(value)}}
                
            /> */}
                     
            <TouchableOpacity 
                
                onPress={() => signup_button()} 

                style={styles.signinbtn}>
                { isLoading ? (<ActivityIndicator color="#fff" size="small"  />) : 

                <Text style={styles.btntext}>Sign Up</Text> }
            </TouchableOpacity>    
            
            <View style={styles.flex2}>
                <Text>Already a user ?</Text>
                <Text onPress={() => navigation.navigate('Signin')} 
                    style={{color:'red'}}> LOGIN NOW
                </Text>
            </View>
            <Toast
                visible={showToast}
                position={100}
                shadow={false}
                animation={true}
                hideOnPress={true}
            >{toastMsg}</Toast>
            
        </View>
        <Overlay isVisible={isLoading} 
                overlayBackgroundColor="transparent" 
                overlayStyle={{opacity: 0, shadowOpacity: 0}}           
            
            >              
            </Overlay>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Signup;
// const mapDispatchToProps = (dispatch) => ({ 
//     updateUserid: (value) => dispatch(change_user_id(value)),
// });
  
  
//     Signup.propTypes = {
//         updateUserid: PropTypes.func.isRequired,
   
//     }
  
//   const mapStateToProps = (state) => {
//    const { username, profile_pic, user_id} = state.userReducer;
    
//     return {
//         username, profile_pic, user_id
//     }
//   }

//   export default connect(mapStateToProps,mapDispatchToProps)(Signup) ; 



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height+80,
    },
    keyview:{
        margin:50,
        marginBottom:30,
        alignSelf:'center',
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
    ScrollView:{
       // marginHorizontal: 20,
    },
    welcome:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:25,
        //marginTop:0,
    },
    text:{
        textAlign:'center',
        margin:20,
        marginLeft:30,
        marginRight:30,

    }, 
    img:{
        width:30,
        height:30,
        margin:80,
        backgroundColor:'#DCDCDC',
        resizeMode:'cover',
        borderRadius:30
    },
    signinbtn:{
        backgroundColor:'#B2C248',
        width:150,
        height:50,
        alignSelf:'center',
        borderRadius:30,
        margin:30,
        alignItems:"center",
        justifyContent:"center",

    },
    btntext:{
        fontSize:20,
        color:'#fff',
        alignSelf:'center',
        padding:10
    },
    flex2:{
        flexDirection:'row',
        justifyContent:'center',
    },
    view1:{
        flexDirection:'row', 
        justifyContent:'flex-start',
        marginLeft:50,
        marginRight:50,
        margin:6,
        fontSize:20, 
        padding:10, 
        height:44,
        //width:300,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)'
    },
    view2:{
        flexDirection:'row', 
        justifyContent:'flex-start',
        marginLeft:47,
        marginRight:50,
        margin:6,
        fontSize:20, 
        padding:10, 
        height:44,
        //width:300,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)'
    }

})