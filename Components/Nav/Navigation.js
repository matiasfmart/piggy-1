import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, View, StyleSheet } from 'react-native';
import Home from '../Home/HomeSection.jsx';
import Users from '../Usuarios/UsersSection.jsx';
import Dolar from '../Dolar/DolarSection.jsx';
import Login from '../Login/LoginSection.jsx';
import Gastos from '../Gasto/GastoSection.jsx';
import DolarEuroActual from '../Dolar/DolarEuroActual.js';
import DolarHistorico from '../Dolar/DolarHistorico.js';
import logoImage from '../../assets/logo.png';


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
    width: 80,
    height: 80,
  },
});

const CustomDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }} drawerContent={CustomDrawerContent}>
        <Drawer.Screen name="Plan De Ahorro" component={Home} />
        <Drawer.Screen name="Usuarios" component={Users} />
        <Drawer.Screen name="Valor Dolar" component={Dolar} />
        <Drawer.Screen name="Login" component={Login} //options={{ drawerLockMode: 'locked-closed', headerShown: false}}
        />
        <Drawer.Screen name="DolarEuroActual" component={DolarEuroActual} />
        <Drawer.Screen name="DolarHistorico" component={DolarHistorico} />
        <Drawer.Screen name="Gastos" component={Gastos}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default CustomDrawerNavigator;
