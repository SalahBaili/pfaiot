import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

const formatDateToFrench = (dateString) => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const date = new Date(dateString);
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function CalendarScreen({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [medicationsByDate, setMedicationsByDate] = useState({});
  const { patient } = route.params || {};

  // Fonction pour ajouter un médicament (callback)
  const handleAddMedica = (medicaData) => {
    const { name, hour, date } = medicaData;
    setSelectedDate(date);

    setMedicationsByDate(prev => {
      const prevForDate = prev[date] || {
        morning: [],
        afternoon: [],
        evening: [],
      };

      const medsForDate = {
        morning: [...prevForDate.morning],
        afternoon: [...prevForDate.afternoon],
        evening: [...prevForDate.evening],
      };

      let timeOfDay = 'evening';
      if (hour < 12) timeOfDay = 'morning';
      else if (hour < 18) timeOfDay = 'afternoon';

      if (!medsForDate[timeOfDay].includes(name)) {
        medsForDate[timeOfDay].push(name);
      }

      return {
        ...prev,
        [date]: medsForDate,
      };
    });
  };

  const formatPatientName = (name) => `M. ${name}`;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#004D40" />
        </TouchableOpacity>
      </View>

      <View style={styles.patientHeader}>
        <Text style={styles.patientName}>
          {patient?.name ? formatPatientName(patient.name) : 'Patient'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddMedicaScreen', {
          patient,
          onAddMedica: handleAddMedica, // 🔁 Callback
        })}>
          <Icon name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#FFD700',
          },
        }}
        theme={{
          backgroundColor: '#004D40',
          calendarBackground: '#004D40',
          textSectionTitleColor: '#FFFFFF',
          dayTextColor: '#FFFFFF',
          selectedDayTextColor: '#000',
          todayTextColor: '#FFD700',
          monthTextColor: '#FFFFFF',
          arrowColor: '#FFD700',
        }}
        style={styles.calendar}
      />

      <Text style={styles.monthText}>
        {selectedDate ? `Date sélectionnée: ${formatDateToFrench(selectedDate)}` : 'Sélectionnez une date'}
      </Text>

      <Text style={styles.doseTitle}>• Matin :</Text>
      <View style={styles.doseBubble}>
        <Text style={styles.bubbleText}>
          {(medicationsByDate[selectedDate]?.morning || []).join(', ') || 'Aucun médicament'}
        </Text>
      </View>

      <Text style={styles.doseTitle}>• Midi :</Text>
      <View style={styles.doseBubble}>
        <Text style={styles.bubbleText}>
          {(medicationsByDate[selectedDate]?.afternoon || []).join(', ') || 'Aucun médicament'}
        </Text>
      </View>

      <Text style={styles.doseTitle}>• Soir :</Text>
      <View style={styles.doseBubble}>
        <Text style={styles.bubbleText}>
          {(medicationsByDate[selectedDate]?.evening || []).join(', ') || 'Aucun médicament'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F7FA', padding: 16 },
  topBar: { marginBottom: 10 },
  patientHeader: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00BFA5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  patientName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  calendar: { borderRadius: 15, overflow: 'hidden', marginBottom: 10 },
  monthText: {
    fontSize: 16,
    color: '#00796B',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  doseTitle: { fontSize: 16, color: '#00796B', fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  doseBubble: {
    backgroundColor: '#FFD700',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bubbleText: { fontSize: 14, color: '#000' },
});
