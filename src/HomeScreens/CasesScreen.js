import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  Alert,
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

const ScheduleButton = ({ item, doctorId, patientId }) => {
  return (
    <View style={{ marginBottom: "2%" }}>

      <TouchableOpacity
        onPress={() => {

          Alert.alert(
            'Confirm Booking',
            'You payment will be deducted from the account!',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress: () => {
                  console.log('Confirm Pressed')
                  accountService.createAppointment({ time: item, doctorId: doctorId, patientId: patientId }).then(
                    x => {
                      console.log(x)
                    }
                  )

                },
                style: 'confirm'
                // onPress: () => {
                //     uploadDropBoxFile({
                //         path: obj.path,
                //         uri: obj.uri,
                //     }).then(() => {
                //         accountService.updateCase(
                //             obj.caseId,
                //             (params = {
                //                 documentTitle: obj.name,
                //                 documentPath: obj.path,
                //                 documentStatus: 'submitted',
                //             }),
                //         );
                //         Alert.alert('Success', 'File Uploaded Successfully');
                //         setDocUpdate(true);
                //     });
                // },
              },
            ],
          );

        }
        }>
        <View style={styles.button}>
          <Text style={styles.text}>{item}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CaseView = ({ itemSchedule, itemData, doctorId, patientId }) => {
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
            backgroundColor: '#363842',
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

          {itemData}
        </Text>
      </View>
      <View style={[styles.paddingbody]}>
        <View style={{ width: '100%', justifyContent: "center" }}>
          <FlatList
            data={Object.keys(itemSchedule)}
            renderItem={({ item }) => (
              <ScheduleButton item={itemSchedule[item]} doctorId={doctorId} patientId={patientId} />
            )}
          />
        </View>
      </View>
      {itemSchedule.assignedTo ? (
        <View style={[styles.paddingbody]}>
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
              value={itemSchedule.assignedTo.firstName + ' ' + itemSchedule.assignedTo.lastName}
            />
            <ListView title="Email" value={itemSchedule.assignedTo.email} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const CasesScreen = ({ navigation, route }) => {
  const [doctors, setDoctors] = useState(route.params.doctorId);
  const user = accountService.userValue;
  // const [patientId, setPatient] = useState(route.params.doctorId);
  // const hospitalId = route.params.hospitalId;

  useEffect(() => {
    // accountService.getCaseById(hospitalId).then(x => {
    //   
    // });
    setDoctors(route.params.doctorId);
  }, [route]);
  return Object.keys(doctors.schedule).length == 0 ? (
    <View style={styles.container}>
      <View style={[{ alignItems: 'center', paddingTop: 250 }]}>
        <Text style={[{ color: 'blue' }]}>
          No schedule available
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container}>

        <FlatList
          data={Object.keys(doctors.schedule)}
          renderItem={({ item }) => (

            <CaseView itemSchedule={doctors.schedule[item]} itemData={item} doctorId={doctors.id} patientId={user.id} />

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
    // maxHeight: hp('80%'),
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
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: '7%',
    paddingVertical: '3%',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default CasesScreen;
