import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, Image, SafeAreaView, Text } from 'react-native';
import { Fontisto, FontAwesome, AntDesign, MaterialIcons,FontAwesome5, Entypo } from '@expo/vector-icons';

import CustomDrawerContent from './src/customComponent/customDrawer';
import Maplocation from './src/profile/maplocation';
import Signin from './src/login/signin';
import Signup from './src/login/signup';
import Forgotpassword from './src/login/forgotpassword';
import Input1 from './src/customComponent/input';
import Verificationcode from './src/login/verificationcode';
import Newpassword from './src/login/newpassword';
import Congratulation from './src/login/congratulation';
import Createprofile from './src/login/createprofile';
import Userprofile from './src/profile/userprofile';
import Userpost from './src/profile/userpost';
import Createpost from './src/profile/createpost';
import Search from './src/profile/search';
import Usersearch from './src/profile/usersearch';
import Aboutme from './src/profile/aboutme';
import Friends from './src/profile/friends';
import Friendrequest from './src/profile/friendrequest';
import Username from './src/profile/username';
import Username1 from './src/profile/username1';
import Usernamemap from './src/profile/usernamemap';
import Editprofile from './src/profile/editprofile';
import Editpost from './src/profile/editpost';
import MannualLocation from './src/profile/MannualLocation';

import friend_username from './src/profile/friend_username';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
//import { API_URL, IMG_URL } from './src/url/url';
import { API_URL, IMG_URL } from './src/url/url';
import Searchtab from './src/profile/searchtab';
import myfriends from './src/profile/myfriends';
import ActiveFeed from './src/profile/ActiveFeed';
import user_aboutme from './src/profile/user_aboutme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const userId = AsyncStorage.getItem('userid').then((value)=>{
//   //alert(value);
//   console.log(value);
//   const username = AsyncStorage.getItem('username').then((value1)=>{
//       console.log(value1);
//       //alert(value1);
//      // setUsername(JSON.parse(value1));
//   })
//   if(JSON.parse(value) != "" && JSON.parse(value) > 0 && JSON.parse(value) != null ){
//       console.log(value);
//       //alert(value);
//   }
// });

const DrawerTab=()=> {





  return (
    
      <Drawer.Navigator
        initialRouteName='BottomTab'
        
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen 
          name="BottomTab" 
          component={BottomTab} 
         
        /> 
        
        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
         
        /> 
        
        <Drawer.Screen 
          name="Editprofile" 
          component={Editprofile} 
          options={{ headerShown: true,  }}
         
        
        />
        
        <Drawer.Screen 
          name="Changepassword" 
          component={Newpassword} 
         
        />


      

        <Drawer.Screen 
          name="Myfriends" 
          component={Myfriends} 
        
        
          
      
        /> 

        <Drawer.Screen 
          name="Userpost" 
          component={Userpost} 
          options={{ headerShown: true}}
         
        />
        

      </Drawer.Navigator>
   
  );
}

  

// const NavigationDrawerStructure = (props) => {
//   const toggleDrawer = () => {
//     props.navigationProps.toggleDrawer();
//   };

//   return (
//     <View style={{flexDirection: 'row'}}>
//       <TouchableOpacity onPress={toggleDrawer}>
//         <Image 
//           source={require('./assets/icon/man.png')} 
//           //source={{ uri:IMG_URL+profile_pic}}
//           style={{width: 25, height: 25, marginLeft: 5}}
//         />
 
//       </TouchableOpacity>
//     </View>
//   );
// };


  //function CustomDrawerContent({ progress, props, profile_pic, ...rest }) {
//     function CustomDrawerContent({ progress, props, profile_pic, ...rest }) {
  
//     return (

//       <SafeAreaView style={{flex:1}}>
//           <Image 
//             style={{ position : 'relative' , top :0 , height :250  , width : 280 }}
//             //source={require('./assets/icon/man.png')}
//             source={{ uri:IMG_URL+profile_pic}} 
//           />

//               <TouchableOpacity
//                     onPress={() => props.navigation.navigate('Editprofile')}
//                     style={{
//                         flexDirection: 'row', marginBottom: 20, alignItems: 'center'
//                     }}>
//                     <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text><FontAwesome5 name="user-edit" size={22} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Edit Profile</Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity
//                     onPress={() => props.navigation.navigate('Search')}
//                     style={{
//                         flexDirection: 'row', marginBottom: 20, alignItems: 'center'
//                     }}>
//                     <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text><AntDesign name="search1" size={22} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Search</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => props.navigation.navigate('Friends')}
//                     style={{
//                         flexDirection: 'row', marginBottom: 20, alignItems: 'center'
//                     }}>
//                     <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text><FontAwesome5 name="user-friends" size={22} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Friend</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => logout()}
//                     style={{
//                         flexDirection: 'row', marginBottom: 20, alignItems: 'center'
//                     }}>
//                     <View style={{ width: 40, height: 25, justifyContent: 'center', alignItems: 'center' }}><Text> <MaterialIcons name="logout" size={24} color='black' /></Text></View><Text style={{ fontSize: 16, color: '#000a' }}>Logout</Text>
//                 </TouchableOpacity>

//           <DrawerContentScrollView  {...rest}>

//             <DrawerItemList {...rest} />
            
//             {/* <DrawerItem
//               label="Logout"
//               labelStyle={{ color: '#fbae41', fontSize: 10 }}
//               onPress={() => {
//                 alert("logout!");
//                // await AsyncStorage.removeItem('useruuid');

//                 AsyncStorage.clear();
//                 rest.navigation.navigate('MyStack');
//                 //navigation.navigate('Signin');
//               }}
//               icon={({ color, size }) => (
//                 <Text>
//                   <MaterialIcons style={{
//                     alignSelf: 'center',
//                     position: "absolute",
//                     left: 10,
//                 }} name="logout" size={24} color={color} />
//                 </Text>

//               )}
              
//             /> */}
          
//           </DrawerContentScrollView>
//         </SafeAreaView> 
      
//   );
// }
  
  const Searchmenu =({navigation})=>{
	
    return (
      <Stack.Navigator initialRouteName='Searchtab'>
       
       <Stack.Screen
          name="Search_Username"
          component={Username}
          options={{ headerShown: true}}
        />
       
       <Stack.Screen
          name="User_Search_AboutMe"
          component={user_aboutme}
          options={{ headerShown: true, 
            title:'About',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />
        
        
        <Stack.Screen
          name="Searchtab"
          component={Searchtab}
          options={({ navigation }) => ({
						title: 'Search',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
						headerLeft: () => (

							<View style={{ alignItem: 'center', flexDirection: 'row',  backgroundColor: '#B2C248' }}>
                <TouchableOpacity 
                        onPress={() => navigation.toggleDrawer()}
                        >
                        <Entypo name="menu" size={28} color="#fff"  style={{ marginHorizontal: 30 }} />
                    </TouchableOpacity>
								
							</View>
						),
						headerStyle: {
							elevation: 5,
							shadowOpacity: 2,
							backgroundColor: '#B2C248'
						},
					
          })}
        />

        <Stack.Screen
          name="Userpost"
          component={Userpost}
          options={({ navigation }) => ({
            title: 'User Post',
            headerTintColor:'#fff',
            headerLeft: () => (
                <View style={{ alignItem:'center', justifyContent:'center', flexDirection:'row', marginLeft:10, backgroundColor:'#B2C248'}}>
                      <TouchableOpacity style={{backgroundColor:'#B2C248',}}  onPress={() => navigation.goBack()} >
                          <Fontisto name="arrow-left-l" size={24} color="#fff" />
                      </TouchableOpacity>
                      
                    </View>
            ),
    
              
            headerStyle: {
              elevation: 5,
              shadowOpacity: 5,
              backgroundColor: '#B2C248'
            },
            headerTitleStyle: { 
              alignSelf: 'center' ,
              backgroundColor: '#B2C248'
            },
          })}
        /> 
      </Stack.Navigator>  
    );
  }



  const Myfriend =({navigation})=>{
	
    return (
      <Stack.Navigator initialRouteName='Friends'>
    
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{ headerShown: true, 
            title:'My Friends',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        /> 

        <Stack.Screen
          name="Friendrequest"
          component={Friendrequest}
          options={{ headerShown: true, 
            title:'Friend Request',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

        <Stack.Screen
          name="Username1"
          component={Username1}
          options={{ headerShown: true, 
            title:'Friend Request',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

     </Stack.Navigator>  
    );
  }

  const StackActiveFeed =({navigation})=>{
	
    return (
      <Stack.Navigator initialRouteName='ActiveFeed'>
    
    

     

        <Stack.Screen
          name="ActiveFeed"
          component={ActiveFeed}
          options={{ headerShown: true}}
        />

     </Stack.Navigator>  
    );
  }


 
  const BottomTab =({navigation})=>{
	
    return (
      <Tab.Navigator
        initialRouteName="Userprofile"
        tabBarOptions={{
          activeTintColor: '#F5866B',
          inactiveTintColor:'#C2C2C2',
          adaptive:true,
          labelStyle: {
            marginTop:-4,
            fontSize: 12,
            marginBottom:4,
            
          },  
        }}
      >

        {/* <Tab.Screen
          name="DrawerTab"
          component={DrawerTab}
          options={({ route }) => ({headerShown:'true',
          title:'User Profile',        		
            tabBarLabel: 'Profile',				
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color}/>
                        
            ),
            headerStyle: {
              elevation: 5,
              shadowOpacity: 2,
            },
          })}           
        /> */}

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({headerShown:'false',
          title:'Profile',        		
            tabBarLabel: 'Profile',				
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color}/>
                        
            ),
            headerStyle: {
              elevation: 5,
              shadowOpacity: 2,
            },
          })}           
        />

        <Tab.Screen
          name="StackActiveFeed"
          component={StackActiveFeed}
          options={{
            tabBarLabel: 'Active Feed',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="camera" size={size} color={color} />      
            ),
            headerStyle: {
              elevation: 5,
              shadowOpacity: 2,
            },
          }}
        />
        
        <Tab.Screen	        
          name="Searchmenu"
          component={Searchmenu}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="search1" size={size} color={color} />
            ),
            headerStyle: {
              elevation: 5,
              shadowOpacity: 2,
            },
          }}
        />

        {/* <Tab.Screen	        
          name="Searchtab"
          component={Searchtab}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="search1" size={size} color={color} />
            ),
            headerStyle: {
              elevation: 5,
              shadowOpacity: 2,
            },
          }}
        /> */}
      </Tab.Navigator>
    );
  }

  


  const Profile =({navigation})=>{
	
    return (
      <Stack.Navigator initialRouteName='Userprofile'>


        <Stack.Screen
          name="Userprofile"
          component={Userprofile}
          options={{ headerShown: true, 
            title:'User Profile',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

        <Stack.Screen
          name="Createpost"
          component={Createpost}
          options={{ headerShown: true, 
            title:'Create Post',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

        <Stack.Screen
          name="MannualLocation"
          component={MannualLocation}
          options={{ headerShown: true}}
        />

        <Stack.Screen
          name="Editpost"
          component={Editpost}
          options={{ headerShown: true,  }}
        />

        <Stack.Screen
          name="Aboutme"
          component={Aboutme}
          options={{ headerShown: true, 
            title:'About me',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />
        
        <Stack.Screen
          name="Maplocation"
          component={Maplocation}
          options={{ headerShown: true, 
            title:'location',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

        <Stack.Screen
          name="Userpost"
          component={Userpost}
          options={{headerShown: true}}
        />  

        <Stack.Screen 
          name="Username" 
          component={Username} 
          options={{ headerShown: true,
          
            title:'About me',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}         
        /> 

  
         
        
      </Stack.Navigator>  
    );
  }



  const Myfriends =({navigation})=>{
	
    return (
      <Stack.Navigator initialRouteName='myfriends'>


       
        <Stack.Screen
          name="myfriends"
          component={myfriends}
          options={{headerShown: true}}
        />  
        

        <Stack.Screen
          name="Userpost"
          component={Userpost}
          options={{headerShown: true}}
        />  

        <Stack.Screen 
          name="Username" 
          component={friend_username} 
          options={{ headerShown: true}}         
        /> 
         <Stack.Screen
          name="User_AboutMe"
          component={user_aboutme}
          options={{ headerShown: true, 
            title:'About',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />
      </Stack.Navigator>  
    );
  }


  const Searchfriend =({navigation})=>{
	
    return (
      <Stack.Navigator initialRouteName='Friends'>
    
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{ headerShown: true, 
            title:'My Friends',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

        <Stack.Screen
          name="Friendrequest"
          component={Friendrequest}
          options={{ headerShown: true, 
            title:'Friend Requests',
            headerTintColor: '#fff',
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: '#B2C248'
            },
          }}
        />

      </Stack.Navigator>  
    );
  }
  



function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Signin'>
    
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerTab"
        component={DrawerTab}
        options={{ headerShown: false }}
      />  
      <Stack.Screen
        name="Forgotpassword"
        component={Forgotpassword}
        options={{ headerShown: false }}
      />  
      <Stack.Screen
        name="Verificationcode"
        component={Verificationcode}
        options={{ headerShown: false }}
      />  
      <Stack.Screen
        name="Newpassword"
        component={Newpassword}
        options={{ headerShown: false }}
      />  
      <Stack.Screen
        name="Congratulation"
        component={Congratulation}
        options={{ headerShown: false }}
      />  
      <Tab.Screen
	        name="BottomTab"
	        component={BottomTab}	        
	        options={{ headerShown: false }}
      	/>

      <Stack.Screen
        name="Createprofile"
        component={Createprofile}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
              <View style={{ alignItem:'center', flexDirection:'row', marginLeft:10, backgroundColor:'#B2C248'}}>
                    <TouchableOpacity style={{backgroundColor:'#B2C248',}}  onPress={() => navigation.goBack()} >
                        <Fontisto name="arrow-left-l" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ marginLeft:10,color:'#fff', fontWeight:'bold', fontSize:18}}>Create Profile</Text>
                  </View>
          ),
  
            
          headerStyle: {
            elevation: 5,
            shadowOpacity: 5,
            backgroundColor: '#B2C248'
          },
          headerTitleStyle: { 
            alignSelf: 'center' ,
            backgroundColor: '#B2C248'
          },
        })}
       
      />  
      <Stack.Screen
        name="Editprofile"
        component={Editprofile}
        options={{ headerShown: true,  }}
      />  

       
      
 
    
      

      <Stack.Screen
        name="Maplocation"
        component={Maplocation}
        options={{ headerShown: true, 
          title:'Location',
          headerTintColor: '#fff',
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#B2C248'
          },
        }}
      />    
     
       

      <Stack.Screen
        name="Input1"
        component={Input1}
        options={{ headerShown: false }}
      />

       {/* <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{headerShown:false} }
      />  */}

    </Stack.Navigator>            
  );
}

export default MyStack;
// const mapStateToProps = (props) => {
//   const { dob,gender,username,name,location,about_me,profile_pic,user_id} = props.userReducer;
   
//   return {
//       username,name,gender,dob,location,about_me,profile_pic,user_id
//   }
// }

// export default connect(mapStateToProps)(MyStack);
