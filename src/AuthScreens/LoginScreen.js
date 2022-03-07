import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {accountService} from '../_services/account.service';

const LoginScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const getRequest = ({navigation}) => {
    accountService
      .signIn(data.email, data.password)
      .then(user => {
        navigation.push('HomeScreen');
      })
      .catch(err => {
        Alert.alert('Incorrect! Username or Password');
      });
  };

  const [onLoad, setOnLoad] = React.useState(false);
  return (
    // <ScrollView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.body}>
        <View style={{height: '50%'}}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.textField}
            onChangeText={txt => {
              setData({...data, email: txt});
            }}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            style={styles.textField}
            secureTextEntry
            onChangeText={txt => {
              setData({...data, password: txt});
            }}
          />
          {/* <Text style={styles.forgetPass}>Forget password</Text> */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getRequest({navigation});
          }}>
          {onLoad ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.txtbtn]}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={[styles.row]}>
          <Text style={[styles.footertext]}>
            Dont have an account? Click here to{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.footertext, {color: '#00ad57'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // {/* </ScrollView> */}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  imageView: {
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    resizeMode: 'contain',
    height: hp('33%'),
    width: hp('33%'),
  },
  body: {
    height: hp('50%'),
    paddingLeft: 20,
    paddingRight: 20,
  },

  textField: {
    color:"black",
    backgroundColor: '#fff',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 22,
    borderRadius: 10000,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    paddingLeft: 30,
    marginTop: '5%',
    elevation: 10,
  },

  button: {
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: '#00ad57',
    alignItems: 'center',
    borderRadius: 1000,
    justifyContent: 'center',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 20,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 7,
  },
  txtbtn: {
    color:"black",
    fontFamily: 'Montserrat-Bold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    color: 'white',
  },

  forgetPass: {
    marginTop: '5%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    alignSelf: 'flex-end',
  },

  footer: {
    backgroundColor: 'rgb(245,245,245)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp('10%'),
  },
  footertext: {
    color: 'rgb(104,111,140)',
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
