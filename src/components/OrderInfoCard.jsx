import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';

export default function OrderInfoCard({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  value: {
    marginTop: 8,
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
