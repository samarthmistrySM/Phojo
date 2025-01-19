import React, { useState, useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import LoginScreen from '../screen/Auth/LoginScreen';
import SignUpSceen from '../screen/Auth/SignUpSceen';
import PlusScreen from '../screen/PlusScreen';
import AuthContext from '../context/AuthContext';

const homeIcon = require('../assets/images/house.png');
const homeFillIcon = require('../assets/images/house.fill.png');
const personIcon = require('../assets/images/person.png');
const personFillIcon = require('../assets/images/person.fill.png');
const plusIcon = require('../assets/images/plus.square.png');
const plusFillIcon = require('../assets/images/plus.square.fill.png');

const AuthStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={SignUpSceen} />
    </AuthStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'HomeScreen') {
            iconSource = focused ? homeFillIcon : homeIcon;
          } else if (route.name === 'PlusScreen') {
            iconSource = focused ? plusFillIcon : plusIcon;
          } else if (route.name === 'ProfileScreen') {
            iconSource = focused ? personFillIcon : personIcon;
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                {
                  tintColor: color, 
                  width: size - 5,
                  height: size - 5,
                },
              ]}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="HomeScreen"
    >
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen name="PlusScreen" component={PlusScreen} />
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};


export default function Navigator() {
  const [isAuth, setIsAuth] = useState(false);
  const { isAuthenticated, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    };

    checkAuth();
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      {isAuth ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 5, 
    alignSelf: 'center',
  },
});
