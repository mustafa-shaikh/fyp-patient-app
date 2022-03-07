import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrowerContent';

// importing screens from local directory
import HomeScreen from '../HomeScreens/HomeScreen';
import WebScreen from '../HomeScreens/WebView';
import General from '../AuthScreens/GeneralScreen';
import SignIn from '../AuthScreens/LoginScreen';
import SignUp from '../AuthScreens/SignUp';
import Verification from '../AuthScreens/Verification';
import Cerenada from '../Screens/WebViewCerenada';
import Payment from '../Screens/WebViewPayment';
import Profile from '../Screens/Profile';
import UpdateProfile from '../Screens/UpdateProfile';
import CasesScreen from '../HomeScreens/CasesScreen';
import HelpScreen from '../HomeScreens/HelpScreen';
import LaywerScreen from '../HomeScreens/LaywerScreen';
import AddCaseSceen from '../Screens/AddCase';
import {accountService} from '../_services';
// end

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function MyStack() {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    setUser(accountService.userValue);
  }, [user]);
  return user == undefined ? null : (
    <Stack.Navigator
      initialRouteName={user.isVerified ? 'HomeScreen' : 'SignIn'}
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen
        name="General"
        component={General}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebScreen"
        component={WebScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CasesScreen"
        component={CasesScreen}
        options={{headerShown: true, title: 'Cases'}}
      />
      <Stack.Screen
        name="AddScreen"
        component={AddCaseSceen}
        options={{headerShown: true, title: 'Add New Case'}}
      />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen
        name="Cerenada"
        component={Cerenada}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Cases"
        component={CasesScreen}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Update"
        component={UpdateProfile}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Laywer"
        component={LaywerScreen}
        options={{headerShown: true}}
      />
    </Drawer.Navigator>
  );
}

export default MyStack;
