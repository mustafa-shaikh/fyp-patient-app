import React, { useEffect, useState } from 'react';
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
import { color } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { accountService } from '../_services/account.service';
const ListView = ({ title, value, white }) => {
  return (
    <View style={styles.View1_sub_con}>
      <Text style={[styles.View1_subtxt1, white ? { color: '#fff' } : null]}>
        {title}
      </Text>
      <Text style={[styles.View1_subtxt2, white ? { color: '#fff' } : null]}>
        {value}
      </Text>
    </View>
  );
};
const CaseView = ({ item }) => {
  return (
    <View style={[styles.headerContent, { backgroundColor: '#fff' }]}>
      <View
        style={[
          styles.paddingHeader,
          styles.headerColor,
          {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            backgroundColor:
              item.doctorstatus == 'authorized' ? '#363842' : '#6b03fc',
          },
        ]}>
        <Text
          style={[
            styles.View1_subtxt1,
            {
              color: 'white',
              width: '85%',
              fontSize:
                (Dimensions.get('window').height +
                  Dimensions.get('window').width) /
                65,
            },
          ]}>
          {item.firstName + ' ' + item.lastName}
        </Text>
      </View>
      <View style={[styles.paddingbody, { flexDirection: 'row' }]}>
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <ListView title="Title" value={item.title} />
          <ListView title="City" value={item.city} />
          <ListView title="Contact" value={item.email} />
        </View>
      </View>
      {item.assignedTo ? (
        <View style={[styles.paddingbody, { flexDirection: 'row' }]}>
          <View style={{ width: '100%', justifyContent: 'center' }}>
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

const LinkedDoctorsScreen = ({ navigation, route }) => {
  const [doctors, setDoctors] = useState([]);
  const hospitalId = route.params.hospitalId;

  useEffect(() => {
    accountService.getCaseById(hospitalId).then(x => {

      setDoctors(x.requests);
    });
  }, [route]);
  return doctors.length == 0 ? (
    <View style={styles.container}>
      <View style={[{ alignItems: 'center', paddingTop: 250 }]}>
        <Text style={[{ color: 'blue' }]}>
          No doctors available in your area!
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <FlatList
          data={doctors}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CasesScreen', {
                  doctorId: item,
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
    minHeight: hp('8%'),
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
    color: 'black',
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
    textTransform: 'capitalize',
  },
  View1_subtxt2: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 84,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
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
export default LinkedDoctorsScreen;
