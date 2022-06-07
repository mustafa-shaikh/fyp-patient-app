import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { apiUrl } from '../../config';

const Symptoms = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState([
    { id: 'itching', value: 0 },
    { id: 'skin_rash', value: 0 },
    { id: 'nodal_skin_eruptions', value: 0 },
    { id: 'continuous_sneezing', value: 0 },
    { id: 'shivering', value: 0 },
    { id: 'chills', value: 0 },
    { id: 'joint_pain', value: 0 },
    { id: 'stomach_pain', value: 0 },
    { id: 'acidity', value: 0 },
    { id: 'ulcers_on_tongue', value: 0 },
    { id: 'muscle_wasting', value: 0 },
    { id: 'vomiting', value: 0 },
    { id: 'burning_micturition', value: 0 },
    { id: 'spotting_urination', value: 0 },
    { id: 'fatigue', value: 0 },
    { id: 'weight_gain', value: 0 },
    { id: 'anxiety', value: 0 },
    { id: 'cold_hands_and_feets', value: 0 },
    { id: 'mood_swings', value: 0 },
    { id: 'weight_loss', value: 0 },
    { id: 'restlessness', value: 0 },
    { id: 'lethargy', value: 0 },
    { id: 'patches_in_throat', value: 0 },
    { id: 'irregular_sugar_level', value: 0 },
    { id: 'cough', value: 0 },
    { id: 'high_fever', value: 0 },
    { id: 'sunken_eyes', value: 0 },
    { id: 'breathlessness', value: 0 },
    { id: 'sweating', value: 0 },
    { id: 'dehydration', value: 0 },
    { id: 'indigestion', value: 0 },
    { id: 'headache', value: 0 },
    { id: 'yellowish_skin', value: 0 },
    { id: 'dark_urine', value: 0 },
    { id: 'nausea', value: 0 },
    { id: 'loss_of_appetite', value: 0 },
    { id: 'pain_behind_the_eyes', value: 0 },
    { id: 'back_pain', value: 0 },
    { id: 'constipation', value: 0 },
    { id: 'abdominal_pain', value: 0 },
    { id: 'diarrhoea', value: 0 },
    { id: 'mild_fever', value: 0 },
    { id: 'yellow_urine', value: 0 },
    { id: 'yellowing_of_eyes', value: 0 },
    { id: 'acute_liver_failure', value: 0 },
    { id: 'fluid_overload', value: 0 },
    { id: 'swelling_of_stomach', value: 0 },
    { id: 'swelled_lymph_nodes', value: 0 },
    { id: 'malaise', value: 0 },
    { id: 'blurred_and_distorted_vision', value: 0 },
    { id: 'phlegm', value: 0 },
    { id: 'throat_irritation', value: 0 },
    { id: 'redness_of_eyes', value: 0 },
    { id: 'sinus_pressure', value: 0 },
    { id: 'runny_nose', value: 0 },
    { id: 'congestion', value: 0 },
    { id: 'chest_pain', value: 0 },
    { id: 'weakness_in_limbs', value: 0 },
    { id: 'fast_heart_rate', value: 0 },
    { id: 'pain_during_bowel_movements', value: 0 },
    { id: 'pain_in_anal_region', value: 0 },
    { id: 'bloody_stool', value: 0 },
    { id: 'irritation_in_anus', value: 0 },
    { id: 'neck_pain', value: 0 },
    { id: 'dizziness', value: 0 },
    { id: 'cramps', value: 0 },
    { id: 'bruising', value: 0 },
    { id: 'obesity', value: 0 },
    { id: 'swollen_legs', value: 0 },
    { id: 'swollen_blood_vessels', value: 0 },
    { id: 'puffy_face_and_eyes', value: 0 },
    { id: 'enlarged_thyroid', value: 0 },
    { id: 'brittle_nails', value: 0 },
    { id: 'swollen_extremeties', value: 0 },
    { id: 'excessive_hunger', value: 0 },
    { id: 'extra_marital_contacts', value: 0 },
    { id: 'drying_and_tingling_lips', value: 0 },
    { id: 'slurred_speech', value: 0 },
    { id: 'knee_pain', value: 0 },
    { id: 'hip_joint_pain', value: 0 },
    { id: 'muscle_weakness', value: 0 },
    { id: 'stiff_neck', value: 0 },
    { id: 'swelling_joints', value: 0 },
    { id: 'movement_stiffness', value: 0 },
    { id: 'spinning_movements', value: 0 },
    { id: 'loss_of_balance', value: 0 },
    { id: 'unsteadiness', value: 0 },
    { id: 'weakness_of_one_body_side', value: 0 },
    { id: 'loss_of_smell', value: 0 },
    { id: 'bladder_discomfort', value: 0 },
    { id: 'foul_smell_of_urine', value: 0 },
    { id: 'continuous_feel_of_urine', value: 0 },
    { id: 'passage_of_gases', value: 0 },
    { id: 'internal_itching', value: 0 },
    { id: 'toxic_look_(typhos)', value: 0 },
    { id: 'depression', value: 0 },
    { id: 'irritability', value: 0 },
    { id: 'muscle_pain', value: 0 },
    { id: 'altered_sensorium', value: 0 },
    { id: 'red_spots_over_body', value: 0 },
    { id: 'belly_pain', value: 0 },
    { id: 'abnormal_menstruation', value: 0 },
    { id: 'dischromic_patches', value: 0 },
    { id: 'watering_from_eyes', value: 0 },
    { id: 'increased_appetite', value: 0 },
    { id: 'polyuria', value: 0 },
    { id: 'family_history', value: 0 },
    { id: 'mucoid_sputum', value: 0 },
    { id: 'rusty_sputum', value: 0 },
    { id: 'lack_of_concentration', value: 0 },
    { id: 'visual_disturbances', value: 0 },
    { id: 'receiving_blood_transfusion', value: 0 },
    { id: 'receiving_unsterile_injections', value: 0 },
    { id: 'coma', value: 0 },
    { id: 'stomach_bleeding', value: 0 },
    { id: 'distention_of_abdomen', value: 0 },
    { id: 'history_of_alcohol_consumption', value: 0 },
    { id: 'fluid_overload.1', value: 0 },
    { id: 'blood_in_sputum', value: 0 },
    { id: 'prominent_veins_on_calf', value: 0 },
    { id: 'palpitations', value: 0 },
    { id: 'painful_walking', value: 0 },
    { id: 'pus_filled_pimples', value: 0 },
    { id: 'blackheads', value: 0 },
    { id: 'scurring', value: 0 },
    { id: 'skin_peeling', value: 0 },
    { id: 'silver_like_dusting', value: 0 },
    { id: 'small_dents_in_nails', value: 0 },
    { id: 'inflammatory_nails', value: 0 },
    { id: 'blister', value: 0 },
    { id: 'red_sore_around_nose', value: 0 },
    { id: 'yellow_crust_ooze', value: 0 },
  ]);
  const renderItem = ({ item }) => <Item item={item} />;

  onChangeValue = item => {
    // console.log(symptoms);
    const newData = symptoms.map(newItem => {
      if (newItem.id == item.id) {
        // console.log(newItem);
        return {
          ...newItem,
          value: 1,
        };
      }
      return {
        ...newItem,
        value: 0,
      };
    });
    // setSymptoms(newData);
  };

  const Item = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={item.value === 0 ? false : true}
          boxType="square"
          onValueChange={
            () => {
              let ind = symptoms.indexOf(item);
              let TempArray = symptoms;
              TempArray[ind] = { ...item, value: item.value === 0 ? 1 : 0 };
              setSymptoms(TempArray);
            }
            // () => console.log(item)
            // setSymptoms({...item, value: item.value === 0 ? 1 : 0})
          }
          style={styles.checkbox}
        />
        <Text style={styles.label}>{item.id}</Text>
        {/* <Text style={styles.label}>{item.value}</Text> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Select all the symptoms you feel: </Text>
      <FlatList
        data={symptoms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        onPress={() => {
          var result = {};
          //   result = symptoms.reduce(
          //     (obj, item) => Object.assign(obj, {: item.value}),
          //     {},
          //   );
          for (var i = 0; i < symptoms.length; i++) {
            result[symptoms[i].id] = symptoms[i].value;
          }
          //   console.log('result ', sy);
          //   console.log('====================================');
          //   console.log(result);
          //   console.log('====================================');
          fetch(`${apiUrl}/check/getpred`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
          })
            .then(response => response.json())

            .then(responseJson => {
              console.log(responseJson.result);
              alert(`You have been Diagnosed with ${responseJson.result}`);
              //   if (responseJson) {
              //     // setUserData(responseJson)

              //     console.log('Response Successful', responseJson);
              //     navigation.navigate('Home');
              //   } else {
              //     console.log('Response Failed', responseJson.isVerified);
              //     // alert("Login FAILED!")
              //     navigation.navigate('Home');
              //   }
            })
            .catch(error => console.log('Error Reading ' + error));
        }}
        title="Diagnose"
        color="#00ad57"
      //   accessibilityLabel="Learn more about this purple button"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: "100%"
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
  label: {
    margin: 8,
    fontSize: 18,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Symptoms;