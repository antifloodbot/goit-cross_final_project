import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '@/constants/colors';
import ProductDetailsScreen from '@/screens/ProductDetailsScreen';

import { SCREENS } from './screens';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();
const STACK_ROUTES = {
  TABS: 'MainTabs',
};

export default function StackNavigator() {
  return (
    // Stack navigation is used for drill-down flows, such as opening product details from Home.
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.background,
        headerTitleStyle: {
          color: colors.background,
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name={STACK_ROUTES.TABS}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
        options={{ title: 'Product details' }}
      />
    </Stack.Navigator>
  );
}
