import React, {useState, useRef} from 'react';
import { View,Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import Button1 from '../customComponent/button1';
import { AntDesign } from '@expo/vector-icons';
import { API_URL } from '../url/url';


const Newpassword = ({navigation, route}) => {
    const [newpass, setPass] = React.useState('');
    const [confirmpass, setConfirmpass] = React.useState('');

    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    
    const [isLoading, setIsLoading] = useState(false);

    const data = route.params;

    const reset_button =()=>{
        setIsLoading(true);
    

        let formData = new FormData();
        
        formData.append('new_pass',newpass);
        formData.append('con_pass',confirmpass);
        formData.append('user_id',data.userid);
        //formData.append('user_id','1');
        formData.append('updte',1);
        
        console.log(formData);
      

        fetch(API_URL+ '/reset_pass.php',{
            
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
    
                    alert(responseJson.error_msg);
                    navigation.navigate('Congratulation',{userid:responseJson.user_id})
                   
      
                }else{       
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
            <View style={styles.container1}>
                
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{marginBottom:20}} name="arrowleft" size={30} color="black" />
                </TouchableOpacity>

                <Text style={styles.welcome}>Create New Password</Text>
  
                <TextInput
                    style={{ height: 40, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:30 }}
                    placeholder='*************'
                    onChangeText={value => setPass(value)}
                    value={newpass}
                    secureTextEntry
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
    
                />
                <TextInput
                secureTextEntry
                    style={{ height: 40, borderBottomColor: '#C0C0C0',  borderBottomWidth:0.5, marginTop:20 }}
                    placeholder='*************'
                    onChangeText={value => setConfirmpass(value)}
                    value={confirmpass}
                    ref={ref_input2}
                    returnKeyType="next"
                    
                />

                <TouchableOpacity style={{ alignItems:'center', justifyContent:'center',  paddingVertical:12, borderRadius:20, marginTop:30, marginBottom:50, backgroundColor:'#B2C248'}} onPress={()=>reset_button()}>
                    {isLoading?
                    <Text style={{textAlignVertical:'center'}}><ActivityIndicator color="#fff" size="small"  /></Text>
                :<Text style={{color:'#fff', fontSize:16, fontFamily:'font2'}}>Reset</Text>}
                    
                </TouchableOpacity>

                {/* <Button1
                    title={
                        isLoading ? (<ActivityIndicator color="#fff" size="small"  />) : "Reset"
                    }            
                    onPress={() => reset_button()}
                    //onPress={() => navigation.navigate('Congrulation')}
                    style1={{backgroundColor:'#B2C248',marginTop:50}}>
                </Button1> */}
                
            </View>
            
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Newpassword;


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
        fontFamily:'font2',
        fontSize:25,
        color:'#B2C248'
    },
    text:{
        marginTop:20,
        fontSize:20
    }, 
 
})