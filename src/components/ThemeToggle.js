// src/components/ThemeToggle.js (or inside HomeScreen.js)
import { Pressable, Text } from 'react-native';
import tw from 'twrnc';
import { useColorScheme, colorScheme } from 'nativewind'; 
// Note: useColorScheme gives the state; colorScheme provides the set() method.

const ThemeToggle = () => {
    const { colorScheme: currentTheme } = useColorScheme();
    
    const toggleTheme = () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        colorScheme.set(newTheme); // NativeWind API to set the theme globally
    };

    return (
        <Pressable 
            onPress={toggleTheme} 
            // Theme the button itself
            style={tw`absolute top-10 right-5 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md`}
        >
            <Text style={tw`text-black dark:text-white font-bold text-sm`}>
                {currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </Text>
        </Pressable>
    );
};

export default ThemeToggle;