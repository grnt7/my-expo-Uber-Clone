import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from "@rneui/themed"; // Use the updated RNEUI package
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin, selectDestination } from '../slices/navSlice';

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
   
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    // >>>>>>>>>>>>>> CONSOLE LOGS TO INSPECT DATA <<<<<<<<<<<<<<
    console.log("MapScreen-Current Origin from Redux:", origin);
    console.log("MapScreen-Current Destination from Redux:", destination);


    return (
        <View style={tw`flex-1`}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`absolute top-16 left-8 z-50 p-3 bg-gray-100 rounded-full shadow-lg`}>
                <Icon name="menu" type="material" color="black" size={24} />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                {/*The Map component likely consumes 'origin' and 'destination'*/}
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



