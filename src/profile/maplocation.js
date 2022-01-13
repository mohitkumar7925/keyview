import React, {useState, useEffect} from 'react';
import { View,Text, Dimensions, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

const Maplocation = ({navigation}) => {

    const [location, setLocation] = useState(location);
    const [errorMsg, setErrorMsg] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    
    const [current_address, setCurrent_address] = useState('');
    const [custmeraddress, addCustomeraddress] = useState('');
    
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        //setLocation(location);

        
        const loc = {
            latitude : location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
        }
        setRegion(loc);
        //setmapRegion(loc);
      })();
    }, []);
    
    console.log("hello");
    // console.log("lat"+latitude);
    // console.log(longitude);
    console.log("region" +region);

    // const [mapRegion, setmapRegion] = useState({
    //     //latitude : location.coords.latitude,
    //     //longitude: location.coords.longitude,
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.009,
    //     longitudeDelta: 0.009,
    //   });
    
    const [region, setRegion] = useState({

    });


//     fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude +','+longitude + 'AIzaSyDo0_vT2-jWH6CSHGUSY87QImatpCQmXVI')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log("Hello world :");
//      // console.log(responseJson);          
//      setCurrent_address(responseJson.results[0].formatted_address);
//      addCustomeraddress(responseJson.results[0].formatted_address);
      
//         // this.props.confirm_location(coords1);
//         // console.log(JSON.stringify(responseJson.results[0].formatted_address));
//   })


    return(
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}                    
            >
                {/* <Marker 
                    draggable
                    coordinate={mapRegion} 
                    onRegionChangeComplete={region => setmapRegion(region)}                    
                    title='My location'
                    onDragEnd={e => {
                        console.log('dragEnd', e.nativeEvent.coordinate);
                    }} 
                /> */}
                
                <Marker 
                        coordinate={region}
                        title="My Marker"
                        description="Some description"
                    
                />

            </MapView>
            
            <TouchableOpacity
                onPress={() => navigation.navigate('goBack'), JSON.stringify(location)} 

            >
                <Text style={{backgroundColor:'#B2C248', width:150, height:50, alignSelf:'center',  borderRadius:5, padding:10, paddingLeft:40, color:'#fff'}}>confirm</Text>
            </TouchableOpacity>
        
        </View>
    );

}

export default Maplocation;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,

    },
    map:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height-150,

    }
})
