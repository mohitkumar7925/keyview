import React, {useEffect, useState} from 'react';
import { View,Text,FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Button, ActivityIndicator } from 'react-native';
import Button1 from '../customComponent/button1';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome, MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { API_URL, IMG_URL } from '../url/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
        
    // const Item = ({ title ,about,imgUrl, onPress }) => {
    //     return (
    //         <TouchableOpacity onPress={onPress} style={styles.item}>
    //             <Image
    //                 //source={{uri:imgUrl}} 
    //                 source={ imgUrl ==="" ? defaultProfileImg : { uri:imgUrl}} 
                    
    //                 style={{height:50,width:50,borderRadius:40,resizeMode:'cover'}}/>
    
    //             <View style={{padding:10}}>
    //                 <Text style={styles.title}>{title} </Text>
    //                 <Text>{about}</Text>
    //             </View>
                    
    //         </TouchableOpacity>
    //     );
    // }


const Usersearch = ({navigation, user_id}) => {
    const [usertitle, setUserTitle] = React.useState([]);
    const [search, onSearchText] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const defaultProfileImg = require('../../assets/profile_picture.png');
    
    console.log(defaultProfileImg);
    
    const Item = ({ title ,about,imgUrl, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.item}>
                <Image
                    //source={{uri:imgUrl}} 
                    source={ imgUrl ==="" ? defaultProfileImg : { uri:imgUrl}} 
                    
                    style={{height:50,width:50,borderRadius:40,resizeMode:'cover'}}/>
    
                <View style={{padding:10}}>
                    <Text style={styles.title}>{title} </Text>
                    <Text>{about}</Text>
                </View>
                    
            </TouchableOpacity>
        );
    }

        
    const renderItem = ({ item }) => (
        <Item title={item.username} about={item.about_me} imgUrl={IMG_URL+item.profile_pic} onPress={() => navigation.navigate('Username',{datauser:item}) } />
    
    );

    //useEffect(() => {
               
    //    let formData = new FormData();
           
    //         formData.append('username',search);
    //         formData.append('user_id',user_id);
            
    //         fetch(API_URL+ '/searchby_username.php',{
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //                 body:formData
    //             })
    //                 .then((response) => response.json())
    //                 .then((responseJson) => {
    //                     //console.log(responseJson);
                        
    //                     if(responseJson.length > 0){
    //                         setUserTitle(responseJson);
    //                         setTimeout(() => {
    //                             setIsLoading(false);
    //                             setErrorMsg("");
            
    //                         }, 2000);

    //                     }
    //                     else{
    //                         alert("dssds");
    //                         // setErrorMsg("No User Found");
    //                         // alert(responseJson.error);
    //                     }
    //                     //setUserTitle(responseJson);
                        
    //                     //navigation.navigate('username', {userid:responseJson.user_id});
    //                     //alert(user_id);
    //                     //console.log(user_id);

                            
    //                 })
    //                 .catch((error) => {
    //                 console.error(error);
    //                 });

    //}, [])

    
    const search_user =()=>{

        setIsLoading(true);

        let formData = new FormData();
       
            formData.append('username',search);
            formData.append('user_id',user_id);

            fetch(API_URL+ '/searchby_username.php',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formData
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        if(responseJson.length > 0){
                            //console.log(responseJson);
                            setUserTitle(responseJson);
                            // setTimeout(() => {
                                setIsLoading(false);
                                setErrorMsg("");

                            // }, 2000);
                           

                        }
                        else{
                            //alert("ds");
                            console.log("hello"+responseJson[0].errorMsg);
                            setErrorMsg("No User Found");
                            // setTimeout(() => {
                            //     setIsPost(false);
                            // }, 4000);
                
                            //alert(responseJson.error_msg);
                        }

                        //navigation.navigate('username', {userid:responseJson.user_id});
                        //alert(user_id);
                        //console.log(user_id);

                            
                    })
                    .catch((error) => {
                    console.error(error);
                    });        
           // }
        //})
    }

            
        
    return (

        <View style={styles.container}>
       
            <View style={styles.container1}>
                <TouchableOpacity style={{height:50, borderRadius:30, borderWidth:1,borderColor:'#D7D7D7', flexDirection:'row', justifyContent:'flex-start'}}>
                    <AntDesign name="search1" size={24} color="black" style={{padding:12,color:'#C2C2C2'}} />
      
                    <TextInput
                        onKeyPress={search_user}
                        style={{ height: 40, width:350 }}
                        onChangeText={value => onSearchText(value)}
                        value={search}
                    />
                
                </TouchableOpacity>

                <View style={{flexDirection:'row', paddingTop:10, paddingLeft:7}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}
                        style={styles.location}>
                        <Entypo name="location-pin" size={20} color="#CFCFCF" style={styles.icon} />
                        <Text style={{ fontSize:18, color:'#CFCFCF'}}>location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.user}>
                        <FontAwesome name="user" size={20} color="#fff" style={styles.icon} />
                        <Text style={{ fontSize:18, color:"#fff"}}>user</Text>
                    </TouchableOpacity>
                </View>

            </View>


            {usertitle!=[] && usertitle.length> 0 && !isLoading?
        
                <View style={styles.flatlist}>
                    <FlatList onPress={() => navigation.navigate('')} 
                            numColumns={1}
                            showsHorizontalScrollIndicator={false} 
                            data={usertitle}
                            renderItem={renderItem} 
                            style={{marginTop:10}}    
                            keyExtractor={(item,index) => index.toString()}            
                    />
                </View>

            :<View style={[styles.map, { alignItems:'center', paddingTop:'30%', backgroundColor:'#fff' }]}>
                {isLoading && <ActivityIndicator color='#B2C248' size='large' />}
                <Text style={{fontFamily:'font2', marginTop:20, fontSize:18, color:'#B2C248'}}>{errorMsg}</Text>

            </View>}

        </View>

    );
}

//export default Usersearch;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic,user_id} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic,user_id
    }
}

export default connect(mapStateToProps)(Usersearch);


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
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
        marginLeft:50,
        //marginBottom:2,
        //paddingBottom:20,
        width:350,
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
        
    }
 
})