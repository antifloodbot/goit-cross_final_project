import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '@/constants/colors';
import { SCREENS } from '@/navigation/screens';

const MAIN_DRAWER_ROUTE = 'Main';
const MAIN_TABS_ROUTE = 'MainTabs';
const HEADER_HEIGHT = 64;
const tabs = [
  { label: 'Home', icon: 'home-outline' },
  { label: 'Orders', icon: 'receipt-outline' },
  { label: 'Cart', icon: 'cart-outline' },
  { label: 'Reviews', icon: 'chatbubble-outline' },
];
const contactItems = [
  { label: 'CoffeeGo Support', value: 'Customer Care Team' },
  { label: 'Email', value: 'support@coffeego.app' },
  { label: 'Phone', value: '+1 (555) 123-4567' },
  { label: 'Location', value: 'Seattle, WA' },
  { label: 'Hours', value: 'Mon–Fri 08:00–18:00' },
];

export default function ContactScreen({ navigation }) {
  const cartItems = useSelector((state) => state.cart);
  // Cart badge total quantity sums all quantities across cart items.
  const cartQuantity = cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.appShell}>
        <ScreenHeader title="Contacts" onBackPress={() => navigateToMainTab(navigation, SCREENS.HOME)} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {contactItems.map((item) => (
            <View key={item.label} style={styles.card}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </ScrollView>

        <StaticBottomTabs navigation={navigation} cartQuantity={cartQuantity} />
      </View>
    </View>
  );
}

function ScreenHeader({ title, onBackPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBackButton} onPress={onBackPress} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={24} color={colors.background} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

function StaticBottomTabs({ navigation, cartQuantity }) {
  const handleTabPress = (screenName) => {
    navigateToMainTab(navigation, screenName);
  };

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={styles.tabItem}
          onPress={() => handleTabPress(SCREENS[tab.label.toUpperCase()])}
          activeOpacity={0.8}
        >
          <View>
            <Ionicons name={tab.icon} size={24} color={colors.inactiveTab} />
            {tab.label === 'Cart' && cartQuantity > 0 ? <CartBadge quantity={cartQuantity} /> : null}
          </View>
          <Text style={styles.tabLabel}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CartBadge({ quantity }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{quantity}</Text>
    </View>
  );
}

function navigateToMainTab(navigation, screenName) {
  navigation.navigate(MAIN_DRAWER_ROUTE, {
    screen: MAIN_TABS_ROUTE,
    params: {
      screen: screenName,
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
  },
  appShell: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    height: HEADER_HEIGHT,
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
  headerBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEADER_HEIGHT,
    width: 48,
  },
  headerTitle: {
    color: colors.background,
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    alignItems: 'center',
    gap: 14,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
    width: '100%',
    maxWidth: 420,
  },
  label: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    marginTop: 8,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.secondaryBackground,
    backgroundColor: colors.background,
    height: 74,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    marginTop: 2,
    color: colors.inactiveTab,
    fontSize: 12,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '700',
  },
});
