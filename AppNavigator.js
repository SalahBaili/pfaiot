import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importation des écrans
import CalendarScreen from './screens/CalendarScreen';
import AddMedicaScreen from './screens/AddMedicaScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CalendarScreen"
        screenOptions={{
          headerStyle: { backgroundColor: '#004D40' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Écran principal : Calendrier */}
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{
            title: 'Calendrier',
            headerLeft: null, // <<< Pas de flèche retour sur le calendrier
          }}
        />

        {/* Écran d'ajout de médicament */}
        <Stack.Screen
          name="AddMedicaScreen"
          component={AddMedicaScreen}
          options={{ headerShown: false }} // <<< On cache complètement le header ici
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
