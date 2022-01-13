import * as React from 'react';
import { View,Text,ImageBackground, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Alert, Dialog, Portal } from 'react-native';
import Button1 from '../customComponent/button1';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome, MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';


const Editpost = ({navigation}) => {

    // const [inputVal, setInputVal] = useState('test');
    // const [isDialogVisible, setIsDialogVisible] = useState(false);


    const createAlert = () =>
    
    Alert.alert(
        
        "Keyview Photo",
      "would like to use your current location",
      [
        {
            
          text: "Allow",
          onPress: () => console.log("Allow Location"),
          style: "cancel",


        },
        { text: "Don't Allow", onPress: () => console.log("Don't Allow location") }
      ],
      { cancelable: false }
    );

    return (

        <View style={styles.container}>
       
            <View style={styles.container1}>
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                    <Image style={{width:80, height:80, borderRadius:60, }}
                        source={require('../../assets/icon/man.png')} 
                    />

                    <Text style={{padding:20, fontSize:20}}>User name</Text>
                </View>
            </View>

            
            <View style={{margin:20, borderWidth:1, borderColor:'#D7D7D7', borderRadius:10, height:200}}>
                <TextInput
                    multiline={true}
                    style={{marginLeft:20}}
                    placeholder="Lorem ispat is a dummy Text...."
                    numberOfLines={5}
                />

            </View>

            <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-start',margin:20, padding:10, borderBottomWidth:1}}>
                <MaterialCommunityIcons name="image-multiple" size={26} color="#F9B7A7" />
                <Text style={{paddingLeft:20, fontSize:18}}>Photo/Video</Text>
            </TouchableOpacity>
           

            <TouchableOpacity onPress={createAlert}
                style={{flexDirection:'row', justifyContent:'flex-start',marginLeft:20,marginRight:20,padding:10, borderBottomWidth:1}}>


                <Entypo name="location-pin" size={26} color="#F9B7A7" />
                <Text style={{paddingLeft:20, fontSize:18}}>location</Text>

                    {/* <Portal>
                    <Dialog
                        visible={isDialogVisible}
                        onDismiss={() => setIsDialogVisible(false)}>
                        <Dialog.Title>Keyview photo</Dialog.Title>
                        <Dialog.Content>
                        <TextInput
                            value={inputVal}
                            onChangeText={text => setInputVal(text)}
                        />
                        <TextInput
                            value={inputVal}
                            onChangeText={text => setInputVal(text)}
                        />
                        <TextInput
                            value={inputVal}
                            onChangeText={text => setInputVal(text)}
                        />
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={() => setIsDialogVisible(false)}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                    </Portal> */}



            </TouchableOpacity>


            <Button1 onPress={() => navigation.navigate('')}
                style1={{backgroundColor:'#B2C248',marginTop:80, marginBottom:10}}> Update Post
            </Button1>


        </View>

    );
}

export default Editpost;


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