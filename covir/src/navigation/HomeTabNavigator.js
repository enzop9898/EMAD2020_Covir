import React, { useContext, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, Dimensions, LogBox } from 'react-native';
import { AuthContext, AuthProvider } from '../navigation/AuthProvider';
import AuthStack from './AuthStack';
import PrenotaStack from '../navigation/PrenotaStack';
import DonaStack from '../navigation/DonaStack';
import ProfiloStack from '../navigation/ProfiloStack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import IlmioProfilo from '../screens/IlMioProfilo';
import DonaTempo from '../screens/DonaTempo';
import { HeaderBackground } from '@react-navigation/stack';
import ScegliVol from '../screens/ScegliVolontario2';
import HomeStack from './HomeStack';
import { db } from '../common/crud'; 



const Tab = createBottomTabNavigator();
LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

const renderContentUtente = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  return (
    <Tab.Screen name="Prenota" component={PrenotaStack} />  
  );
};

const renderContentOperatore = () => {
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

  return (
    <Tab.Screen name="Dona tempo" component={DonaStack} />    
  );
};

export default function HomeTabNavigator({navigation}) {
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

  const [ tipo, setTipo ] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    caricaDati();
  }, []);

  async function caricaDati(){
    var temp = await db.getUtenteByMail(user.email);
    setTipo(temp.tipo);
 };
 LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

    return (          
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused ? 'ios-home' : 'ios-home';
                } else if (route.name === 'Prenota') {
                  iconName = focused ? 'ios-list-box' : 'ios-list-box';
                }else if (route.name === 'Il mio Profilo') {
                  iconName = focused ? 'ios-person' : 'ios-person';
                }else if (route.name === 'Dona tempo') {
                  iconName = focused ? 'ios-time' : 'ios-time';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: '#1979a9',
              activeBackgroundColor: '#1979a9'
              
            }}>
              <Tab.Screen name="Home" component={HomeStack}/>
              {tipo != "volontario" ? renderContentUtente() : renderContentOperatore()} 
              <Tab.Screen name="Il mio Profilo" component={ProfiloStack}/>
          </Tab.Navigator>         
        
      );                         
    }
