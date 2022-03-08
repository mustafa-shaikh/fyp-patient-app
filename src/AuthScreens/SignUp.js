import React, {useState} from 'react';
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
  ActivityIndicator,
  Modal,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {accountService} from '../_services/account.service';

const SignUpScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [onLoad, setOnLoad] = useState(false);

  const getRequest = ({navigation}) => {
    accountService
      .register(data)
      .then(res => {
        console.log("Mustafa res", res)
        if (res.status == 200) {
          Alert.alert("Account Created Successfully")
          navigation.navigate('SignIn', {
            email: data.email,
          });
        }
      })
      .catch(err => {
        Alert.alert("Account exists with this Email")
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.body}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="grey"
          style={styles.textField}
          onChangeText={txt => {
            setData({...data, firstName: txt});
          }}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="grey"
          style={styles.textField}
          onChangeText={txt => {
            setData({...data, lastName: txt});
          }}
        />
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
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          style={styles.textField}
          secureTextEntry
          onChangeText={txt => {
            setData({...data, confirmPassword: txt});
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => getRequest({navigation})}>
          {onLoad ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.txtbtn]}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={[styles.row]}>
          <Text style={[styles.footertext]}>
            If you have already an account, click here to{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.footertext, {color: '#00ad57'}]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  imageView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomHeader: {},
  logo: {
    resizeMode: 'contain',
    height: hp('28%'),
    width: hp('28%'),
  },
  body: {
    flex: 0.75,
    paddingLeft: 20,
    paddingRight: 20,
  },

  textField: {
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
    color: 'blue',
    alignSelf: 'flex-end',
  },

  footer: {
    flex: 0.075,
    backgroundColor: 'rgb(245,245,245)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
  },
  Checkbox: {
    marginRight: 6,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SignUpScreen;
