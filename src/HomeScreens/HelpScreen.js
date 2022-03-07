import React from 'react';
import { 
  View,
  Text,
  StyleSheet
} from 'react-native';

const HelpScreen = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Text>Contact Us:</Text>
      <Text>WhatsApp:1(908)248-2227</Text>
      <Text>Call:1(800)919-9280</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default HelpScreen