import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '@/constants/colors';
import CartScreen from '@/screens/CartScreen';
import HomeScreen from '@/screens/HomeScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import ReviewsScreen from '@/screens/ReviewsScreen';

import { SCREENS } from './screens';

const Tab = createBottomTabNavigator();

const tabIcons = {
  [SCREENS.HOME]: 'home-outline',
  [SCREENS.ORDERS]: 'receipt-outline',
  [SCREENS.CART]: 'cart-outline',
  [SCREENS.REVIEWS]: 'chatbubble-outline',
};

export default function TabNavigator() {
  const cartItems = useSelector((state) => state.cart);
  // Cart badge total quantity sums item quantities, not just unique cart rows.
  const cartQuantity = cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);

  return (
    // Tab navigation keeps the main CoffeeGo sections available from the bottom bar.
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactiveTab,
        tabBarStyle: {
          borderTopColor: colors.secondaryBackground,
          backgroundColor: colors.background,
          height: 74,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          const showCartBadge = route.name === SCREENS.CART && cartQuantity > 0;

          return (
            <View>
              <Ionicons name={tabIcons[route.name]} size={size} color={color} />
              {showCartBadge ? <CartBadge quantity={cartQuantity} /> : null}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.ORDERS} component={OrdersScreen} />
      <Tab.Screen name={SCREENS.CART} component={CartScreen} />
      <Tab.Screen name={SCREENS.REVIEWS} component={ReviewsScreen} />
    </Tab.Navigator>
  );
}

function CartBadge({ quantity }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{quantity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
