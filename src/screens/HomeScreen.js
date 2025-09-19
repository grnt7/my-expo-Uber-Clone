// HomeScreen.js
import { View, Text, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import AutocompleteInput from '../components/AutocompleteInput';
//import { Maps_APIKEY } from '@env';
// Import useDispatch hook and your Redux actions
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice'; // Assuming slices folder structure

const HomeScreen = () => {
    const dispatch = useDispatch(); // Initialize useDispatch

    // Handler for when the user selects an Origin place
    const handleOriginSelect = (placeDetails) => {
        dispatch(
            setOrigin({
                location: placeDetails.geometry.location, // Contains lat and lng
                description: placeDetails.formatted_address, // Or place.name, etc.
                // Add any other relevant details you want to store
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

    return (
        <SafeAreaView style={tw`bg-black h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={tw`w-50 h-24 resize-contain mt-5 mb-5 m-auto p-2`}
                    // Correct way to load a local image:
                    source={require('../images/Uber-White-Logo.png')} // Adjust path relative to HomeScreen.js
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

