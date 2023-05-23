import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, View, StyleSheet } from 'react-native';
import Home from '../../views/HomeView.js';
import Users from '../../views/UsersView.js';
import Dolar from '../../views/DolarVista.js';
import Login from '../../views/LoginView.js';
import Grafico from '../Graficos/Grafico.js';
import DolarEuro from '../Dolar/DolarEuroList.js';
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
        <Drawer.Screen name="Login" component={Login} options={{ drawerLockMode: 'locked-closed', headerShown: false}}
        />
        <Drawer.Screen name="DolarEuroHoy" component={DolarEuro} />
        <Drawer.Screen name="DolarHistorico" component={DolarHistorico} />
        <Drawer.Screen name="Grafico" component={Grafico} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default CustomDrawerNavigator;
