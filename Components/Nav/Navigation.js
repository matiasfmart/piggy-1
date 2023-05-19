import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../views/HomeView.js'
import Users from '../../views/UsersView.js';
import Dolar from '../../views/DolarVista.js';
import Login from '../../views/LoginView.js'
import Grafico from '../Graficos/Grafico.js'

const CustomDrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
  
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown:true}}>
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Usuarios" component={Users} />
          <Drawer.Screen name="Valor Dolar" component={Dolar}/> 
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Grafico" component={Grafico} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
  
  export default CustomDrawerNavigator;
  