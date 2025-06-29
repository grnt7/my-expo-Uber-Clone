import { StyleSheet, Text, View } from 'react-native';

import tw from 'twrnc';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';

import RideOptionsCard from '../components/RideOptionsCard';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector } from 'react-redux';
import { selectOrigin, selectDestination } from '../slices/navSlice';

const MapScreen = () => {
    const Stack = createNativeStackNavigator();

    // >>>>>>>>>>>>>> SELECTORS TO GET DATA FROM REDUX <<<<<<<<<<<<<<
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    // >>>>>>>>>>>>>> CONSOLE LOGS TO INSPECT DATA <<<<<<<<<<<<<<
    console.log("MapScreen - Current Origin from Redux:", origin);
    console.log("MapScreen - Current Destination from Redux:", destination);


    return (
        <View style={tw`flex-1`}>
            <View style={tw`h-1/2`}>
                {/* The Map component likely consumes 'origin' and 'destination' */}
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({});