import React, {useState, useRef} from 'react';
import { View,Text,ImageBackground, Dimensions, Image, StyleSheet, Button, TextInput, KeyboardAvoidingView,SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Button1 from '../customComponent/button1';

const Congratulation = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                
                <Text style={styles.welcome}>Congratulations</Text>
                <Text style={styles.text}>Your Password has been changed successfully !</Text>
                
                <Image style={{width:250, height:250, alignSelf:'center', margin:50}} source={require('../../assets/icon/image.png')} ></Image>


                <TouchableOpacity style={{ alignItems:'center', justifyContent:'center',  paddingVertical:10, borderRadius:10, marginTop:20, marginBottom:50, backgroundColor:'#B2C248'}} onPress={()=> navigation.navigate('Signin')}>
                    {isLoading?
                    <Text style={{textAlignVertical:'center'}}><ActivityIndicator color="#fff" size="small"  /></Text>
                :<Text style={{color:'#fff', fontSize:16, fontFamily:'font2'}}>Continue to Sign In</Text>}
                    
                </TouchableOpacity>

                {/* <Button1 
                    title={
                        isLoading ? (<ActivityIndicator color="#fff" size="small"  />) : "Continue to Sign In"
                    }                
                    onPress={() => navigation.navigate('Signin')}
                    style1={{backgroundColor:'#B2C248',marginTop:20}}> 
                </Button1> */}
                
            </View>
            
        </View>

    );
}

export default Congratulation;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
    },
    container1:{
        margin:40,
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
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:25,
        color:'#B2C248'
    },
    text:{
        marginTop:20,
        fontSize:18,
        alignSelf:'center',
        textAlign:'center',
    }, 
 
})