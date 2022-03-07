import React, {useState, useEffect} from 'react';
import {cloudinaryPreset, cloudinaryUrl} from '../../config';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {accountService} from '../_services/account.service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UpdateProfile = ({navigation}) => {
  const user = accountService.userValue;
  const [state, setState] = useState({
    uri: null,
    type: null,
    name: null,
  });
  const [able, setAble] = useState(false);
  const [data, setData] = useState({
    imageUrl: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const openCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        setState({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        setAble(true);
      }
    });
  };

  const openGallery = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        setState({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        setAble(true);
      }
    });
  };

  useEffect(() => {
    setData(user);
  }, []);

  const getRequest = () => {
    if (able) {
      const formData = new FormData();
      formData.append('file', state);
      formData.append('upload_preset', `${cloudinaryPreset}`);
      try {
        return fetch(`${cloudinaryUrl}`, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(res => {
            data.imageUrl = res.secure_url;
            accountService
              .updateProfile(data)
              .then(res => {
                setData(res);
                Alert.alert('Profile Updated Successfully');
              })
              .catch(err => {});
          });
      } catch (err) {}
    } else {
      accountService
        .updateProfile(data)
        .then(res => {
          setData(user);
          Alert.alert('Profile Updated Successfully');
        })
        .catch(err => {});
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: (state.uri != null? state.uri : user.imageUrl )}} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.btnParentSection}>
              <Text style={styles.titleStyle}>Profile Picture</Text>
              <TouchableOpacity
                onPress={() => openCamera()}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openGallery()}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>First Name</Text>
              <TextInput
                placeholder={user.firstName}
                placeholderTextColor="grey"
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, firstName: txt});
                }}
              />
            </View>

            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>Last Name</Text>
              <TextInput
                placeholder={user.lastName}
                placeholderTextColor="grey"
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, lastName: txt});
                }}
              />
            </View>

            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>Phone</Text>
              <TextInput
                placeholder={user.phone}
                placeholderTextColor="grey"
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, phone: txt});
                }}
              />
            </View>

            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>City</Text>
              <TextInput
                placeholder={user.city}
                placeholderTextColor="grey"
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, city: txt});
                }}
              />
            </View>

            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>Address</Text>
              <TextInput
                placeholder={user.address}
                placeholderTextColor="grey"
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, address: txt});
                }}
              />
            </View>

            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>Password</Text>
              <TextInput
                placeholder={'Password'}
                placeholderTextColor="grey"
                secureTextEntry
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, password: txt});
                }}
              />
            </View>

            <View style={styles.OptionGroup}>
              <Text style={styles.titleStyle}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="grey"
                secureTextEntry
                style={styles.textField}
                onChangeText={txt => {
                  setData({...data, confirmPassword: txt});
                }}
              />
            </View>
            <View style={styles.btnParentSection}>
              <TouchableOpacity
                style={styles.btnSection1}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.btnText1}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnSection1}
                onPress={() => {
                  getRequest();
                }}>
                <Text style={styles.btnText1}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#AF1123',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    padding: 5,
  },
  OptionGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleStyle: {
    alignSelf: 'flex-start',
    backgroundColor: '#AF1123',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 30,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 12,
    borderRadius: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    paddingLeft: 10,
    marginTop: '5%',
    color: 'white',
    elevation: 10,
  },
  textField: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 30,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 4,
    borderRadius: 10000,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    paddingLeft: 30,
    marginTop: '5%',
    elevation: 10,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#AF1123',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#AF1123',
  },
  btnParentSection: {
    height: 50,
    // borderRadius: 30,
    // backgroundColor:"pink",
    // borderWidth:1,
    // borderColor:'#AF1123',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  btnSection: {
    width: 125,
    height: 35,
    marginTop: 20,
    backgroundColor: '#2e29cc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 15,
  },
  btnSection1: {
    width: 125,
    height: 35,
    marginTop: 20,
    backgroundColor: '#AF1123',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 40,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  btnText1: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});
