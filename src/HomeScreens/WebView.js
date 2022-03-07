import React from 'react';
import {
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';


const WebScreen = props => {
  return (
      
      <View style={{ backgroundColor: '#fff',flex: 1}}>
          
      <WebView
        source={{ uri: `${props.route.params.msg}` }}
        style={{ marginTop: 20, }}    
      />
    </View>

  );
};

export default WebScreen;