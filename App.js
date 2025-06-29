import React from 'react'

import {StyleSheet, View, Text } from 'react-native'

import 'react-native-reanimated';
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from "./store";
import HomeScreen from './src/screens/HomeScreen'; // Adjust the path as necessary
import MapScreen from './src/screens/MapScreen'; // Adjust the path as necessary
import NavigateCard from './src/components/NavigateCard'; // Adjust the path as necessary
import RideOptionsCard from './src/components/RideOptionsCard'; // Adjust the path as necessary
import 'react-native-gesture-handler'; // Ensure this is imported before any other imports that use gestures
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer if you are using navigation
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator if you are using stack navigation


// Redux
const App = () => {


  // Create a stack navigator
  const Stack = createStackNavigator();
  
  return (
    <Provider store={store}> {/* Replace null with your Redux store */}
   <NavigationContainer>
    <SafeAreaProvider>
      <Stack.Navigator>
       <Stack.Screen 
       name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false}}
       />
       <Stack.Screen   
        name="MapScreen" 
        component={MapScreen} 
        options={{ headerShown: false}}
        />
           {/* Register NavigateCard as a Stack Screen */}
            <Stack.Screen
              name="NavigateCard" // Ensure this name matches what you use for navigation
              component={NavigateCard}
              options={{ headerShown: false }}
            />
            {/* Register RideOptionsCard as a Stack Screen */}
            <Stack.Screen
              name="RideOptionsCard" // Ensure this name matches what you use for navigation
              component={RideOptionsCard}
              options={{ headerShown: false }}
            />
   </Stack.Navigator>
    
    </SafeAreaProvider>
   </NavigationContainer>
    </Provider>
  )
}

export default App
