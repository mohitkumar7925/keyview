import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';


const Button1 = ({children,style2, style1, title, ...props }) => {
    return (
        <TouchableOpacity style={[styles.signinbtn, style1]} {...props}>
            <Text style={[styles.textStyle, style2]}>{children}{title}</Text>
        </TouchableOpacity>
    );
}

export default Button1

const styles = StyleSheet.create({
    signinbtn: {
        marginTop:10,
        marginBottom:20,
        width:Dimensions.get("screen")/1.25,
      
        borderRadius:70,
        alignSelf:'center',
        padding:15,
        alignItems:"center",
        justifyContent:'center'
    },
    textStyle:{
        color:'#fff',
        textAlign: 'center',
        fontSize:20,
     
    }
})