import React from 'react'
import {View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'
import {  Overlay } from 'react-native-elements';


const Overlayloading = ({style2, style1,visible, fontcol, children, ...props }) => {
    return (
    
 

        <Overlay isVisible={visible} containerStyle={{backgroundColor:'brown'}} >
            <ActivityIndicator color="black" style={{ margin: 15 }} />
            <Text style={{width:100, textAlign:'center'}}>{children}</Text>
        </Overlay>             
     
    

    );
}


export default Overlayloading;

