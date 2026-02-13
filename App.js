import 'react-native-reanimated';
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from "./store";
import LoadingScreen from './src/screens/LoadingScreen';
import DarkModeTest from './src/screens/DarkModeTest';
import HomeScreen from './src/screens/HomeScreen'; // Adjust the path as necessary
import MapScreen from './src/screens/MapScreen'; // Adjust the path as necessary
import NavigateCard from './src/components/NavigateCard'; // Adjust the path as necessary
import RideOptionsCard from './src/components/RideOptionsCard'; // Adjust the path as necessary
import 'react-native-gesture-handler'; // Ensure this is imported before any other imports that use gestures
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'; // Import NavigationContainer if you are using navigation
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator if you are using stack navigation
import { useColorScheme } from 'nativewind'; // Import the hook
import { useAppTheme } from './src/hooks/useAppTheme'; // Custom hook to manage theme

// Redux
const App = () => {

  // const { colorScheme, toggleColorScheme } = useColorScheme(); // Get the current color scheme (light or dark)
  const activeTheme = useAppTheme();
  const Stack = createStackNavigator();

  
  
    return (
    <Provider store={store}> 
   <NavigationContainer theme={activeTheme}>
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen 
       name="LoadingScreen" 
        component={LoadingScreen} 
        options={{ headerShown: false}}
       />
       <Stack.Screen 
       name="HomeScreen" 
        component={HomeScreen} 
       options={{ 
        headerShown: false,
        //ADD THIS: Set the card background to be transparent or match dark theme
       cardStyle: { backgroundColor: activeTheme.colors.background }
    }}
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
              options={{ headerShown: false,
                 cardStyle: { backgroundColor: activeTheme.colors.background }
              }}
            />
            {/* Register RideOptionsCard as a Stack Screen */}
            <Stack.Screen
              name="RideOptionsCard" // Ensure this name matches what you use for navigation
              component={RideOptionsCard}
              options={{ headerShown: false,
                 cardStyle: { backgroundColor: activeTheme.colors.background }
               }}
             
            />
   </Stack.Navigator>
    </SafeAreaProvider>
   </NavigationContainer>
    </Provider>
  )
}

export default App;
