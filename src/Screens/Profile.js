import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {color} from 'react-native-reanimated';
import {accountService} from '../_services/account.service';

const Profile = ({navigation, route}) => {
  
  const user = route.params.user;

  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setData(user);
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{uri: data.imageUrl}} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>
            {data.firstName} {data.lastName}
          </Text>
          <Text style={styles.headings}>Name</Text>
          <Text style={styles.info}>{data.address}</Text>
          <Text style={styles.headings}>Address</Text>
          <Text style={styles.info}>{data.city}</Text>
          <Text style={styles.headings}>city</Text>
          <Text style={styles.info}>{data.clientStatus}</Text>
          <Text style={styles.headings}>status</Text>
          <Text style={styles.info}>{data.phone}</Text>
          <Text style={styles.headings}>phone</Text>
          <Text style={styles.info}>{data.email}</Text>
          <Text style={styles.headings}>email</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation?.navigate('Update');
            }}>
            <Text style={{color: 'white'}}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00ad57',
    height: 200,
  },
  container: {
    backgroundColor:'white',
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
    // flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  info: {
    fontSize: 16,
    color: '#00ad57',
    marginTop: 10,
    textTransform: 'capitalize',
  },
  headings: {
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00ad57',
  },
});
