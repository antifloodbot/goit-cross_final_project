import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';

export default function CategoryChip({ title, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.activeChip]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, active && styles.activeTitle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  activeChip: {
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTitle: {
    color: colors.background,
  },
});
