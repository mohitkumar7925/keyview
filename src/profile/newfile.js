import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import { connect } from 'react-redux';
import {API_URL} from '../url/url';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import {change_customer_detail} from "../../Components/store/actions/user_action";
import { ImageBackground, Dimensions, Button, SafeAreaView, FlatList,ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import {SimpleLineIcons, MaterialIcons, FontAwesome5,EvilIcons, AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons,Fontisto } from '@expo/vector-icons';
import Styles from '../../Components/css/Stylescss';


const EditProfile =({navigation, route, customer_name, updateUser,  customer_mobile, customer_id, customer_city, description, customer_photo, customer_address})=> {
const [text, setText] = useState(customer_name);
const [text1, setText1] = useState(description);
const [text2, setText2] = useState(customer_address);
const [btncolor, setBtncolor] = useState('black');
const [btncolor1, setBtncolor1] = useState('black');
const [btn1disable, setBtn1disable] = useState(true);
const [check, setCheck] = useState(true);
const [image, setImage] = useState(customer_photo);
//console.log(image);
// alert(customer_id);
console.log(customer_photo);
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);
    console.log("image value"+image);
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
    }
    console.log("image value"+image);
    setBtn1disable(false);

   
  };

const image_check = () =>{

  if(image == customer_photo){
    console.log('change image')
    console.log("Icheck_true"+image);
    setBtn1disable(true);

  }else{
    console.log("Icheck_false"+image);
    setBtn1disable(false);
    

  }

}

const name_check = () =>{
  if(text == customer_name){
    console.log('change text')
    console.log(text);
    setBtn1disable(true);

  }else{
    console.log(text);
    setBtn1disable(false);
    

  }

}

const description_check = () =>{
  if(text1 == description){
    console.log('change text')
    console.log(text1);
    setBtn1disable(true);

  }else{
    console.log(text1);
    setBtn1disable(false);
    

  }

}

const city_check = () =>{
  if(text2 == customer_city){
    console.log('change text')
    console.log(text2);
    setBtn1disable(true);

  }else{
    console.log(text2);
    setBtn1disable(false);
    

  }

}
const Save_button = () =>{
  
   console.log("save button function");
  
    console.log("helllo");
              console.log(image);

            let formData = new FormData();
            if(image != null && image != "" && image != undefined){
              console.log("helllo");
              console.log(image);
              var localUri = image;
              let filename = localUri.split('/').pop();
              let match = /\.(\w+)$/.exec(filename);
              let type = match ? `image/${match[1]}` : `image`;
              formData.append('photo', { uri: localUri, name: filename, type: type});
            }
            formData.append("customer_id",customer_id);
            formData.append('customer_name',text);
            formData.append('description',text1);
            formData.append('customer_city',text2);            
            console.log(formData);

            fetch(API_URL + '/apis/updateProfile.php', {
            method: 'POST',
            body: formData,
            headers: {
              'content-type': 'multipart/form-data',

            },
          })
            .then((response) => response.json())
              .then((responseJson) => {
               
               updateUser(responseJson.data);
               if (responseJson.error == '0') {
                console.log('wegfuygweiurogerf4');
                console.log(responseJson.data);
                alert( "Updated SuccessFully") ;       
          
                  
               }else{
                console.log(  responseJson.error_msg);
                 
                  
                }

              })
              .catch((error) => {
                console.error(error);
              });

            setBtn1disable(true);

          

}

   



  const data = route.params;
  return (
    
    <View style={{flex:1,backgroundColor:'#fff'}}>
      
      <ScrollView >
        <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('../../assets/back.jpg')}
        >
            <View style={{  height:170, flexDirection:'row', backgroundColor:'transparent'}}>
              <TouchableOpacity style={{height:30, marginTop:100, marginLeft:270,  backgroundColor:'transparent', paddingVertical:5, paddingHorizontal:20, borderColor:'grey',   }} >
                <Text style={{ fontSize:15,  color:'transparent', backgroundColor:'transparent' }} >Edit</Text>
              </TouchableOpacity>
            </View>

        </ImageBackground>



        <View style={{ marginLeft:10, marginRight:10, paddingVertical:10,  backgroundColor:'#fff'}}>
            <Text style={[Styles.textNormalMedium]} >Profile Photo</Text>

        </View>


        <View style={{ marginLeft:10, marginRight:10, paddingVertical:5,  backgroundColor:'#fff'}}>
            <View style={{ alignItems:'center', flexDirection:'row', backgroundColor:'#fff'}}>
                <Image source={{ uri:customer_photo}} style={{ width: 30, height: 30, borderRadius:50}} />
                <TouchableOpacity onPress={()=>{pickImage(); image_check();  }} style={{flexDirection:'row'}}>
                  <Entypo style={{marginLeft:10,}} name="camera" size={20} color="orange" />
                  <Text style={{marginLeft:5,color:'orange', fontSize:15, fontWeight:'bold'}} >Add Photo</Text>
                </TouchableOpacity>
            </View>

        </View>

        <View style={{marginLeft:10, marginRight:10, paddingVertical:5,  flexDirection:'row', borderColor:'#fff', borderWidth:1, borderBottomColor:'black', alignItems:'center', borderTopColor:'black',  marginTop:10, justifyContent:'space-between'}}>
            <TextInput
              style={[Styles.textSubHeading,{ borderColor:'white', width:300, backgroundColor:'#fff',  }]}
              placeholder="Name"
              placeholderTextColor='black'
              onChangeText={text => {setText(text); name_check(text)}}
              
              defaultValue={text} 
            />
            <TouchableOpacity  onPress={()=>{setText(""); setBtncolor("transparent"); name_check("") }}>
              <AntDesign name="closecircle" size={15} color={btncolor} />
            </TouchableOpacity>
   
        </View>

        <View style={{marginLeft:10, marginRight:10, borderColor:'#fff', borderBottomColor:'grey', borderWidth:1, paddingTop:10, paddingBottom:5,  backgroundColor:'#fff'}}>
            <Text style={[Styles.textNormalMedium]} >Phone number: </Text>

            <View style={{borderColor:'#fff',paddingBottom:3, borderBottomColor:'grey', borderWidth:1,  backgroundColor:'#fff', flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:"center"}}>
                <Image source={require('../../assets/flag.png')} style={{height:20,width:20,resizeMode:'contain',}} />
                <Text style={[Styles.textNormalMedium,{ marginLeft:10 }]} >+91 <Text style={{color:'grey'}}>l</Text> {customer_mobile}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={()=>navigation.navigate("EnterPhone")}>
                  <Text style={[Styles.textNormalMedium,{color:'red'}]} >Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={[Styles.textSubHeading,{ borderColor:'white', width:300, backgroundColor:'#fff',  }]}
              placeholder="Location"
              placeholderTextColor='black'
              onChangeText={text2 => {setText2(text2); city_check(text2)}}
              
              defaultValue={text2} 
            />

        </View>

        <View style={{marginLeft:10, marginRight:10, paddingVertical:10,  backgroundColor:'#fff'}}>
            <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={[Styles.textSubHeading]} >Discriptions</Text>
              <TouchableOpacity  onPress={()=>{setText1(""); setBtncolor1("transparent"); description_check("") }}>
                <AntDesign name="closecircle" size={15} color={btncolor} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[Styles.textNormalMedium,{ borderColor:'white', width:300,  backgroundColor:'#fff',  }]}
              placeholder="Tell us something about your self"
              placeholderTextColor='black'
              onChangeText={text1 => {setText1(text1); description_check(text1)}}
              
              defaultValue={text1} 
            />        
        </View>
        <View style={{ marginBottom:30, marginTop:5, flexDirection:'row', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
              <TouchableOpacity disabled={btn1disable}  onPress={()=> Save_button()} style={{ paddingHorizontal:150,paddingVertical:10, borderWidth:1, borderRadius:70,  borderColor: (btn1disable)? 'grey': 'orange', backgroundColor:(btn1disable)? 'grey': 'orange'}}>
                <Text style={{color:'white', fontSize:15, fontWeight:'bold' }}>Save</Text>
              </TouchableOpacity>
        </View>
        
        
        
        
          






    
      </ScrollView>
      
    </View>
    

    
  
  );
};


const mapDispatchToProps = (dispatch) => ({
  updateUser: (value) => dispatch(change_customer_detail(value)), 
 
})


EditProfile.propTypes = {
  updateUser: PropTypes.func,
  
}
const mapStateToProps = (state) => {
const { customer_name,customer_mobile,customer_photo, customer_id, customer_city, description, customer_address} = state.customerReducer;

return {
customer_name,customer_mobile,customer_photo, customer_id, customer_city, description, customer_address
}
}




export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);