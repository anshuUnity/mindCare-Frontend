import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConcernsSection: React.FC = () => {
    const concerns = [
      'Anger', 'Anxiety and Panic Attacks', 'Depression', 'Eating disorders',
      'Self-esteem', 'Self-harm', 'Stress', 'Sleep disorders'
    ];
  
    return (
      <View style={styles.concernsContainer}>
        <Text style={styles.sectionTitle}>My Concerns:</Text>
        <View style={styles.concernsGrid}>
          {concerns.map((concern, index) => (
            <View key={index} style={styles.concernTag}>
              <Text style={styles.concernText}>{concern}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    concernsContainer: {
      marginVertical: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4caf50', // Match the design color
      marginBottom: 10,
    },
    concernsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    concernTag: {
      backgroundColor: '#e0f2f1',
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      margin: 5,
    },
    concernText: {
      color: '#000',
    },
  });
  

export default ConcernsSection;
