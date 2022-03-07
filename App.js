import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import navigations routes
import MainRoutes from './src/Routes/mainRoute';
import {decode, encode} from 'base-64';
import {accountService} from './src/_services';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
export default function App() {
  const [able, setAble] = useState();
  useEffect(() => {
    accountService.refreshToken().then(x => {
      setAble(x);
    });
  }, []);
  return able == undefined ? null : (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
}
