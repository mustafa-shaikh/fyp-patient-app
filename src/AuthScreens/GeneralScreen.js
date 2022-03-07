import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {accountService} from '../_services/account.service';

const GeneralScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const [onLoad, setOnLoad] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.imageView}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            />
          </View>
          <Text style={styles.displayHeading}>Diaspora Law</Text>
          <Text style={styles.displayText}>
            We are willing to serve all people in the United States or
            internationally interested in resolving their immigration concerns
            in the United States.
          </Text>
          <View style={styles.imageView}>
            <Image
              style={styles.logo}
              source={require('../../assets/familiaensala.jpg')}
            />
          </View>
          <Text style={styles.displayHeading}>
            Experienced Immigration Attorneys
          </Text>
          <Text style={styles.displayHeading}>
            Licensed Federally in all 50 States
          </Text>
          <Text style={styles.displayText}>
            Diaspora Law is a U.S. Immigration Law firm that specializes in
            family immigration, business immigration and deportation defense.
            Licensed federally to practice U.S. immigration law in all 50 States
            and abroad.
          </Text>
          <Text style={styles.displayHeading}>Diaspora Law</Text>
          <Text style={styles.displayText}>
            Diaspora Law is a U.S. Immigration Law firm that specializes in
            family immigration, business immigration and deportation defense.
            Licensed federally to practice U.S. immigration law in all 50 States
            and abroad, we are a non-partisan, pro-immigrant, humanitarian
            effort to keep families together and protect those who cannot defend
            themselves. Further, through community engagement and support we
            work with local organizations to advocate for fair changes in
            immigration law and the fair treatment of all people. Available
            24/7, Diaspora Law lawyers and staff speak multiple languages and
            are available regardless of time zone, state or country. We will be
            there for you! We are immigrants too. Diaspora Law is passionate
            about helping immigrants because we all have a deep connection to
            the cause. We have seen and experienced the struggle, the confusion,
            and the strength it takes to come to the United States for a better
            life for your family or business. Schedule a Consultation Today.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.displayText, {color: '#AF1123'}]}>
          To access more features
        </Text>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.txtbtn]}>Sign In</Text>
          </TouchableOpacity>
          <Text style={[styles.displayText, {color: '#AF1123'}]}>OR</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.txtbtn]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  body: {
    height: hp('85%'),
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageView: {
    height: hp('40%'),
    width: hp('45%'),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    resizeMode: 'contain',
    height: hp('30%'),
    width: hp('40%'),
  },
  displayHeading: {
    color:"black",
    marginTop: '5%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 70,
    alignSelf: 'flex-start',
  },
  displayText: {
    color:"black",
    marginTop: '1%',
    fontFamily: 'Montserrat-Regular',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 80,
    alignSelf: 'flex-start',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#AF1123',
    // marginLeft: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 1000,
    justifyContent: 'center',
    height:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 40,
    width:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 10,
  },
  txtbtn: {
    fontFamily: 'Montserrat-Bold',
    fontSize:
      (Dimensions.get('window').height + Dimensions.get('window').width) / 88,
    color: 'white',
  },

  footer: {
    marginTop: '2%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: hp('15%'),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2%',
  },
});

export default GeneralScreen;
