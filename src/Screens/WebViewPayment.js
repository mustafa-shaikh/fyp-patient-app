import React from 'react';
import {
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';


const WebScreen = ({route}) => {

  return (
      
      <View style={{ backgroundColor: 'blue',flex: 1}}>
          
      <WebView
        source={{ uri: `https://diasporalaw.securepayments.cardpointe.com/pay` }}
        style={{ marginTop: 20, }}   
      />
    </View>

  );
};

export default WebScreen;