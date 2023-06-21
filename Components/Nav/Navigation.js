import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, View, StyleSheet } from 'react-native';
import Home from '../Home/HomeSection.jsx';
import Login from '../Login/LoginSection.jsx';
import Gastos from '../Gasto/GastoSection.jsx';
import DolarEuroActual from '../Dolar/DolarEuroActual.js';
import DolarHistorico from '../Dolar/DolarHistorico.js';
import Signin from '../Login/SignIn.js';
import LogOut from '../LogOut/LogOutSection.jsx';
import logoImage from '../../assets/logo.png';

import AuthContext, {defaultAuth} from '../../Globals/authContext/index.js';
import Storage from '../../Services/asyncStorage.js';






const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={logoImage}
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};


const CustomDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const [userAuth, setUserAuth] = useState(defaultAuth);


  useEffect(() => {
    console.log("Busca AuthData....")
    Storage.getData('AuthData')
    .then(data => setUserAuth(data))
    .catch(error => console.log("Error", error))
    .finally(() => console.log("Si busco data"))
  }, [])
  



  return (
    <AuthContext.Provider value={{userAuth, setUserAuth}}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={userAuth ? "Login" : "Plan De Ahorro"}
          screenOptions={{ headerShown: true }}
          drawerContent={CustomDrawerContent}
        >
          {(!userAuth) ? (
           <>
             <Drawer.Screen name="Login" component={Login} />
             <Drawer.Screen name="Signin" component={Signin} />
           </>
          ) : (
            <>
             <Drawer.Screen name="Plan De Ahorro" component={Home} />
             <Drawer.Screen name="Cotizaciones Actuales" component={DolarEuroActual} />
             <Drawer.Screen name="Dolar Histórico" component={DolarHistorico} />
             <Drawer.Screen name="Gastos" component={Gastos} />
             <Drawer.Screen name="LogOut" component={LogOut} />
           </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


const styles = StyleSheet.create({
  logoContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 100,
  },
});

export default CustomDrawerNavigator;