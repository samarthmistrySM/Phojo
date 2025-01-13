import React, {useState, useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import LoginScreen from '../screen/Auth/LoginScreen';
import SignUpSceen from '../screen/Auth/SignUpSceen';
import AuthContext from '../context/AuthContext';
import PlusScreen from '../screen/PlusScreen';

const AuthStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name={'Login'} component={LoginScreen} />
        <AuthStack.Screen name={'Register'} component={SignUpSceen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="HomeScreen">
        <MainStack.Screen name="HomeScreen" component={HomeScreen} />
        <MainStack.Screen name="PlusScreen" component={PlusScreen} />
        <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default function Navigator() {
  const [isAuth, setIsAuth] = useState(false);
  const {isAuthenticated, isLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setIsAuth(isAuth);
    };
    checkAuth();
  }, [isLoggedIn]);

  return isAuth ? <MainNavigation /> : <AuthNavigation />;
}
