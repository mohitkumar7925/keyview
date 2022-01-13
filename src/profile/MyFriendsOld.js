import React, {useState, useEffect, useRef} from 'react';
import { View,Text, Dimensions, Image, StyleSheet, Button, TouchableOpacity,ScrollView, TextInput, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, FlatList } from 'react-native';
import { FontAwesome, Fontisto, MaterialIcons, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { API_URL } from '../url/url';
import { connect } from 'react-redux';
import { IMG_URL } from '../url/url';
import Menu ,{MenuItem} from 'react-native-material-menu';


const Myfriends = ({navigation, service, user_id }) => {
    
    const [index, setIndex] = React.useState(0);
    const [usertitle, setUserTitle] = React.useState([]);
    const [search, onSearchText] = React.useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const defaultProfileImg = require('../../assets/profile_picture.png');


    React.useLayoutEffect(() => {
        navigation.setOptions({
    
            title:'Friends',
              headerLeft: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                        onPress={() => navigation.toggleDrawer()}
                        >
                        <Entypo name="menu" size={28} color="#fff"  style={{ marginHorizontal: 30 }} />
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

    const ItemData = ({ title ,imgUrl, onPress }) => {

        const menu = useRef();

        const hideMenu = () => menu.current.hide();      
        const showMenu = () => menu.current.show();
   
        return (
            <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
            <ScrollView>    
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <View onPress={onPress} style={styles.item2}>
                    <Image
                        source={{uri:imgUrl}} 
                        style={{height:60,width:60,borderRadius:50,resizeMode:'cover'}}/>

                        <Text style={{paddingLeft:20}}> {title} </Text>                    
                </View>
                
                <View style={{marginRight:20}}>
                    
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
    

    const Item = ({ title ,imgUrl, onPress , fun, friend}) => {
        return (
            <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
            <ScrollView>
                <TouchableOpacity onPress={onPress} style={styles.item}>
                    <Image
                        //source={{uri:imgUrl}}
                        source={ imgUrl ==="" ? defaultProfileImg : { uri:imgUrl}} 
                        style={{height:50,width:50,borderRadius:40,resizeMode:'cover'}}
                    />
                        <View style={{flexDirection:'column'}}>
                            <Text 
                                onPress={onPress}
                                style={{paddingLeft:20}}> {title} 
                            </Text>                    

                            <View style={{flexDirection:'row', justifyContent:'center', marginTop:10 }}>
                                <TouchableOpacity 
                                    onPress={() => take_action('Accepted',friend)} 
                                    style={{width:80, height:30, borderRadius:6, backgroundColor:'#F5866B', marginLeft:10}}>
                                    <Text style={{color:'#fff',alignSelf:'center'}}>Accept</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => take_action('Declined',friend)} 
                                    style={{width:80, height:30, borderRadius:6, backgroundColor:'#B2C248', marginLeft:5}}>
                                    <Text style={{color:'#fff',alignSelf:'center'}}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    useEffect(() => {
        if(index==0){
            fetch_friend();
           // alert(index);
        }
        
        if(index==1){
            fetch_friendrequest();
           // alert(index);

        }


    }, []);

    const fetch_friend =()=>{
        //alert("hello");
        
        let formData = new FormData();
        
        formData.append('user_id',user_id);
        formData.append('friend_id',user_id);
            
        fetch(API_URL+ '/all_requests.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body:formData
        })
    
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("friends");
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
    }


    const fetch_friendrequest =()=>{
                
        let formData = new FormData();
                
        formData.append('username',search);
        formData.append('user_id',user_id);
        //console.log(formData);
        //alert(user_id);
        fetch(API_URL+ '/pending_request.php',{
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
                alert(responseJson.error_msg); 
    
            }   
        })
            
        .catch((error) => {
            console.error(error);
        });

    }

    const search_friend =()=>{
        
        setIsLoading(true);    

        let formData = new FormData();
        
        if(index==0){
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



        if(index==1){
                
            formData.append('username',search);
            formData.append('user_id',user_id);
            //alert(user_id);

            fetch(API_URL+ '/pending_request.php',{
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
                    alert(responseJson.error_msg); 
                }   
            })
                
            .catch((error) => {
                console.error(error);
            });
        
        }
        
    }

    const take_action =(type,friendid)=>{
        //alert(friendid);    
        let formData = new FormData();
            
        //alert(usertitle.user_id);
        formData.append('user_id',user_id);
        formData.append("friend_id",friendid);
        formData.append('status',type);
            
        fetch(API_URL+ '/request.php',{
                
            method: 'POST', // or 'PUT'
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.error == "0"){
                alert(responseJson.error_msg);
            }   
            else{
                alert("else");
            }

        })
        
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    } 
    
    
    const FirstRoute = () => {
        const renderItemData = ({ item }) => (
            <ItemData title={item.username} about={item.about_me} imgUrl={IMG_URL+item.profile_pic} onPress={() => navigation.navigate('Username',{datauser:item}) } />           
        );    

        return (
            <View style={styles.container}>
                <View>
                    {usertitle!=[] && !isLoading?
                        <View style={styles.flatlist}>
                            <SafeAreaView>
                            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
    
                            <FlatList 
                                    onPress={() => navigation.navigate('')} 
                                    numColumns={1}
                                    showsHorizontalScrollIndicator={true}
                                    data={usertitle}
                                    renderItem={renderItemData} 
                                    style={{marginTop:10}}        
                                    keyExtractor={(item,index) => index.toString()}         
                            />
                            </KeyboardAvoidingView>
                            </SafeAreaView>
                        </View>
    
                    :<View style={[styles.map, { alignItems:'center', paddingTop:'30%', backgroundColor:'#fff' }]}>
                        {isLoading && <ActivityIndicator color='#B2C248' size='large' />}
                        <Text style={{fontFamily:'font2', marginTop:20, fontSize:18, color:'#B2C248'}}>{errorMsg}</Text>
                    </View>}
    
                </View>
            </View>
        );
    }


    const SecondRoute = () => {
            
        const renderItem = ({ item }) => (
            <Item title={item.username} about={item.about_me} imgUrl={IMG_URL+item.profile_pic} friend={item.user_id} onPress={() => navigation.navigate('Username1',{datauser:item}) } /> 
        );
        
        return (
    
            <View style={styles.container}>
           
               {usertitle!=[] && !isLoading?        
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
    

    const initialLayout = { width: Dimensions.get('screen').width};

    const renderScene = SceneMap({
       
        Myfriends: FirstRoute,
        Friendrequest: SecondRoute,
    });

    // const renderScene = ({ route}) =>{
    //     switch (route.key){
    //         case 'Myfriends':
    //             return
    //     }
    //     Myfriends: FirstRoute,
    //     Friendrequest: SecondRoute,
    // };



    const [routes] = React.useState([
        { key: 'Myfriends', title: 'My friends', service:'1' },
        { key: 'Friendrequest', title: 'Friend request', service:'2'},
    ]);


    
    const renderTabBar = props => (

        <TabBar
        {...props}
        //  activeColor={'#F5866B'}
        //  inactiveColor={'#fff'}
          style={{ backgroundColor: '#F5866B' , color:'#fff'}}
          indicatorStyle={{ backgroundColor: '#fff' }}
       
        />
    );

    return (
        <View style={{flex:1, justifyContent:'Center', alignItems:'center'}}>
          
          <View style={{ margin:10, marginLeft:20, marginRight:20}}>
            <TouchableOpacity style={{height:50, margin:0,borderRadius:30, borderWidth:1,borderColor:'#D7D7D7', flexDirection:'row', justifyContent:'flex-start'}}>
                <AntDesign name="search1" size={24} color="black" style={{padding:12,color:'#C2C2C2'}} />
        
                <TextInput
                    onKeyPress={search_friend}
                    style={{ height: 40, width:350 }}
                    onChangeText={text => onSearchText(text)}
                    value={search}
                />
        
            </TouchableOpacity>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
                style={{ margin:5}}
                //lazy={({route}) =>route.name === 'Friendrequest' }
                lazy 
            />

         </View>

      
    );
}  
//export default Searchtab;
const mapStateToProps = (state) => {
    const { dob,gender,username,name,location,about_me,profile_pic,user_id, first_name, last_name} = state.userReducer;
     
    return {
        username,name,gender,dob,location,about_me,profile_pic,user_id, first_name, last_name
    }
}

export default connect(mapStateToProps)(Myfriends);


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,

    },
    container1:{
        margin:15,
        // marginRight:10,
        // marginLeft:10,
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
    icon:{
        paddingLeft:10, 
        paddingTop:3 
    },
    // item:{
    //     marginLeft:20,
    //     marginRight:20,
    //     marginBottom:2,
    //     //paddingBottom:20,
    //     width:Dimensions.get('screen').width-40,
    //     height:80,
    //     borderRadius:20,
    //     borderWidth:1,
    //     borderColor:'#D7D7D7',
    //     //flex:1, 
    //     flexDirection:'row',
    //     justifyContent:'flex-start',
    // },

    item:{
        margin:10,
      //  width:350,
        height:50,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    item2:{
        margin:10,
        width:'70%',
        height:50,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'flex-start',
    },

    // flatlist:{
    //     borderTopWidth:1,
    //     borderColor:'#D7D7D7',
    //     marginBottom:100,
    //     height:Dimensions.get('screen').height,
    // },

    item1:{
        margin:10,
        marginLeft:50,
        //marginBottom:2,
        //paddingBottom:20,
        width:350,
        height:50,
        borderRadius:20,
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
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