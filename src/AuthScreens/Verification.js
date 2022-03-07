import React,{useState} from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator, Modal
} from 'react-native';
import { accountService } from '../_services/account.service';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VerificationScreen = (props) => {
  const [ data, setData ] = React.useState(null);

  const [ onLoad, setOnLoad ] = useState(false );

  const getRequest = ({navigation}) => {
    accountService.verifyEmail(data, props.route.params.email)
    .then((res) => {
      if (res.status == 200) {

        navigation.navigate('SignIn')
      }
    }).catch(err => {
    })
  }
  const { navigation } = props;
  return (
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.logo} source={require('../../assets/logo.png')}/>
      </View>
      <View style={styles.body}>
      <TextInput 
          placeholder='Enter the PIN sent to your EMAIL'
          placeholderTextColor="grey"
          style={styles.textField}
          keyboardType='numeric'
          // secureTextEntry
          value={data}
          maxLength={6}
          onChangeText={setData}
        />
        
        <TouchableOpacity style={styles.button} onPress={()=>getRequest({navigation})}  >
          {
            onLoad ? <ActivityIndicator size="small" color="#fff" />:
            <Text style={[styles.txtbtn]}>Submit</Text>
          }
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={[ styles.row]}>
          <Text style={[styles.footertext]}>
            If you have already an account, click here to{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.footertext, {color: "rgb(254,141,123)"}]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    height:hp('100%'),
    backgroundColor:'#fff',
    // justifyContent: 'center',\
  },
  imageView:{
    flex:.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomHeader:{

  },
  logo:{
    resizeMode:'contain',
    height: hp('28%'),
    width: hp('28%'),
  },
  body:{
    flex:.75,
    paddingLeft:20,
    paddingRight:20,
    // justifyContent: 'center',
  },
  
  // input text and button
  textField:{
    backgroundColor:'#fff',
    height:(Dimensions.get('window').height+Dimensions.get('window').width)/22,
    borderRadius:10000,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:(Dimensions.get('window').height+Dimensions.get('window').width)/88,
    paddingLeft:30,
    marginTop:"5%",
    elevation:10,
  },

  button:{
    marginTop:'10%',
    // marginButtons:'10%',
    alignSelf:'center',
    backgroundColor:"#00ad57",
    alignItems: 'center',
    borderRadius:1000,
    justifyContent: 'center',
    height:(Dimensions.get('window').height+Dimensions.get('window').width)/20,
    width:(Dimensions.get('window').height+Dimensions.get('window').width)/7,
  },
  txtbtn:{
    fontFamily: 'Montserrat-Bold',
    fontSize:(Dimensions.get('window').height+Dimensions.get('window').width)/88,
    color:'white',
  },

  /// text styles
  forgetPass:{
    marginTop:'5%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize:(Dimensions.get('window').height+Dimensions.get('window').width)/88,
    color:'blue',
    alignSelf: 'flex-end',
  },

  // header
  footer: {
    flex:.075,
    backgroundColor: 'rgb(245,245,245)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'flex-end',
    width: '100%',
  },
  footertext: {
    color: 'rgb(104,111,140)',
    // fontSize:'12@s',
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  agree_Textblack: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 100,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(104,111,140,0.4)',
  },
  agree_Textorange: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 100,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(254,141,123,1)',
  },

  txt: {
    flexDirection: 'row',
    marginLeft: '0%',
    // marign:10
  },
  Checkbox: {
    marginRight: 6,
    marginLeft: 6,
    justifyContent:'center',
    alignItems:'center',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 70,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 70,
    backgroundColor: 'rgba(255,255,255, 1)',
    borderWidth: 1.5,
    borderColor: 'rgba(254,141,123, 1)',
    borderRadius: 3,
  },
  agree_con: {
    marginTop:'5%',
    display: 'flex',
    flexDirection: 'row',
  },
})

export default VerificationScreen;