import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function StudentProfileVerificationform(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props?.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props?.tabToCloseModal();
      }}>
      <TouchableWithoutFeedback onPress={()=>props?.tabToCloseModal()}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <View style={{paddingBottom:'5%', borderBottomColor:"rgb(104,111,140)", borderBottomWidth:1, alignItems:'center'}}>
            <Text>Select {props?.modalTitle}</Text>
          </View>
          {
            props?.list?.map((item,index)=>{
              return (
                <Text
                  key={index}
                  onPress={() => {
                    props?.setData(item);
                    props?.tabToCloseModal();
                  }}
                  style={[styles.modalText,{marginTop:'6%'}]}
                >
                  {item}
                </Text>
              )
            })
          }
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#ffffffaa',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  modalView: {
    width: Dimensions.get('window').width/1.5,
    backgroundColor: 'white',
    padding: '10%',
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 84,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(104,111,140,1)',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffffaa',
  },
});

export default StudentProfileVerificationform;