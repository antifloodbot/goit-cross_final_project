import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/colors';

const tabs = ['Home', 'Orders', 'Cart', 'Profile'];

export default function BottomNavigation({ activeTab, onTabPress }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => onTabPress(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 430,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryBackground,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  activeLabel: {
    color: colors.primary,
  },
});
