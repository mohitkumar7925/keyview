import React from 'react';
import MyStack from './route';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts} from '@expo-google-fonts/inter';
import configureStore from './store/index';
import { Provider } from 'react-redux';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

const store = configureStore();

let customFonts = {
  'font1': require('./assets/fonts/SFProDisplay-Semibold.ttf'),
  'font2': require('./assets/fonts/SFProDisplay-Bold.ttf'),
  'font3': require('./assets/fonts/SFProDisplay-Black.ttf'),
  'font4': require('./assets/fonts/SFProDisplay-Light.ttf'),
  'font5': require('./assets/fonts/SFProDisplay-Heavy.ttf'),
  'font6': require('./assets/fonts/SFProDisplay-Regular.ttf'),
  'font7': require('./assets/fonts/SFProDisplay-Medium.ttf'),

};

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


const App = () => {


  

  let [fontsLoaded] = useFonts(customFonts);
  const [visible, setVisible] = React.useState(false);

  const  _loadAssetsAsync =async()=> {
    const imageAssets = cacheImages([
    
      require('./assets/icon.png'),
      require('./assets/lock.jpg')
      
      

    ]);  

    await Promise.all([...imageAssets,]);
  }


  if (!visible && !fontsLoaded) {
    return (
      <AppLoading
        startAsync={()=>_loadAssetsAsync()}
        onFinish={() => setVisible(true)}
        onError={console.warn}
      />
    );
  } else {
    
      if(!fontsLoaded){
        return (
          <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
              <ActivityIndicator size='large' color='#B2C248' />
          </View>
        )
      }else{

        

      
      return (
        <Provider store = { store }>  
          <NavigationContainer>
            <MyStack />         
          </NavigationContainer>
        </Provider>
        );
      }

  }



  }

export default App;
