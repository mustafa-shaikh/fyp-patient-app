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
import { CandlestickChart } from 'react-native-wagmi-charts';
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

  const [renderData, setRenderData] = useState(null);
  const user = accountService.userValue;
  const data = [
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11
    }
  ]

  const [userData, setUserData] = useState(user);

  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push({
        timestamp: currentValue.date,

        low: currentValue.testResult < currentValue.normalRange0 ? currentValue.normalRange0 : currentValue.testResult,
        high: currentValue.testResult > currentValue.normalRange1 ? currentValue.normalRange1 : currentValue.testResult,
        open: currentValue.testResult,
        close: currentValue.testResult,
      }
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  useEffect(() => {

    // accountService.getCaseById(props.route.params.caseId).then(x => {
    //   x.requiredDocuments = x.typeList.requiredDocuments.map(a => ({
    //     ...x.requiredDocuments.find(p => a.documentTitle === p.documentTitle),
    //     ...a,
    //   }));
    //   setCase(x);
    //   setOnScreenLoad(false);
    setDocUpdate(false);
    // });

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
            console.log("report sending");
            console.log("obj name ", obj.name)
            accountService.sendReport({ name: obj.name }).then(x => {
              setUserData(x);
              setDocUpdate(true)
            })
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
        obj.type = res[0].type;
        obj.size = res[0].size;
        obj.name = res[0].name;
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

  const ReportDialogue = ({ item, itemName }) => {
    return (
      <View>
        {/* {console.log(item)} */}
        <Text style={styles.textField}>{itemName}</Text>

        <CandlestickChart.Provider data={item}>
          <CandlestickChart>
            <CandlestickChart.Candles />
            <CandlestickChart.Tooltip />
            <CandlestickChart.Crosshair />
          </CandlestickChart>
          {/* <CandlestickChart.DatetimeText /> */}
        </CandlestickChart.Provider>

      </View>
    )
  }

  const { navigation } = props;
  return (

    <View>
      {/* {console.log("okay0", userData.reports)} */}
      {renderData == null && userData.reports ? setRenderData(groupBy(userData.reports, "testName")) : null}
      {renderData ? (
        <View style={[styles.smallContainer]}>
          {/* {console.log("okay1", renderData)} */}
          <ScrollView>
            {
              < FlatList
                data={Object.keys(renderData)}
                extraData={docUpdate}
                renderItem={({ item }) => (
                  <ReportDialogue item={renderData[item]} itemName={item} />
                )}
              />
            }

          </ScrollView>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          selectOneFile({
            // type: 'pdf',
            name: 'report_' + user.id + '.pdf',
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  smallContainer: {
    backgroundColor: "white",
    paddingTop: "10%",
    borderColor: 'grey',
    borderWidth: 0.2,
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 1.7,
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSection: {
    width: 125,
    height: 35,
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
    backgroundColor: '#00ad57',
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
