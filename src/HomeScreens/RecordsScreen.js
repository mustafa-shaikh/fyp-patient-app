import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import uploadDropBoxFile from '../Components/uploadToBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { accountService } from '../_services/account.service';

import { myAsyncPDFFunction } from '../Components/imageToPdf';

import DocumentPicker from 'react-native-document-picker';

const CasesScreen = props => {
  const [onScreenLoad, setOnScreenLoad] = useState(true);
  const [cases, setCase] = useState(null);
  const [docUpdate, setDocUpdate] = useState(false);
  const user = accountService.userValue;

  useEffect(() => {
    // accountService.getCaseById(props.route.params.caseId).then(x => {
    //   x.requiredDocuments = x.typeList.requiredDocuments.map(a => ({
    //     ...x.requiredDocuments.find(p => a.documentTitle === p.documentTitle),
    //     ...a,
    //   }));
    //   setCase(x);
    //   setOnScreenLoad(false);
    //   setDocUpdate(false);
    // });
    console.log('records');
  }, [docUpdate]);

  const confirmUpload = obj => {
    Alert.alert(
      'Confirm Upload',
      'Once the file is submitted, you can not edit that. Again!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            console.log("report sending", obj);



            const formData = new FormData();
            formData.append("uri", obj.uri);
            formData.append("type", obj.type);
            formData.append("name", obj.name);

            accountService.sendReport(formData).then(x => {
              console.log("response= ", x)
            })


            // uploadDropBoxFile({
            //   path: obj.path,
            //   uri: obj.uri,
            // }).then(() => {
            //   accountService.updateCase(
            //     obj.caseId,
            //     (params = {
            //       documentTitle: obj.name,
            //       documentPath: obj.path,
            //       documentStatus: 'submitted',
            //     }),
            //   );
            //   Alert.alert('Success', 'File Uploaded Successfully');
            //   setDocUpdate(true);
            // });
          },
        },
      ],
    );
  };

  const selectOneFile = async obj => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf]
      }).then(res => {
        obj.uri = res[0].uri;
        confirmUpload(obj);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Upload Failed');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const Item = ({ item }) => (
    <View style={styles.OptionGroup}>
      <Text style={[styles.titleStyle]}>
        {item.documentTitle[0].toUpperCase() + item.documentTitle.slice(1)}
      </Text>
      {item.documentStatus != 'submitted' ? (
        <>
          <TouchableOpacity
            onPress={() => {
              selectOneFile({
                type: 'image',
                name: item.documentTitle,
                caseId: cases.id,
                path:
                  '/' +
                  user.email.substring(0, user.email.lastIndexOf('@')) +
                  '_' +
                  cases.id.slice(-6) +
                  '_' +
                  cases.caseType +
                  '/' +
                  item.documentTitle +
                  '.pdf',
              });
            }}>
            <Text
              style={[
                styles.textField1,
                { textDecorationLine: 'underline', color: 'green' },
              ]}>
              Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectOneFile({
                type: 'pdf',
                name: item.documentTitle,
                caseId: cases.id,
                path:
                  '/' +
                  user.email.substring(0, user.email.lastIndexOf('@')) +
                  '_' +
                  cases.id.slice(-6) +
                  '_' +
                  cases.caseType +
                  '/' +
                  item.documentTitle +
                  '.pdf',
              });
            }}>
            <Text
              style={[
                styles.textField1,
                { textDecorationLine: 'underline', color: 'green' },
              ]}>
              Pdf
            </Text>
          </TouchableOpacity>
          <Text style={[{ color: 'blue' }]}>
            Description:{item.documentComment}
          </Text>
        </>
      ) : (
        <Text style={[styles.textField]}>{item.documentStatus}</Text>
      )}
    </View>
  );

  const Item2 = ({ item }) => (
    <View style={styles.OptionGroup}>
      {/* <Text style={[styles.titleStyle]}>
        {item.documentTitle[0].toUpperCase() + item.documentTitle.slice(1)}
      </Text> */}

      <TouchableOpacity
        onPress={() => {
          selectOneFile({
            type: 'image',
            name: item.documentTitle,
            caseId: cases.id,
            path:
              '/' +
              user.email.substring(0, user.email.lastIndexOf('@')) +
              '_' +
              cases.id.slice(-6) +
              '_' +
              cases.caseType +
              '/' +
              item.documentTitle +
              '.pdf',
          });
        }}>
        <Text
          style={[
            styles.textField1,
            { textDecorationLine: 'underline', color: 'green' },
          ]}>
          Image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          selectOneFile({
            type: 'pdf',
            name: item.documentTitle,
            caseId: cases.id,
            path:
              '/' +
              user.email.substring(0, user.email.lastIndexOf('@')) +
              '_' +
              cases.id.slice(-6) +
              '_' +
              cases.caseType +
              '/' +
              item.documentTitle +
              '.pdf',
          });
        }}>
        <Text
          style={[
            styles.textField1,
            { textDecorationLine: 'underline', color: 'green' },
          ]}>
          Pdf
        </Text>
      </TouchableOpacity>
      <Text style={[{ color: 'blue' }]}>
        Description:{item.documentComment}
      </Text>
    </View>
  );

  const Item1 = ({ item }) => (
    <View style={styles.OptionGroup}>
      <Text style={[styles.titleStyle]}>
        {item.title[0].toUpperCase() + item.title.slice(1)}
      </Text>
      <Text style={[styles.textField]}>{item.text}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;
  const renderItem1 = ({ item }) => <Item1 item={item} />;

  const { navigation } = props;
  return (

    <View>
      <Text>
        Mustafa
      </Text>
      <Text>
        Mustafa
      </Text>
      <Text>
        Mustafa
      </Text>
      <Text>
        Mustafa
      </Text>
      <Text>
        Mustafa
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          selectOneFile({
            type: 'pdf',
            name: "report.pdf",
            // caseId: cases.id,
            path:
              'record' +
              // user.email.substring(0, user.email.lastIndexOf('@')) +
              // '_' +
              // cases.id.slice(-6) +
              // '_' +
              // cases.caseType +
              // '/' +
              // item.documentTitle +
              '.pdf',
          });
        }}>
        <Icon
          name="home"
          style={styles.icon}
          size={
            (Dimensions.get('window').height + Dimensions.get('window').width) /
            32
          }
          color="#fff"
        />
        {/* <Text
              style={[
                styles.textField1,
                { textDecorationLine: 'underline', color: 'green' },
              ]}>
              Pdf
            </Text> */}
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Diagnose')}>
        <Icon
          name="home"
          style={styles.icon}
          size={
            (Dimensions.get('window').height + Dimensions.get('window').width) /
            32
          }
          color="#fff"
        />
      </TouchableOpacity> */}
    </View>
    // <View style={styles.container}>
    //   {onScreenLoad ? (
    //     <View style={{justifyContent: 'center', flex: 1}}>
    //       <ActivityIndicator size="large" color="#00ad57" />
    //     </View>
    //   ) : (
    //     <>
    //       <View
    //         style={[
    //           styles.smallContainer,
    //           {
    //             height:
    //               (Dimensions.get('window').height +
    //                 Dimensions.get('window').width) /
    //               5,
    //           },
    //         ]}>
    //         <Text style={[styles.title]}>Details:</Text>
    //         <View style={styles.OptionGroup}>
    //           <Text style={[styles.titleStyle]}>Subject</Text>
    //           <Text style={[styles.textField]}>{cases.caseSubject}</Text>
    //         </View>
    //         <View style={styles.OptionGroup}>
    //           <Text style={[styles.titleStyle]}>Type</Text>
    //           <Text style={[styles.textField]}>{cases.caseType}</Text>
    //         </View>
    //         <View style={styles.OptionGroup}>
    //           <Text style={[styles.titleStyle]}>Status</Text>
    //           <Text style={[styles.textField]}>{cases.caseStatus}</Text>
    //         </View>
    //         <View style={styles.OptionGroup}>
    //           <Text style={[styles.titleStyle]}>Updated</Text>
    //           <Text style={[styles.textField]}>
    //             {moment(cases.updated).format('DD MMMM YYYY , HH : MM A')}
    //           </Text>
    //         </View>
    //         {cases.caseStatus == 'new' ? (
    //           <View style={styles.OptionGroup1}>
    //             <Text style={[styles.titleStyle]}>
    //               In Citizenship and Immigration Services
    //             </Text>
    //             <TouchableOpacity
    //               onPress={() => {
    //                 const msg = 'https://egov.uscis.gov/casestatus/landing.do';
    //                 navigation.navigate('WebScreen', {
    //                   msg: msg,
    //                 });
    //               }}>
    //               <Text
    //                 style={[
    //                   styles.textField,
    //                   {textDecorationLine: 'underline', color: 'green'},
    //                 ]}>
    //                 Review the application status here:
    //               </Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //               onPress={() => {
    //                 const msg = 'https://egov.uscis.gov/processing-times/';
    //                 navigation.navigate('WebScreen', {
    //                   msg: msg,
    //                 });
    //               }}>
    //               <Text
    //                 style={[
    //                   styles.textField,
    //                   {textDecorationLine: 'underline', color: 'green'},
    //                 ]}>
    //                 Review processing times here:
    //               </Text>
    //             </TouchableOpacity>
    //           </View>
    //         ) : cases.caseStatus == 'pending' ? (
    //           <View style={styles.OptionGroup1}>
    //             <Text style={[styles.titleStyle]}>In Immigration Court</Text>
    //             <TouchableOpacity
    //               onPress={() => {
    //                 const msg =
    //                   'https://portal.eoir.justice.gov/InfoSystem/Form?Language=EN';
    //                 navigation.navigate('WebScreen', {
    //                   msg: msg,
    //                 });
    //               }}>
    //               <Text
    //                 style={[
    //                   styles.textField,
    //                   {textDecorationLine: 'underline', color: 'green'},
    //                 ]}>
    //                 Check Hearings Information here:
    //               </Text>
    //             </TouchableOpacity>
    //           </View>
    //         ) : cases.caseStatus == 'processing' ? (
    //           <View style={styles.OptionGroup1}>
    //             <Text style={[styles.titleStyle]}>In National Visa Center</Text>
    //             <TouchableOpacity
    //               onPress={() => {
    //                 const msg = 'https://ceac.state.gov/IV/Login.aspx';
    //                 navigation.navigate('WebScreen', {
    //                   msg: msg,
    //                 });
    //               }}>
    //               <Text
    //                 style={[
    //                   styles.textField,
    //                   {textDecorationLine: 'underline', color: 'green'},
    //                 ]}>
    //                 Access your case information here:
    //               </Text>
    //             </TouchableOpacity>
    //           </View>
    //         ) : (
    //           <View style={styles.OptionGroup1}>
    //             <Text style={[styles.titleStyle]}>Stage</Text>
    //             <Text style={[styles.textField]}>
    //               Please review In-Office Stages in progress bar
    //             </Text>
    //           </View>
    //         )}
    //       </View>
    //       {cases.assignedTo ? (
    //         <View
    //           style={[
    //             styles.smallContainer,
    //             {
    //               height:
    //                 (Dimensions.get('window').height +
    //                   Dimensions.get('window').width) /
    //                 7.5,
    //             },
    //           ]}>
    //           <Text style={[styles.title]}>Paralegal:</Text>
    //           <View style={styles.OptionGroup}>
    //             <Text style={[styles.titleStyle]}>Name</Text>
    //             <Text style={[styles.textField]}>
    //               {cases.assignedTo.firstName + ' ' + cases.assignedTo.lastName}
    //             </Text>
    //           </View>
    //           <View style={styles.OptionGroup}>
    //             <Text style={[styles.titleStyle]}>Email</Text>
    //             <Text style={[styles.textField]}>{cases.assignedTo.email}</Text>
    //           </View>
    //           <View style={styles.OptionGroup}>
    //             <Text style={[styles.titleStyle]}>City</Text>
    //             <Text style={[styles.textField]}>{cases.assignedTo.city}</Text>
    //           </View>
    //           <View style={styles.OptionGroup}>
    //             <Text style={[styles.titleStyle]}>Status</Text>
    //             <Text style={[styles.textField]}>
    //               {cases.assignedTo.lawyerStatus}
    //             </Text>
    //           </View>
    //         </View>
    //       ) : null}
    //       {cases.requiredDocuments ? (
    //         <View style={[styles.smallContainer]}>
    //           <Text style={[styles.title]}>Documents:</Text>
    //           {
    //             <FlatList
    //               data={cases.requiredDocuments}
    //               extraData={docUpdate}
    //               renderItem={renderItem}
    //             />
    //           }
    //         </View>
    //       ) : null}
    //       {cases.statusMessages ? (
    //         <View style={[styles.smallContainer]}>
    //           <Text style={[styles.title]}>Case Progress:</Text>
    //           {
    //             <FlatList
    //               data={cases.statusMessages}
    //               extraData={docUpdate}
    //               renderItem={renderItem1}
    //             />
    //           }
    //         </View>
    //       ) : (
    //         <View>
    //           <Item2 />
    //         </View>
    //       )}
    //     </>
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  smallContainer: {
    borderColor: 'grey',
    borderWidth: 0.2,
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 7,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    alignItems: 'flex-start',
  },
  btnParentSection: {
    height: 50,
    // borderRadius: 30,
    // backgroundColor:"pink",
    // borderWidth:1,
    // borderColor:'#00ad57',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
  },
  btnSection: {
    width: 125,
    height: 35,
    // marginTop: 20,
    backgroundColor: '#2e29cc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // marginLeft: 15,
  },
  textStyles: {
    // marginTop: 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  addButton: {
    backgroundColor: '#00ad57',
    width: hp('8%'),
    height: hp('8%'),
    borderRadius: 10000,
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#1a1a1a',
  },

  headingStyles: {
    // marginTop: 2,
    paddingVertical: 7,
    backgroundColor: '#00ad57',
    color: 'white',
    width: '50%',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  OptionGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  OptionGroup1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    backgroundColor: '#00ad57',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 40,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 12,
    borderRadius: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 100,
    marginTop: '1%',
    color: 'white',
    elevation: 10,
  },
  textField: {
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 40,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 4,
    borderRadius: 10000,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    paddingLeft: 15,
    marginTop: '1%',
    elevation: 10,
    color: 'black',
    // marginBottom: '2%',
  },
  textField1: {
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 40,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 9.3,
    borderRadius: 10000,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    paddingLeft: 15,
    marginTop: '1%',
    elevation: 10,
    marginBottom: '5%',
    marginRight: '5%',
    color: 'black',
  },
});
export default CasesScreen;
