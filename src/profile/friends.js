import React, {useRef, useEffect} from 'react';
import { View,Text,FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome,FontAwesome5 ,MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';
import Menu ,{MenuItem} from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, IMG_URL } from '../url/url';
import { connect } from 'react-redux';

  
    const Item = ({ title ,imgUrl, onPress }) => {

        const menu = useRef();

        const hideMenu = () => menu.current.hide();      
        const showMenu = () => menu.current.show();
   
        return (
            <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
            <ScrollView>    
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <View onPress={onPress} style={styles.item}>
                    <Image
                        source={{uri:imgUrl}} 
                        style={{height:30,width:30,borderRadius:20,resizeMode:'cover'}}/>

                        <Text style={{paddingLeft:20}}> {title} </Text>                    
                </View>
                
                <View>
                    
                    <Menu ref={menu} style={{backgroundColor:'black', borderRadius:10,marginTop:10, width:120, height:40, alignSelf:'center'}}
                        button={<Text onPress={showMenu} > <Entypo name="dots-three-horizontal" size={16} color="black"  /> </Text>}>
                        <MenuItem style={{ flexDirection:'row',justifyContent:'center'}}> 
                            <MaterialIcons name="delete-sweep" size={24} color="white" style={{marginTop:10}} /> 
                            <Text style={{color:'#fff', paddingTop:-10}}>Remove</Text>
                        </MenuItem> 

                    </Menu> 
                
                </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
    

      
const Friends = ({navigation,route, user_id}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
    
            title:'Friends',
              headerLeft: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                        onPress={() => navigation.toggleDrawer()}
                        >
                        <Entypo name="menu" size={28} color="#fff"     style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
              ),  
              headerTintColor: '#fff',
              headerTitleAlign:'center',
              headerStyle: {
                backgroundColor: '#B2C248'
              },
    
        });
    }, [navigation]);
    const [value, onChangeText] = React.useState('');
    const [usertitle, setUserTitle] = React.useState([]);
    const [search, onSearchText] = React.useState('');

    const renderItem = ({ item }) => (
        <Item title={item.username} about={item.about_me} user={item.user_id} imgUrl={IMG_URL+item.profile_pic} onPress={() => navigation.navigate('Username',{datauser:item}) } />
       
    );

    useEffect(() => {

        let formData = new FormData();
        
            formData.append('user_id',user_id);
            //formData.append('friend_id',user_id);
            
            fetch(API_URL+ '/all_requests.php',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formData
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        
                        if (responseJson.error = '1') {  
                            setUserTitle(responseJson);
                            
                        }else{       
                            //setUserTitle(responseJson);
                            alert(responseJson.error_msg); 
                            
                        } 
                            
                    })
                    .catch((error) => {
                    console.error(error);
                    });        
    }, []);

        const search_user =()=>{
            let formData = new FormData();
        
            formData.append('user_id',user_id);
            formData.append('username',search);
            
            fetch(API_URL+ '/all_requests.php',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formData
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        
                        if (responseJson.error == 1) {  
                            setUserTitle(responseJson);
                        }else{       
                            setUserTitle(responseJson);
                           // alert(responseJson.error_msg); 
                            
                        } 
                            
                    })
                    .catch((error) => {
                    console.error(error);
                    });
        }
    return (
        <View style={styles.container}>
       
            <View style={styles.container1}>
                <TouchableOpacity style={{height:50, borderRadius:30, borderWidth:1,borderColor:'#D7D7D7', flexDirection:'row', justifyContent:'flex-start'}}>
                    <AntDesign name="search1" size={20} color="black" style={{padding:12,color:'#C2C2C2'}} />
      
                    <TextInput
                        onKeyPress={search_user}
                        style={{ height: 40, width:350, }}
                        onChangeText={text => onSearchText(text)}
                        value={search}
                        placeholder="search friends"
                    />
      
                </TouchableOpacity>

                <View style={{flexDirection:'row', paddingTop:10, paddingLeft:5, paddingRight:5}}>
                    
                    <TouchableOpacity style={{...styles.location , }}>
                        <FontAwesome name="user" size={18} color="#fff" style={styles.icon} />
                        <Text style={{ fontSize:14, color:'#fff'}}>My Friends</Text>                        
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Friendrequest')}
                        style={styles.user}>
                            <FontAwesome5 name="user-friends" size={18} color="#CFCFCF" />
                            <Text style={{ fontSize:14, color:"#CFCFCF"}}>Friend Requests</Text>                        
                    </TouchableOpacity>
                </View>

                {/* <Text style={{margin:20,marginTop:30, fontWeight:'bold'}}>100 Friends</Text> */}
            
            </View>

            <View style={styles.flatlist}>

                <FlatList  
                        numColumns={1}
                        showsHorizontalScrollIndicator={false} 
                        //data={DATA}
                        data={usertitle}
                        renderItem={renderItem} 
                        style={{marginTop:10}}  
                        keyExtractor={(item,index) => index.toString()}            
                />

            </View>

            {/* <TouchableOpacity
                    style={styles.load}>
                <Text style={{padding:7, color:'#B2C248'}}>load more...</Text>
            </TouchableOpacity> */}
 
        </View>
        
    );
}

//export default Friends;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic,user_id} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic,user_id
    }
}

export default connect(mapStateToProps)(Friends);



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
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
      //  width:350,
        height:50,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    flatlist:{
        borderTopWidth:1,
        borderColor:'#D7D7D7',
        marginBottom:100,
    
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
        
    },
    location:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        borderWidth:1, 
        borderColor:'#D7D7D7', 
        width:'50%', 
        height:30,
        backgroundColor:'#F5866B'
    },
    user:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        borderWidth:1, 
        borderColor:'#D7D7D7', 
        width:'50%', 
        height:30
    },

 
})