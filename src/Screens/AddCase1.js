// import React, {useState, useEffect} from 'react';
// import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import {color} from 'react-native-reanimated';
// import {accountService} from '../_services/account.service';

// const Diagnose = ({navigation, route}) => {

//   // const user = route.params.user;

//   const [data, setData] = useState({
//     email: '',
//     firstName: '',
//     lastName: '',
//     city: '',
//     phone: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//   });

//   useEffect(() => {
//     // setData(user);
//   }, [route]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}></View>
//       <Image style={styles.avatar} source={{uri: data.imageUrl}} />
//       <View style={styles.body}>
//         <View style={styles.bodyContent}>
//           <Text style={styles.name}>
//             {data.firstName} {data.lastName}
//           </Text>
//           <Text style={styles.headings}>Name</Text>
//           <Text style={styles.info}>{data.address}</Text>
//           <Text style={styles.headings}>Address</Text>
//           <Text style={styles.info}>{data.city}</Text>
//           <Text style={styles.headings}>City</Text>
//           <Text style={styles.info}>{data.patientStatus}</Text>
//           <Text style={styles.headings}>Status</Text>
//           <Text style={styles.info}>{data.phone}</Text>
//           <Text style={styles.headings}>Phone</Text>
//           <Text style={styles.info}>{data.email}</Text>
//           <Text style={styles.headings}>Email</Text>
//           <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={() => {
//               navigation?.navigate('Update');
//             }}>
//             <Text style={{color: 'white'}}>Update Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Diagnose;

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#00ad57',
//     height: 200,
//   },
//   container: {
//     backgroundColor: 'white',
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: 'white',
//     marginBottom: 10,
//     alignSelf: 'center',
//     position: 'absolute',
//     marginTop: 130,
//   },
//   name: {
//     fontSize: 22,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   body: {
//     marginTop: 40,
//   },
//   bodyContent: {
//     // flex: 1,
//     alignItems: 'center',
//     padding: 30,
//   },
//   name: {
//     fontSize: 28,
//     color: '#696969',
//     fontWeight: '600',
//     textTransform: 'capitalize',
//     textDecorationLine: 'underline',
//     color: '#00ad57',
//   },
//   info: {
//     fontSize: 16,
//     color: '#00ad57',
//     marginTop: 10,
//     textTransform: 'capitalize',
//   },
//   headings: {
//     color: 'black',
//   },
//   description: {
//     fontSize: 16,
//     color: '#696969',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     marginTop: 10,
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//     backgroundColor: '#00ad57',
//   },
// });

import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Diagnose = () => {
  const [isSelected, setSelection] = useState(false);
  const [symptoms, setSymptoms] = useState({
    itching: 0,
    skin_rash: 0,
    nodal_skin_eruptions: 0,
    continuous_sneezing: 0,
    shivering: 0,
    chills: 0,
    joint_pain: 0,
    stomach_pain: 0,
    acidity: 0,
    ulcers_on_tongue: 0,
    muscle_wasting: 0,
    vomiting: 0,
    burning_micturition: 0,
    spotting_urination: 0,
    fatigue: 0,
    weight_gain: 0,
    anxiety: 0,
    cold_hands_and_feets: 0,
    mood_swings: 0,
    weight_loss: 0,
    restlessness: 0,
    lethargy: 0,
    patches_in_throat: 0,
    irregular_sugar_level: 0,
    cough: 0,
    high_fever: 0,
    sunken_eyes: 0,
    breathlessness: 0,
    sweating: 0,
    dehydration: 0,
    indigestion: 0,
    headache: 0,
    yellowish_skin: 0,
    dark_urine: 0,
    nausea: 0,
    loss_of_appetite: 0,
    pain_behind_the_eyes: 0,
    back_pain: 0,
    constipation: 0,
    abdominal_pain: 0,
    diarrhoea: 0,
    mild_fever: 0,
    yellow_urine: 0,
    yellowing_of_eyes: 0,
    acute_liver_failure: 0,
    fluid_overload: 0,
    swelling_of_stomach: 0,
    swelled_lymph_nodes: 0,
    malaise: 0,
    blurred_and_distorted_vision: 0,
    phlegm: 0,
    throat_irritation: 0,
    redness_of_eyes: 0,
    sinus_pressure: 0,
    runny_nose: 0,
    congestion: 0,
    chest_pain: 0,
    weakness_in_limbs: 0,
    fast_heart_rate: 0,
    pain_during_bowel_movements: 0,
    pain_in_anal_region: 0,
    bloody_stool: 0,
    irritation_in_anus: 0,
    neck_pain: 0,
    dizziness: 0,
    cramps: 0,
    bruising: 0,
    obesity: 0,
    swollen_legs: 0,
    swollen_blood_vessels: 0,
    puffy_face_and_eyes: 0,
    enlarged_thyroid: 0,
    brittle_nails: 0,
    swollen_extremeties: 0,
    excessive_hunger: 0,
    extra_marital_contacts: 0,
    drying_and_tingling_lips: 0,
    slurred_speech: 0,
    knee_pain: 0,
    hip_joint_pain: 0,
    muscle_weakness: 0,
    stiff_neck: 0,
    swelling_joints: 0,
    movement_stiffness: 0,
    spinning_movements: 0,
    loss_of_balance: 0,
    unsteadiness: 0,
    weakness_of_one_body_side: 0,
    loss_of_smell: 0,
    bladder_discomfort: 0,
    'foul_smell_of urine': 0,
    continuous_feel_of_urine: 0,
    passage_of_gases: 0,
    internal_itching: 0,
    'toxic_look_(typhos)': 0,
    depression: 0,
    irritability: 0,
    muscle_pain: 0,
    altered_sensorium: 0,
    red_spots_over_body: 0,
    belly_pain: 0,
    abnormal_menstruation: 0,
    dischromic_patches: 0,
    watering_from_eyes: 0,
    increased_appetite: 0,
    polyuria: 0,
    family_history: 0,
    mucoid_sputum: 0,
    rusty_sputum: 0,
    lack_of_concentration: 0,
    visual_disturbances: 0,
    receiving_blood_transfusion: 0,
    receiving_unsterile_injections: 0,
    coma: 0,
    stomach_bleeding: 0,
    distention_of_abdomen: 0,
    history_of_alcohol_consumption: 0,
    'fluid_overload.1': 0,
    blood_in_sputum: 0,
    prominent_veins_on_calf: 0,
    palpitations: 0,
    painful_walking: 0,
    pus_filled_pimples: 0,
    blackheads: 0,
    scurring: 0,
    skin_peeling: 0,
    silver_like_dusting: 0,
    small_dents_in_nails: 0,
    inflammatory_nails: 0,
    blister: 0,
    red_sore_around_nose: 0,
    yellow_crust_ooze: 0,
  });

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={Object.keys(symptoms)}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate('LinkedDoctorsScreen', {
            //       hospitalId: item.id,
            //     })
            //   }>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={symptoms[item]}
                onValueChange={txt => {
                  console.log('Mustafa', txt, item, symptoms[item]);
                  setSymptoms({
                    ...symptoms,
                    item:
                      symptoms[item] == true
                        ? (symptoms[item] = false)
                        : (symptoms[item] = true),
                  });
                  {
                    console.log('Mustafa', txt, item, symptoms[item]);
                  }
                }}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Do you have {item}?</Text>
            </View>
            // </TouchableOpacity>
          )}
        />
      </View>

      <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default Diagnose;
