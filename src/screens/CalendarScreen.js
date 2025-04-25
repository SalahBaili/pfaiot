import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { database } from '../config/firebase';
import { ref, onValue } from 'firebase/database';

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

  useEffect(() => {
    if (!patient?.id) return;

    const userId = patient.id;
    const dbRef = ref(database, `patients/${userId}/medications`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setMedicationsByDate(data || {});
    });

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddMedicaScreen', { patient, onAddMedica: handleAddMedica })}>
          <Icon name="add-circle-outline" size={30} color="#fff" style={{ marginRight: 16 }} />
        </TouchableOpacity>
      ),
    });

    return () => unsubscribe();
  }, [patient, navigation]);

  const handleAddMedica = (medicaData) => {
    const { name, hour, date } = medicaData;
    setSelectedDate(date);

    setMedicationsByDate(prev => {
      const prevForDate = prev[date] || { morning: [], afternoon: [], evening: [] };
      const medsForDate = { ...prevForDate };

      let timeOfDay = hour < 12 ? 'morning' : (hour < 18 ? 'afternoon' : 'evening');

      if (!medsForDate[timeOfDay].includes(name)) {
        medsForDate[timeOfDay].push(name);
      }

      return { ...prev, [date]: medsForDate };
    });
  };

  const formatPatientName = (name) => `M. ${name}`;

  return (
    <View style={styles.container}>
     

      <View style={styles.patientHeader}>
        <Text style={styles.patientName}>
          {patient?.name ? formatPatientName(patient.name) : 'Patient'}
        </Text>
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

      {['morning', 'afternoon', 'evening'].map((moment, idx) => {
        const meds = selectedDate && medicationsByDate[selectedDate]?.[moment];
        return (
          <View key={idx}>
            <Text style={styles.doseTitle}>
              • {moment === 'morning' ? 'Matin' : moment === 'afternoon' ? 'Midi' : 'Soir'} :
            </Text>
            <View style={styles.doseBubble}>
              <Text style={styles.bubbleText}>
                {Array.isArray(meds) && meds.length > 0 ? meds.join(', ') : 'Aucun médicament'}
              </Text>
            </View>
          </View>
        );
      })}
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
