import React, {useState, useRef, useEffect} from 'react';
import { View,Text,ImageBackground, Dimensions, Image, StyleSheet, Button, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URL } from '../url/url';
import OverlayLoading from '../customComponent/OverlayLoading';
import Toast from 'react-native-root-toast';


const Verificationcode = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [msgShown, setShowToast] = useState(true);
    const [toastMsg, setToastMsg] = useState("");
    const [msg, setMsg] = useState(route.params.msg ? route.params.msg : null);

    

    const [value1, setvalue1] = React.useState('');
    const [value2, setvalue2] = React.useState('');
    const [value3, setvalue3] = React.useState('');
    const [value4, setvalue4] = React.useState('');
 
    const [otp, setOtp] = React.useState('');
 
    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    const ref_input4 = useRef(null);
 
    
    useEffect(() => {
        if(value1==''){
            ref_input1.current.focus();
        }
        
        if (msg != null && msgShown) {           
            setTimeout(() => {
                setShowToast(false);
        }, 4000);       
    
}
    }, [])

    const data = route.params;
    // console.log(data);
    const verify_button =()=>{
        setOtp(value1+value2+value3+value4);        

        setIsLoading(true);
    
        let formData = new FormData();
        
        formData.append('otp',(value1+value2+value3+value4));
        formData.append('user_id', data.userid);
        //formData.append('user_id','32');
        
        console.log(formData);
        // alert(data.userid);

        fetch(API_URL+ '/verify_otp.php',{
            
            method: 'POST', // or 'PUT'
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          
        })
        
            .then(response => response.json())
            .then((responseJson) => {
                console.log(" afaf ");
            console.log(responseJson);
              if (responseJson.error == 1) {  
                    setIsLoading(false);
                    alert(responseJson.error_msg);
                    navigation.navigate('Newpassword', {"userid":data.userid});
                   
      
                }else{       
                      
                //   setTimeout(() => {
                    alert(responseJson.error_msg); 
                    setIsLoading(false); 
                //   }, 3000);   
                    
                }
                            
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
          });
      }

      const resend_button =()=>{
        setVisible(true);

        let formData = new FormData();
        
        formData.append('email',route.params.email);
        //formData.append('updte','1');
        
        console.log(formData);
      

        fetch(API_URL+ '/ResendOtp.php',{
            
            method: 'POST', // or 'PUT'
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          
        })
        
            .then(response => response.json())
            .then((responseJson) => {
            console.log("asdf");
            // alert(responseJson.error_msg);
              if (responseJson.error == "1") {
                  
                    setVisible(false);    
                    setMsg(responseJson.error_msg);
                    setShowToast(true);       
                        setTimeout(() => {
                            setShowToast(false);
                    }, 4000); 
                  
                
                
                
                }else{       
                    setVisible(false);
                    alert(responseJson.error_msg);
                    
                }
                            
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error);
             // ADD THIS THROW error
              throw error;
             
          });

      }

      


    return (
        <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{marginBottom:20}} name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                
                <Text style={[styles.welcome] }>Verification code</Text>
                <Text style={styles.text}>Please enter the 4 digit code sent to your email</Text>

                <View style={{flexDirection:'row', justifyContent:"space-evenly", marginHorizontal:20, marginVertical:30}}>
                    <TextInput
                                            
                        keyboardType={'numeric'}
                        maxLength={1}
                        autoFocus={true}
                        ref={ref_input1}
                        style={{
                            borderWidth:1.5,
                            height:45,
                            width:45,
                            textAlign:"center"
                        }}

                        onChangeText={(text) => {
                            setvalue1(text);
                            if (text != "") {
                                ref_input2.current.focus();
                            } else {
                                ref_input1.current.focus();
                            }
                        }}

                        
                       
                        value={value1}
                        
                    />

                    
                    <TextInput
                     
                        keyboardType={'numeric'}
                        maxLength={1}   
                        ref={ref_input2}      
                        autoFocus={false}                                        
                        style={{
                           
                            borderWidth:1.5,
                            height:45,
                            width:45,
                            textAlign:"center"
                        }}

                        onKeyPress={({ nativeEvent }) => {
                            if(nativeEvent.key === 'Backspace'){
                              //your code
                              // if you want to remove focus then you can use a ref     
                              if(value4==""){
                                ref_input1.current.focus();   
                              }                                
                                                       
                              
                            }
                          }}

                        onChangeText={(text) => {
                            setvalue2(text);
                            if (text != "") {
                                ref_input3.current.focus();
                            } else {
                                ref_input2.current.focus();
                            }
                        }}

                        
                   
                    
                        value={value2}
                    />    
                     <TextInput
                        numeric
                        keyboardType={'numeric'}
                        maxLength={1}          
                        ref={ref_input3}  
                        style={{
                            borderWidth:1.5,
                            height:45,
                            width:45,
                            textAlign:"center"
                        }}

                        onKeyPress={({ nativeEvent }) => {
                            if(nativeEvent.key === 'Backspace'){
                              //your code
                              // if you want to remove focus then you can use a ref     
                              if(value3==""){
                                ref_input2.current.focus();   
                              }                                
                              
                            }
                          }}
                        onChangeText={(text) => {
                            setvalue3(text);
                            if (text != "") {
                                ref_input4.current.focus();
                            } else {
                                ref_input3.current.focus();
                            }
                        }}

                        
                                    
                        value={value3}
                    />    
                    <TextInput
                        numeric
                        keyboardType={'numeric'}
                        maxLength={1}          
                        ref={ref_input4}  
                        returnKeyType="next"
                        style={{
                            borderWidth:1.5,
                            height:45,
                            width:45,
                            textAlign:"center"
                        }}
                        onKeyPress={({ nativeEvent }) => {
                            if(nativeEvent.key === 'Backspace'){
                              //your code
                              // if you want to remove focus then you can use a ref   
                              if(value4==""){
                                ref_input3.current.focus();   
                              }                               
                                                            
                              
                            }
                          }}

                        onChangeText={(text) => {
                            setvalue4(text);
                            if (text != "") {
                                ref_input4.current.focus();
                            } else {
                                ref_input3.current.focus();
                            }
                        }}

                        
                        value={value4}
                    />    

                </View>                
                
                {/* <NextTextInput 
                        noOfTextInput={4}
                        style={{
                            height: 50,
                            width:100, 
                            borderWidth:2,
                            color:'black',
                            backgroundColor:'black', 
                            //marginTop:50,
                            borderBottomWidth:1,
                            borderLeftWidth:1,
                            //padding:15,
                           // margin:-30
                        }}
                        onChangeValue={value => onChangeText(value)}
                        value={value}
                        //parentViewStyle={styles.textBoxes}
                    />  */}

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:0}}>
                    <TouchableOpacity onPress={()=>resend_button()}>
                    
                         <Text style={{fontSize:18}}>Resend Code ?</Text> 
                        
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => verify_button()} 
                        style={{width:40, height:40, borderRadius:50,alignItems:'center', justifyContent:'center', backgroundColor:'#F5866B',}}>
                        { isLoading ? (<ActivityIndicator color="#fff" size="small"  />) : 
                         <Text><AntDesign  name="arrowright" size={30} color="#fff" /></Text> }
                    </TouchableOpacity>
                        
                </View>

            </View>

           { msg && <Toast
                visible={msgShown}
                position={100}
                shadow={false}
                animation={true}
                hideOnPress={true}
            >{msg}</Toast>
           }

        
            
        </View>
        <OverlayLoading visible={visible} >Please wait...</OverlayLoading>

        
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

export default Verificationcode;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
    },
    container1:{
        marginHorizontal:20,
        paddingTop:20
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
        fontSize:17
    },
    
   
})