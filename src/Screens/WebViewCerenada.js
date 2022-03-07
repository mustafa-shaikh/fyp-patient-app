import React from 'react';
import {
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';


const WebScreen = ({route}) => {

  return (
      
      <View style={{ backgroundColor: '#fff',flex: 1}}>
          
      <WebView
        source={{ uri: `https://www.eimmigration.com/diasporalaw/Client/` }}
        style={{ marginTop: 20, }}    
      />
    </View>

  );
};

export default WebScreen;