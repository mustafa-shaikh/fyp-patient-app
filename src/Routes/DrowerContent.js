import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {accountService} from '../_services/account.service';
export function DrawerContent(props) {
  const {navigation} = props;
  const [currentActiveState, setCorrentState] = useState(0);
  const [list, setList] = useState([
    {title: 'E-Health', selected: true},
    {title: 'Diagnose', selected: false},
    {title:"Records", selected:false},
    // {title:"Laywer", selected:false},
    // {title: 'Payment', selected: false},
    // {title: 'Cerenada', selected: false},
    // {title:"Contact Us", selected:false},
    {title: 'Sign Out', selected: false},
  ]);

  const user = accountService.userValue;
  
  const getRequest = ({navigation}) => {
    accountService.signOut().then((x) => {
      navigation.navigate('SignIn');
    });
  };
  const CustomButton = ({selected, title, onChange}) => {
    return (
      <TouchableOpacity
        style={[styles.globalheight, {flexDirection: 'row'}]}
        onPress={() => {
          onChange();
          title == 'Sign Out'
            ? getRequest({navigation})
            : navigation?.navigate(title, {user} );
        }}>
        <View
          style={[
            {
              height: '100%',
              backgroundColor: !selected ? '#1a1a1a' : '#00ad57',
              width: '2%',
            },
          ]}></View>
        <Text style={styles.buttontxt}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const updateFieldChanged = index => e => {
    let newArr = [...list];
    newArr[index] = {...newArr[index], selected: true};
    newArr[currentActiveState] = {
      ...newArr[currentActiveState],
      selected: false,
    };
    setCorrentState(index);
    setList(newArr);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('Profile', {user});
        }}>
        <View style={styles.profileBody}>
          <Image style={styles.userimg} source={{uri: `${user?.imageUrl}`}} />
          <Text style={styles.profileTitle}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.body}>
        {list.map((item, index) => {
          return (
            <CustomButton
              key={index}
              selected={item.selected}
              title={item.title}
              onChange={updateFieldChanged(index)}
            />
          );
        })}
        {/* <CustomButton selected={false}/>
        <CustomButton selected={false}/>
        <CustomButton selected={false}/> */}
        {/* <CustomButton/>
        <CustomButton/> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    // backgroundColor:'rgb(255,255,255)'
  },
  profileBody: {
    paddingHorizontal: '3%',
    paddingVertical: '7%',
    backgroundColor: 'rgb(233,236,239)',
    backgroundColor: '#00ad57',
  },
  body: {
    // paddingHorizontal:'10%',
    paddingVertical: '7%',
  },
  globalheight: {
    height: hp('7%'),
  },
  userimg: {
    width: hp('12%'),
    height: hp('12%'),
    borderRadius: 10000,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  profileTitle: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp('2.8'),
    marginTop: '4%',
    textAlign: 'center',
    color: '#fff',
  },
  buttontxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp('1.9'),
    // marginTop:"4%",
    paddingLeft: '10%',
    // textAlign: 'center',
    color: '#fff',
    alignSelf: 'center',
  },
});
