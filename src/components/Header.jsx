import { Platform, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: Platform.select({
      ios: 22,
      android: 18,
      default: 18,
    }),
    paddingBottom: 18,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
});
