// AutocompleteInput.js
import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind'
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert, // Make sure Alert is imported for potential error messages
} from 'react-native';
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from '@env';

const getThemedStyles = (colorScheme) => {
  const isDark = colorScheme === 'dark';
  
  // Define colors based on the theme
  const colors = {
    background: isDark ? '#1F2937' : '#FFFFFF', // gray-800 or white
    inputBackground: isDark ? '#374151' : '#F9F9F9', // gray-700 or light gray
    text: isDark ? '#FFFFFF' : '#333333',
    placeholder: isDark ? '#9CA3AF' : '#888888', // gray-400 or gray-500
    border: isDark ? '#4B5563' : '#CCCCCC', // gray-600 or light gray
    predictionsBackground: isDark ? '#1F2937' : 'white',
    separator: isDark ? '#4B5563' : '#EEEEEE',
  };

  return StyleSheet.create({
    wrapper: {
      position: 'relative',
      zIndex: 1000,
      width: '100%',
      // We assume the parent component handles padding, so remove paddingHorizontal: 16
      marginTop: 30,
    },
    inputContainer: {
      position: 'relative',
      width: '100%',
      height: 50,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: colors.border,
      borderWidth: 1,
      paddingHorizontal: 12,
      borderRadius: 20,
      // Apply theme colors here
      backgroundColor: colors.inputBackground, 
      fontSize: 16,
      color: colors.text, 
      paddingRight: 40,
    },
    // ... (clearButton and loadingIndicator styles remain mostly static) ...
    clearButton: {
      position: 'absolute',
      right: 10,
      top: 0,
      bottom: 0,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    clearButtonText: {
      fontSize: 18,
      color: colors.placeholder, // Use placeholder color for the 'X'
    },
    loadingIndicator: {
      position: 'absolute',
      right: 45,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    predictionsList: {
      position: 'absolute',
      width: '90%', // Adjust width as padding was removed from wrapper
      top: 55,
      // Center the list by matching padding
      left: 0, 
      right: 0,
      marginHorizontal: '5%', // Ensure it's centered if wrapper doesn't have padding
      maxHeight: 200,
      // Apply theme colors here
      backgroundColor: colors.predictionsBackground,
      borderColor: colors.border, 
      borderWidth: 1,
      borderRadius: 8,
      // ... (Shadow styles remain static)
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 5,
        },
      }),
      zIndex: 9999,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderColor: colors.separator, // Use theme color for separator
    },
    itemText: {
      fontSize: 16,
      color: colors.text, // Use theme text color
    },
    emptyListText: {
      padding: 15,
      textAlign: 'center',
      color: colors.placeholder,
    }
  });
};

// Modified to accept 'value' and 'onChangeText' props for external control
export default function AutocompleteInput({ onPlaceSelect, placeholder, value, onChangeText }) {
  // Use internal state 'localQuery' for what's typed,
  // but initial value comes from 'value' prop if provided.
  const [localQuery, setLocalQuery] = useState(value || ''); // Initialize with prop.value or empty string
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

  // Update localQuery when the 'value' prop changes from parent
  useEffect(() => {
    if (value !== undefined && value !== localQuery) {
      setLocalQuery(value);
    }
  }, [value]);

  useEffect(() => {
    // If localQuery is too short or empty, clear predictions and hide the list
    if (localQuery.length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    // Debounce the API call to avoid too many requests
    const timeoutId = setTimeout(() => {
      fetchPredictions(localQuery);
    }, 300);

    // Cleanup function to clear the timeout if localQuery changes before the timeout fires
    return () => clearTimeout(timeoutId);
  }, [localQuery]); // Re-run effect when localQuery changes

  // Function to fetch autocomplete predictions from Google Places API
  const fetchPredictions = async (input) => {
  setLoading(true);
  setShowPredictions(true);
  try {
    // CHANGE: Point to your internal API route instead of Google
    const url = `/api/autocomplete?input=${encodeURIComponent(input)}`;

    console.log('Fetching from Proxy:', url);

    const response = await fetch(url);
    const json = await response.json();

    if (json.status === 'OK') {
      setPredictions(json.predictions);
    } else {
      console.warn('Google API Error:', json.status);
      setPredictions([]);
    }
  } catch (err) {
    console.error('Fetch error (Autocomplete):', err);
    setPredictions([]);
  } finally {
    setLoading(false);
  }
};

  // Function to fetch detailed information about a selected place
  const handleSelect = async (place) => {
    setLocalQuery(place.description); // Set the TextInput value to the selected place's description
    setPredictions([]); // Clear predictions list
    setShowPredictions(false); // Hide the predictions list

    try {
      const url = `/api/details?place_id=${place.place_id}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.status === 'OK') {
        onPlaceSelect(json.result); // Pass the full place details back to the parent component
      } else {
        console.warn('Details fetch failed:', json.status, json.error_message); // Log details API errors
        // Optionally show an alert to the user
        Alert.alert("Error fetching details", `Could not get full details for the selected place. Status: ${json.status}`);
      }
    } catch (err) {
      console.error('Details fetch error:', err); // Log network/fetch errors for details API
      Alert.alert("Network Error", "Could not fetch place details. Please check your internet connection.");
    }
  };

  // Function to clear the input field and hide predictions
  const clearInput = () => {
    setLocalQuery(''); // Clear internal state
    if (onChangeText) { // Also inform parent if it's controlling the text
      onChangeText('');
    }
    setPredictions([]);
    setShowPredictions(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* New container for TextInput and clear button */}
      <View style={styles.inputContainer}>
        {/* TextInput for user input */}
        <TextInput
          style={styles.input}
          value={localQuery} // Use localQuery (controlled by prop or internal state)
          onChangeText={(text) => {
            setLocalQuery(text); // Update internal state
            if (onChangeText) { // Also call parent's onChangeText if provided
              onChangeText(text);
            }
            // Conditionally show predictions based on localQuery length
            if (text.length >= 2) {
              setShowPredictions(true);
            } else {
              setShowPredictions(false);
            }
          }}
          placeholder={placeholder || "Enter a location"} // Use placeholder prop
          // Ensure keyboard persists so you can interact with FlatList items
          keyboardShouldPersistTaps="always"
          onBlur={() => {
            // Hide predictions when input loses focus after a short delay
            // This delay is crucial to allow taps on suggestions to register before the list disappears
            setTimeout(() => setShowPredictions(false), 200);
          }}
          onFocus={() => {
            // Show predictions again if there's text in the input and predictions are available
            if (localQuery.length >= 2 && predictions.length > 0) {
              setShowPredictions(true);
            }
          }}
        />
        {/* Clear Input Button - only show if localQuery is not empty */}
        {localQuery.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}

        {/* Loading indicator - also position within this container for consistency */}
        {loading && (
          <ActivityIndicator
            size="small"
            color="#888"
            style={styles.loadingIndicator}
          />
        )}
      </View>

      {/* Predictions Dropdown - only render if showPredictions is true and there are predictions */}
      {showPredictions && predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
              <Text style={styles.itemText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.predictionsList} // Apply the new style for positioning
          keyboardShouldPersistTaps="handled" // Essential for touches on list items to register
          // Display "No results found." message if no predictions and not loading
          ListEmptyComponent={!loading && localQuery.length > 1 && predictions.length === 0 ? <Text style={styles.emptyListText}>No results found.</Text> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    height: 50,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor:'#f9f9f9',
    fontSize: 16,
    color: '#333',
    paddingRight: 40,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#888',
  },
  predictionsList: {
    position:'absolute',
    width:'100%',
    top: 55,
    left: 16,
    right: 16,
    maxHeight: 200,
    backgroundColor:'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
    zIndex: 9999,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor:'#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  loadingIndicator: {
    position:'absolute',
    right: 45,
    top: 0,
    bottom: 0,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 1,
  },
  emptyListText: {
    padding: 15,
    textAlign:'center',
    color: '#888',
  }
});
