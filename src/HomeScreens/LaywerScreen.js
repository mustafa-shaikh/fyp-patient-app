import React from 'react';
import { 
  View,
  Text,
  StyleSheet
} from 'react-native';

const LaywerScreen = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Text>LaywerScreen</Text>
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
export default  LaywerScreen;