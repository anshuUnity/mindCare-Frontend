import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>QUOTE OF THE DAY</Text>
      <Text style={styles.quote}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFEB3B',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default QuoteCard;
