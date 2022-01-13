import React from 'react'
import { TextInput, StyleSheet,TouchableOpacity, View, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign, EvilIcons,FontAwesome5,Fontisto  } from '@expo/vector-icons';

const Input1 = ({ style1, style,icontype,icon,color,children,...props }) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={[style,styles.container1]}>
            {(icontype == 'Ionicons') ? 
            <Ionicons name={icon} color={color} size={18} style={{alignSelf:'center', padding:20}} />
            : null}
            {(icontype == 'MaterialIcons') ? 
            <MaterialIcons name={icon} color={color} size={18} style={{alignSelf:'center', padding:18}} />
            : null}
            {(icontype == 'FontAwesome') ? 
            <FontAwesome name={icon} color={color} size={18} style={{alignSelf:'center', padding:20}} />
            : null}
            {(icontype == 'AntDesign') ? 
            <AntDesign name={icon} color={color} size={18} style={{alignSelf:'center', padding:20}} />
            : null}
            {(icontype == 'EvilIcons') ? 
            <EvilIcons name={icon} color={color} size={18} style={{alignSelf:'center', padding:20}} />
            : null}
            {(icontype == 'FontAwesome5') ? 
            <FontAwesome5 name={icon} color={color} size={18} style={{alignSelf:'center', padding:20}} />
            : null}
            {(icontype == 'Fontisto') ? 
            <Fontisto name={icon} color={color} size={18} style={{alignSelf:'center', padding:20}} />
            : null} 
                {/* <Image style={styles.img}  source={require('../../assets/icon/user.png')} >
                    {children}
    
                </Image> */}

                <TextInput style={[styles.input]} {...props}/> 
           </TouchableOpacity>
           </View>     
    );
}

export default Input1

const styles = StyleSheet.create({
    container:{
       marginLeft:20,
       marginRight:20, 
       //paddingRight:20,
       //paddingLeft:20,
       //marginHorizontal:20
    },
    input: {
       flex:1,
       //padding:20,     
       //marginLeft:-5,
       //borderBottomWidth: 0.5,                
       //borderBottomColor: 'rgba(0, 0, 0, 0.25)',
       //width:250,
    },
    container1:{
        flexDirection: 'row',
        marginLeft:20,
        marginRight:20,
        borderBottomWidth: 0.5,                
        borderBottomColor: 'rgba(0, 0, 0, 0.25)',
        justifyContent:'flex-start',
        //width:Dimensions.get('screen').width,
        //paddingLeft:20,
        paddingRight:20,
    }
})