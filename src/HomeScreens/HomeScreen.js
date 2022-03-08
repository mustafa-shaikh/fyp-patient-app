import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {accountService} from '../_services/account.service';
const ListView = ({title, value, white}) => {
  return (
    <View style={styles.View1_sub_con}>
      <Text style={[styles.View1_subtxt1, white ? {color: '#fff'} : null]}>
        {title}
      </Text>
      <Text style={[styles.View1_subtxt2, white ? {color: '#fff'} : null]}>
        {value}
      </Text>
    </View>
  );
};
const CaseView = ({item}) => {
  return (
    <View style={[styles.headerContent, {backgroundColor: '#fff'}]}>
      <View
        style={[
          styles.paddingHeader,
          styles.headerColor,
          {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            backgroundColor:
              item.caseStatus == 'new'
                ? 'green'
                : item.caseStatus == 'pending'
                ? 'grey'
                : item.caseStatus == 'closed'
                ? 'red'
                : 'blue',
          },
        ]}>
        <Text style={[styles.View1_subtxt1, {width: '85%'}]}>
          {item.caseStatus}
        </Text>
      </View>
      <View style={[styles.paddingbody, {flexDirection: 'row'}]}>
        <View style={{width: '100%', justifyContent: 'center'}}>
          <ListView title="Subject" value={item.caseSubject} />
          <ListView title="Type" value={item.caseType} />
        </View>
      </View>
      {item.assignedTo ? (
        <View style={[styles.paddingbody, {flexDirection: 'row'}]}>
          <View style={{width: '100%', justifyContent: 'center'}}>
            {/* <ListView title="Type" value={item.caseType} /> */}
            <Text
              style={[
                {
                  fontSize: 18,
                  alignSelf: 'flex-start',
                  color: 'black',
                  marginLeft: '-5%',
                },
              ]}>
              Paralegal:
            </Text>
            <ListView
              title="Name"
              value={item.assignedTo.firstName + ' ' + item.assignedTo.lastName}
            />
            <ListView title="Email" value={item.assignedTo.email} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const UpdateCaseView = ({headerTitle}) => {
  return (
    <View style={[styles.headerContent, styles.headerColor]}>
      <View style={[styles.paddingbody, {flexDirection: 'row'}]}>
        <View style={{width: '75%', justifyContent: 'center'}}>
          <Text style={styles.textStyle}>Case Name/Title</Text>
        </View>
        <View style={{width: '25%', flexDirection: 'row-reverse'}}>
          <Image
            style={styles.userimg}
            source={require('../../assets/profile1.png')}
          />
        </View>
      </View>
      <View
        style={[
          styles.paddingHeader,
          {flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 10},
        ]}>
        <Text style={[styles.View1_subtxt1, {width: '90%', color: '#00ad57'}]}>
          Fill more details
        </Text>
        <View style={styles.yellowDot}></View>
        <View style={styles.yellowDot}></View>
      </View>
    </View>
  );
};

const HomeScreen = ({navigation, route}) => {
  const [cases, setCases] = useState([]);
  const user = route.params ? route.params.user : accountService.userValue;

  // useEffect(() => {
  //   accountService.getAllCases(user?.id).then(x => setCases(x));
  // }, []);
  return cases.length == 0 ? (
    <View style={styles.container}>
      <View
        style={[
          styles.headerContent,
          styles.paddingGlobal,
          styles.headerColor,
        ]}>
        <Text style={[styles.textStyle, {color: 'white'}]}>
          {'Hi! ' + user?.firstName + ' ' + user?.lastName}
        </Text>
      </View>
      <View style={[{alignItems: 'center', paddingTop: 250}]}>
        <Text style={[{color: 'blue'}]}>Doctors not available in your area!</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View
        style={[
          styles.headerContent,
          styles.paddingGlobal,
          styles.headerColor,
        ]}>
        <Text style={[styles.textStyle, {color: 'white'}]}>
          {'Hi! ' + user?.firstName + ' ' + user?.lastName}
        </Text>
        {/* <ListView title="Total Cases" value={26} white={true} />
          <ListView title="Cancel Cases" value={`${2}/${26}`} white={true} />
          <ListView title="Pending Cases" value={`${22}/${26}`} white={true} />
          <ListView title="Approved Cases" value={`${2}/${26}`} white={true} /> */}
      </View>
      <View style={styles.container}>
        <FlatList
          data={cases}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CasesScreen', {
                  caseId: item.id,
                })
              }>
              <CaseView item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
      {/* </ScrollView> */}
      {/* <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddScreen')}>
        <AntDesign
          name="plus"
          style={styles.icon}
          size={(Dimensions.get('window').height + Dimensions.get('window').width) / 32}
          color="#fff"
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  headerContent: {
    minHeight: hp('10%'),
    maxHeight: hp('50%'),
    margin: '2%',
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#00ad57',
  },
  paddingGlobal: {
    paddingVertical: '5%',
    paddingHorizontal: '7%',
  },
  textStyle: {
    color:"black",
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp('2.8'),
    textTransform: 'capitalize',
  },
  View1_sub_con: {
    marginTop: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  View1_subtxt1: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 84,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  View1_subtxt2: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 84,
    fontFamily: 'Montserrat-Bold',
    color:"black",
  },
  line: {
    marginVertical: 10,
    borderWidth: 0.42,
    borderTopColor: '#00ad57',
  },
  paddingHeader: {
    paddingHorizontal: '7%',
    paddingVertical: '3.5%',
  },
  paddingbody: {
    paddingHorizontal: '7%',
    paddingVertical: '2%',
  },
  userimg: {
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: 10000,
    resizeMode: 'cover',
  },
  redDot: {
    borderRadius: 10000,
    height: hp('2%'),
    width: hp('2%'),
    marginLeft: 5,
    backgroundColor: 'red',
  },
  yellowDot: {
    borderRadius: 10000,
    height: hp('2%'),
    width: hp('2%'),
    marginLeft: 5,
    backgroundColor: 'orange',
  },
  new: {
    backgroundColor: 'blue',
    backgroundColor: 'red',
    backgroundColor: 'green',
    backgroundColor: 'gray',
  },
  addButton: {
    backgroundColor: '#00ad57',
    width: hp('8%'),
    height: hp('8%'),
    borderRadius: 10000,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#1a1a1a',
  },
  icon: {
    justifyContent: 'center',
  },
  seeall: {
    fontSize: hp('2%'),
    width: '48.5%',
    textAlign: 'right',
    color: 'rgb(85,204,212)',
  },
  text1: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgb(104,111,140)',
  },
  subheading: {
    fontSize: hp('2%'),
    width: '50%',
    textAlign: 'left',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default HomeScreen;
