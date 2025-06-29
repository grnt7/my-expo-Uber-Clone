// HomeScreen.js
import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import AutocompleteInput from '../components/AutocompleteInput';


import { Maps_APIKEY } from '@env';

// Import useDispatch hook and your Redux actions
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice'; // Assuming slices folder structure

const HomeScreen = () => {
    // IMPORTANT: Log your API key to ensure it's loaded correctly
    console.log('API Key loaded from .env:', Maps_APIKEY);
    console.log('API Key from .env:', Maps_APIKEY);

    const dispatch = useDispatch(); // Initialize useDispatch

    // Handler for when the user selects an Origin place
    const handleOriginSelect = (placeDetails) => {
        console.log('🎯 Full Place Details (Origin):', placeDetails);
        // Dispatch setOrigin action with the necessary data
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
        console.log('🎯 Full Place Details (Destination):', placeDetails);
        // Dispatch setDestination action with the necessary data
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
                    // Correct way to style with twrnc:
                    // Removed 'color-white' as it's not applicable to Image directly for tinting
                    style={tw`w-50 h-24 resize-contain mt-5 m-auto p-2  `}
                    // Correct way to load a local image:
                    source={require('../images/Uber-White-Logo.png')} // Adjust path relative to HomeScreen.js
                />

                {/* AutocompleteInput for Origin */}
                <AutocompleteInput onPlaceSelect={handleOriginSelect} />

                {/* You might want a second AutocompleteInput for the Destination
                    This is a common UI pattern for ride-sharing apps.
                    If you don't have a separate input for destination yet,
                    you'll need to decide how the destination is set.
                */}
                {/* <AutocompleteInput onPlaceSelect={handleDestinationSelect} /> */}


                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

 {/* <GooglePlacesAutocomplete  
                   placeholder="Where From?"
    styles={{
        container: {
            flex: 0, // This is good, prevents it from expanding vertically too much
            position: 'absolute', // Make it absolute so suggestions can overlay
            width: '100%', // Ensure it takes full width
            zIndex: 1000, // Give it a high z-index to ensure it appears above other elements
            paddingHorizontal: 0, // Remove padding that might push it inwards
            // Consider adding a top/left/right if it needs specific positioning
            // top: 10, 
            // left: 0,
            // right: 0,
        },
        textInput: {
            fontSize: 18,
            backgroundColor: '#eee', // Make sure it's visible, give it a background
            height: 50, // Give it a fixed height
        },
        listView: {
            // This is the container for the suggestions list itself
            backgroundColor: 'white', // Ensure the background is visible
            borderColor: '#ccc',
            borderWidth: 1,
            // Shadow for visibility
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        row: {
            padding: 13,
        },
        description: {
            fontSize: 16,
        },
    }}
    query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
    }}
    nearbyPlacesAPI='GooglePlacesSearch'
    debounce={400}
    
    onPress={(data, details = null) => {
        console.log('Selected Place Data:', data);
    }}
                    onFail={(error) => {
                        // This is crucial! It will log errors from the Google Places API itself.
                        console.error('GooglePlacesAutocomplete API Request Failed:', error);
                    }}
                    onTimeout={() => {
                        console.warn('GooglePlacesAutocomplete Request Timed Out!');
                    }}
                    onNotFound={() => {
                        console.log('GooglePlacesAutocomplete: No results found for query.');
                    }}
                    // --- END ERROR HANDLERS ---

                    // Optional: For further debugging, you could add this:
                    // renderRow={(rowData) => {
                    //   console.log('Rendering row with data:', rowData);
                    //   return <Text>{rowData.description}</Text>;
                    // }}
                />*/}




                /*
 style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                        marginTop: 20,
                        marginLeft: 20,
                        color: 'white'
                    }}

                */