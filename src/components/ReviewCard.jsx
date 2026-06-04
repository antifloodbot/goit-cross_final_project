import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '@/constants/colors';

export default function ReviewCard({ name, email, body }) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 32, 420);

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  email: {
    marginTop: 6,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    marginTop: 12,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
