import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import VerificationformInput from '../Components/vf_input';
// import SimpleHeader from '../Components/BackHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CaseSubjectModal from '../Components/ModalView';
import CaseTypeModal from '../Components/ModalView';
import { accountService } from '../_services/account.service';

function StudentProfileVerificationform({ navigation, route }) {
  const user = accountService.userValue;
  const [data, setData] = useState({
    createdBy: user.id,
    caseSubject: '',
    caseType: "",
    caseMessage: '',
  })

  const [caseSubjectList, setCaseSubjectList] = useState([
    "Case Subject 1",
    "Case Subject 2",
    "Case Subject 3",
    "Case Subject 4",
    "Case Subject 5",
  ]);

  const [caseTypeList, setCaseTypeList] = useState([
    "case Type 1",
    "case Type 2",
    "case Type 3",
    "case Type 4",
    "case Type 5",
  ]);

  const [modalVisible, setModalVisible] = useState({
    caseType: false,
    caseSubject: false,
  });

  const getRequest = ({navigation}) => {
    accountService.createCase(data)
      .then(
        navigation.goBack(),
      ).catch(err => {
      })
  }

  return (
    <SafeAreaView style={styles.Verificationform_con}>
      <ScrollView style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
        <View style={styles.Verificationform}>
          <VerificationformInput
            label="Case Message"
            placeholder="Hi!"
            value={data.caseMessage}
            onChange={(text) => { setData({ ...data, caseMessage: text }) }}
          // type={'numeric'}
          />
          {/* <View style={styles.choosefile}>
            <Text style={styles.choosefilelabel}>
              Case Type
            </Text>
            <View style={[styles.choosefileinput_con, { marginTop: '2%' }]}>
              <TouchableOpacity
                style={[styles.select_input2, { borderBottomWidth: 0 }]}
                onPress={() => setModalVisible({ ...modalVisible, caseType: true })}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Text style={[styles.textInputSize, { padding: 0, color: data.caseType ? 'black' : "rgba(104,111,140,0.6)" }]}>{data.caseType ? data.caseType : "Ex: Case Type"}</Text>
                  <Icondown
                    style={{ padding: 5, alignSelf: 'flex-end' }}
                    color="rgb(104,111,140)"
                    name="down"
                    size={hp('2%')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.choosefile}>
            <Text style={styles.choosefilelabel}>
              Case Subject
            </Text>
            <View style={[styles.choosefileinput_con, { marginTop: '2%' }]}>
              <TouchableOpacity
                style={[styles.select_input2, { borderBottomWidth: 0 }]}
                onPress={() => setModalVisible({ ...modalVisible, caseSubject: true })}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Text style={[styles.textInputSize, { padding: 0, color: data.caseSubject ? 'black' : "rgba(104,111,140,0.6)" }]}>{data.caseSubject ? data.caseSubject : "Ex: Case Subject"}</Text>
                  <Icondown
                    style={{ padding: 5, alignSelf: 'flex-end' }}
                    color="rgb(104,111,140)"
                    name="down"
                    size={hp('2%')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
          <VerificationformInput
            label="Case Type"
            placeholder="Type"
            value={data.caseType}
            onChange={(text) => { setData({ ...data, caseType: text }) }}
          // type={'numeric'}
          />
          <VerificationformInput
            label="Case Subject"
            placeholder="Subject"
            value={data.caseSubject}
            onChange={(text) => { setData({ ...data, caseSubject: text }) }}
          // type={'numeric'}
          />
          <TouchableOpacity style={styles.submit_btn} onPress={() => getRequest({ navigation})}>
            <Text style={styles.btntxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <CaseSubjectModal
        visible={modalVisible.caseSubject}
        tabToCloseModal={() => setModalVisible({ ...modalVisible, caseSubject: false })}
        list={caseSubjectList}
        setData={select => setData({ ...data, caseSubject: select })}
      />

      <CaseTypeModal
        visible={modalVisible.caseType}
        tabToCloseModal={() => setModalVisible({ ...modalVisible, caseType: false })}
        list={caseTypeList}
        setData={select => setData({ ...data, caseType: select })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Verificationform_con: {
    flex: 1,
  },

  Verificationform: {
    flex: 2,
    padding: '5%',
    paddingTop: '5%',
  },

  dob: {
    marginBottom: hp('1%'),
    display: 'flex',
    padding: '2%',
    borderBottomColor: 'rgba(104,111,140,0.4)',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  dobFont: {
    fontSize: hp('1.8%'),
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(104,111,140,1)',
  },

  select_con: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '3%',
    padding: '2%',
  },

  select_subcon2: {
    width: '50%',
  },
  select_subcon3: {
    width: '50%',
  },
  select_labeltxt: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 90,
    color: 'rgba(104,111,140,1)',
    fontFamily: 'Montserrat-SemiBold',
  },
  select_input1: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 90,
    fontFamily: 'Montserrat-SemiBold',
    borderBottomColor: 'rgba(104,111,140,0.4)',
    borderBottomWidth: 1,
    paddingBottom: '-1%',
    paddingLeft: '-2%',
    paddingTop: '1%',
    marginRight: '50%',
  },
  select_input2: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 90,
    fontFamily: 'Montserrat-SemiBold',
    borderBottomColor: 'rgba(104,111,140,0.4)',
    borderBottomWidth: 1,
    paddingBottom: '-1%',
    paddingLeft: '-2%',
    paddingTop: '1%',
    marginRight: '10%',
  },
  select_input3: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 90,
    fontFamily: 'Montserrat-SemiBold',
    borderBottomColor: 'rgba(104,111,140,0.4)',
    borderBottomWidth: 1,
    paddingBottom: '-1%',
    paddingLeft: '-2%',
    paddingTop: '1%',
    marginRight: '10%',
  },
  choosefile: {
    display: 'flex',
    marginBottom: '3%',
    padding: '2%',
  },
  choosefilelabel: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 96,
    color: 'rgba(104,111,140,1)',
    fontFamily: 'Montserrat-SemiBold',
  },
  choosefileinput_con: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(104,111,140,0.4)',
    borderBottomWidth: 1,
  },
  vfinput_con: {
    display: 'flex',
    marginBottom: hp('1%'),
    padding: '2%'

  },
  label: {
    fontSize: hp('1.8%'),
    color: 'rgba(104,111,140,1)',
    fontFamily: 'Montserrat-SemiBold',

  },
  fontSize2: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 96,
  },
  textInputSize: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 96,
    fontFamily: 'Montserrat-SemiBold',
    width: Dimensions.get('window').width / 1.25,
    color: 'black'
  },
  choosefileinput: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 96,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: '-1%',
    paddingLeft: '-2%',
    paddingTop: '3%',
    width: Dimensions.get('window').width / 1.25,
  },
  choosefileicon: {
    marginTop: 10,
    flexDirection: 'row',
  },
  agree_con: {
    display: 'flex',
    flexDirection: 'row',
  },

  txt: {
    flexDirection: 'row',
    marginLeft: '0%',
  },
  agree_Textblack: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 112,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(104,111,140,0.4)',
  },
  agree_Textorange: {
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 112,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(254,141,123,1)',
  },
  submit_btn: {
    marginTop: '7%',
    padding: '3.5%',
    borderRadius: 10,
    backgroundColor: '#00ad57'
  },
  btntxt: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 84,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: '#ffffffaa',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  modalView: {
    width: Dimensions.get('window').width / 1.5,
    backgroundColor: 'white',
    padding: '10%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 84,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(104,111,140,1)',
  },

  // Checkbox

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
});

export default StudentProfileVerificationform;