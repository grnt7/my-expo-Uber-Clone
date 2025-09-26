// src/hooks/useAppTheme.js
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';

export const useAppTheme = () => {
    const { colorScheme } = useColorScheme();

    // Use a custom dark theme with a color matching your Tailwind bg-gray-900 (#111827)
    const customDarkTheme = useMemo(() => ({
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: '#111827', // Tailwind's gray-900 equivalent
        },
    }), []); 

    return colorScheme === 'dark' ? customDarkTheme : DefaultTheme;
};