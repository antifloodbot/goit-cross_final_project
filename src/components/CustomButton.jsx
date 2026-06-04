import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  title: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
