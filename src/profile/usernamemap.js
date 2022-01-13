import React, {useRef} from 'react';
import { View,Text,ImageBackground, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Alert, Dialog, Portal } from 'react-native';
import Button1 from '../customComponent/button1';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome, MaterialIcons , MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import {Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const Usernamemap = ({navigation}) => {

    const menu = useRef();
    const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();

    return (

        <View style={styles.container}>
       
            <View style={styles.container1}>
                <View style={{flexDirection:'row', justifyContent:'space-between', }}>

                    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                        <Image style={{width:80, height:80, borderRadius:60, }}
                            source={require('../../assets/icon/man.png')} 
                        />
                        <Text style={{padding:20, fontSize:20}}>User name</Text>
                    </View>

                    <View>
                        <Menu ref={menu} style={{backgroundColor:'black', borderRadius:10,marginTop:10, width:130, height:80}}
                            button={<Text onPress={showMenu} > <Entypo name="dots-three-horizontal" size={16} color="black"  /> </Text>}>
                            
                            <MenuItem 
                                onPress={() => navigation.navigate('Aboutme')} 
                                style={{ flexDirection:'row', paddingTop:10, borderBottomWidth:0.4, borderBottomColor:'#fff', height:40}}> 
                                    <FontAwesome5 name="user-check" size={14} color="white" />
                                    <Text style={{color:'#fff', paddingTop:-10}}>About me</Text>
                            </MenuItem> 

                            <MenuItem style={{ flexDirection:'row', justifyContent:'space-evenly', height:40}}> 
                                <MaterialIcons name="delete-sweep" size={24} color="white" style={{marginTop:5}} /> 
                                <Text style={{color:'#fff'}}>Remove</Text>
                            </MenuItem> 
                        </Menu> 
                    </View>

                </View>

            </View>

            <View style={{flex:2}}>
                <Image 
                    style={{ width:Dimensions.get('window').width, height:Dimensions.get('window').height, resizeMode:'cover',}} 
                    source={require('../../assets/icon/map.png')}    
                />

            </View>
            

        </View>

    );
}

export default Usernamemap;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    container1:{
        margin:30,
    },
    user:{
        height:150,
        width:450,
        padding:40,
        backgroundColor:'#B2C248',
        flexDirection:'row',
        justifyContent:'flex-start',
        
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