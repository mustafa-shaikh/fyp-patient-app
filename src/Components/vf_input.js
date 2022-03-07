import React from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import  {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
function VerificationformInput(props) {
  return (
    <View style={styles.vfinput_con}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="grey"
        value={props.value}
        keyboardType={props.type}
        onChangeText={text=>props.onChange(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    vfinput_con:{
        display:'flex',
        marginBottom:hp('1%'),
        padding:'2%'

    },
  label: {
   fontSize:  hp('1.8%'),
    color: 'rgba(104,111,140,1)',
    fontFamily: 'Montserrat-SemiBold',
  },
  input: {
      fontSize:  hp('2%'),
    fontFamily: 'Montserrat-SemiBold',
    borderBottomColor: 'rgba(104, 111, 140, 0.6)',
    borderBottomWidth:1,
    // color: 'rgba(104,111,140,1)',
    color: 'black',
    paddingBottom:'-1%',
    paddingLeft:'-2%',
    paddingTop:'1%'
  },
});

export default VerificationformInput;
