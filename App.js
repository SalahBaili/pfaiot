import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Écrans
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import PatientDetailScreen from './src/screens/PatientDetailScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import AddMedicaScreen from './src/screens/AddMedicaScreen';
import MedicationDetailsScreen from './src/screens/MedicationDetailsScreen';
import AddPatientScreen from './src/screens/AddPatientScreen';
import MedicalFiche from './src/screens/MedicalFiche';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Authentification */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* Navigation principale */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} />
        <Stack.Screen name="PatientDetailScreen" component={PatientDetailScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="AddMedicaScreen" component={AddMedicaScreen} />
        <Stack.Screen name="MedicationDetailsScreen" component={MedicationDetailsScreen} />
        <Stack.Screen name="MedicalFiche" component={MedicalFiche} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
