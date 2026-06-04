import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '@/constants/colors';
import CartScreen from '@/screens/CartScreen';
import HomeScreen from '@/screens/HomeScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import ProfileScreen from '@/screens/ProfileScreen';

import { SCREENS } from './screens';

const Tab = createBottomTabNavigator();

const tabIcons = {
  [SCREENS.HOME]: 'home-outline',
  [SCREENS.CART]: 'cart-outline',
  [SCREENS.ORDERS]: 'receipt-outline',
  [SCREENS.PROFILE]: 'person-outline',
};

export default function TabNavigator() {
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
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.ORDERS} component={OrdersScreen} />
      <Tab.Screen name={SCREENS.CART} component={CartScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
