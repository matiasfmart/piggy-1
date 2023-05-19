import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NavigationC from './Components/Nav/Navigation.js';




const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationC/>
  );
}
