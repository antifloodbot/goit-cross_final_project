import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { ThemeContext } from '@/context/ThemeContext';

export default function SettingsScreen() {
  // useContext reads theme values shared by ThemeProvider at the app root.
  const { theme, toggleTheme, isDarkMode } = useContext(ThemeContext);

  const themeLabel = theme === 'dark' ? 'Dark' : 'Light';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Context API lets this screen update theme state without prop drilling. */}
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Current theme: {themeLabel}</Text>
      <CustomButton title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
  },
  darkContainer: {
    backgroundColor: colors.text,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  darkText: {
    color: colors.background,
  },
});
