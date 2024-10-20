import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppointmentCard from './AppointmentCard';


const AppointmentsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Future Appointments:</Text>
      <AppointmentCard
        doctorName="Dr. Selkon Kane"
        specialization="Psychiatrist"
        date="16-Nov-2020 | 5:00 PM"
      />
      <Text style={styles.title}>Past Appointments:</Text>
      <AppointmentCard
        doctorName="Dr. Brain Wofe"
        specialization="Psychologist"
        date="10-Nov-2020 | 4:00 PM"
      />
            <AppointmentCard
        doctorName="Dr. Brain Wofe"
        specialization="Psychologist"
        date="10-Nov-2020 | 4:00 PM"
      />
            <AppointmentCard
        doctorName="Dr. Brain Wofe"
        specialization="Psychologist"
        date="10-Nov-2020 | 4:00 PM"
      />
            <AppointmentCard
        doctorName="Dr. Brain Wofe"
        specialization="Psychologist"
        date="10-Nov-2020 | 4:00 PM"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 10,
  },
});

export default AppointmentsSection;
