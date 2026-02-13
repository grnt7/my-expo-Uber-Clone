// NavigateCard.js
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import AutocompleteInput from '../components/AutocompleteInput';

// but it's good to keep it imported if other parts of NavigateCard or its sub-components use it
//import { Maps_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites'; // Note: This might need a correct relative path if it's not in the same folder as NavigateCard
import { Icon } from "@rneui/themed"; // Use the updated RNEUI package


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // UPDATED: handlePlaceSelect now expects a single 'placeDetails' object
    // directly from your custom AutocompleteInput's onPlaceSelect prop
    const handlePlaceSelect = (placeDetails) => {
        console.log('Selected destination details (from custom AutocompleteInput):', placeDetails);

        if (placeDetails && placeDetails.geometry && placeDetails.geometry.location) {
            dispatch(
                setDestination({
                    location: placeDetails.geometry.location, // geometry.location contains lat/lng
                    description: placeDetails.formatted_address, // Use formatted_address or name from placeDetails
                })
            );
            console.log('Successfully set destination with full details. Location:', placeDetails.geometry.location);
            navigation.navigate('RideOptionsCard');
        } else {
            console.warn("Custom AutocompleteInput (NavigateCard): Selected place details are incomplete (missing geometry or location).", placeDetails);
            Alert.alert("Destination Error", "Could not get full details for the selected destination. Please try again or choose a different one.");
        }
    };

    return (
         <SafeAreaView style={tw`bg-white flex-1`}>
      
       
           <KeyboardAvoidingView
           style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // 3. Adjust offset (Android often needs less than iOS)
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
       
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, David</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>

                <View style={tw`p-5 mt--5`}>
                    {/* >>>>>>>>>>>>>> USE YOUR CUSTOM AutocompleteInput HERE <<<<<<<<<<<<<< */}
                    <AutocompleteInput
                        placeholder="Where to?"
                        onPlaceSelect={handlePlaceSelect} // Pass your handler to the custom component
                        // No need for 'query' prop or 'styles' prop here for your custom component
                    />
                </View>
              
        
                <NavFavourites />
            </View>
</KeyboardAvoidingView>
            <View
                style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row w-24 px-4 py-3 rounded-full justify-between`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        
         
            </SafeAreaView>
    );
};

export default NavigateCard;


const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        paddingTop:10,
        flex:0,
    },
    textInput: {
        backgroundColor:"#DDDDDF",
        borderRadius:0,
        fontSize:18,
    },
    textInputContainer: {
        paddingHorizontal:20,
        paddingBottom:0,
    },
});

