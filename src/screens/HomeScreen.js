// HomeScreen.js
import { View, Text, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind'; 
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import AutocompleteInput from '../components/AutocompleteInput';
import ThemeToggle from '../components/ThemeToggle'; // Import the ThemeToggle component
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice'; // Assuming slices folder structure

const LogoLight = require('../images/Uber_Logo_Black.png');
const LogoDark = require('../images/Uber_Logo_White_RGB.png'); 

const HomeScreen = () => {
    const dispatch = useDispatch(); // Initialize useDispatch
      const { colorScheme } = useColorScheme(); // Gets the current state

    // This line performs the 
    const currentLogo = colorScheme === 'dark' ? LogoDark : LogoLight;
    

    // Handler for when the user selects an Origin place
    const handleOriginSelect = (placeDetails) => {
        dispatch(
            setOrigin({
                location: placeDetails.geometry.location, //Contains lat and lng
                description: placeDetails.formatted_address, //Or place.name, etc.
                //Add any other relevant details you want to store
            })
        );
        // Optionally, reset destination here if a new origin is selected
        dispatch(setDestination(null));
    };
// Handler for when the user selects a Destination place (assuming a second input)
    const handleDestinationSelect = (placeDetails) => {
        dispatch(
            setDestination({
                location: placeDetails.geometry.location, // Contains lat and lng
                description: placeDetails.formatted_address, // Or place.name, etc.
                // Add any other relevant details you want to store
            })
        );
    };
    
//     const handleChange = async (text) => {
//   setInput(text);

//     if (text.length > 2) {
//       try {
//         const res = await fetch(`http://localhost:3000/autocomplete?input=${text}`);
//         const data = await res.json();
//         setSuggestions(data.predictions || []);
//       } catch (err) {
//         console.error('Autocomplete fetch failed:', err);
//       }
//     }
//   };

    return (
        <SafeAreaView style={tw`flex-1  dark:bg-gray-900`}>
            <View style={tw`p-5 flex-1 dark:bg-gray-900`}>
               
                <ThemeToggle />  
              <Image 
                style={tw`w-50 h-24 mt-5 mb-5 m-auto p-2`} // Only Tailwind classes here
                resizeMode="contain"                       // Direct React Native prop
                source={currentLogo} 
                />
                 {/* AutocompleteInput for Origin */}
                <AutocompleteInput onPlaceSelect={handleOriginSelect} />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;