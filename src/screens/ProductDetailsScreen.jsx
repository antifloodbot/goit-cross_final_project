import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '@/constants/colors';
import { SCREENS } from '@/navigation/screens';
import { addItem } from '@/store/cartSlice';

const MAIN_TABS_ROUTE = 'MainTabs';
const sizes = ['S', 'M', 'L'];
const tabs = [
  { label: 'Home', icon: 'home-outline' },
  { label: 'Orders', icon: 'receipt-outline' },
  { label: 'Cart', icon: 'cart-outline' },
  { label: 'Reviews', icon: 'chatbubble-outline' },
];

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function animateAddedMessageLayout() {
  // LayoutAnimation gives the confirmation message a visible mount/unmount transition.
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export default function ProductDetailsScreen({ route, navigation }) {
  const [selectedSize, setSelectedSize] = useState('S');
  const [addedMessage, setAddedMessage] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  // Cart badge total quantity sums all quantities across cart items.
  const cartQuantity = cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);
  // route.params carries the product data sent from Home when a card is pressed.
  const product = route?.params;

  useFocusEffect(
    useCallback(
      () => () => {
        setAddedMessage('');
      },
      []
    )
  );

  if (!product) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.notFound}>Product not found</Text>
        <BackButton onPress={navigation.goBack} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.detailsScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description || 'No description available.'}</Text>

          <Text style={styles.sizeLabel}>Size</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeOption, isSelected && styles.selectedSizeOption]}
                  onPress={() => {
                    setSelectedSize(size);
                    animateAddedMessageLayout();
                    setAddedMessage('');
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sizeText, isSelected && styles.selectedSizeText]}>{size}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              dispatch(
                addItem({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  imageUrl: product.imageUrl,
                  size: selectedSize,
                })
              );
              animateAddedMessageLayout();
              setAddedMessage(`${product.title} added to cart`);
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.addButtonText}>+ Add to Cart</Text>
          </TouchableOpacity>

          {addedMessage ? <Text style={styles.addedMessage}>{addedMessage}</Text> : null}
        </View>
      </ScrollView>

      <StaticBottomTabs
        navigation={navigation}
        cartQuantity={cartQuantity}
        onTabPress={() => {
          animateAddedMessageLayout();
          setAddedMessage('');
        }}
      />
    </View>
  );
}

function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );
}

function StaticBottomTabs({ navigation, cartQuantity, onTabPress }) {
  const handleTabPress = (screenName) => {
    onTabPress();
    navigation.navigate(MAIN_TABS_ROUTE, {
      screen: screenName,
    });
  };

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = tab.label === 'Home';
        const tabColor = isActive ? colors.primary : colors.inactiveTab;

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tabItem}
            onPress={() => handleTabPress(SCREENS[tab.label.toUpperCase()])}
            activeOpacity={0.8}
          >
            <View>
              <Ionicons name={tab.icon} size={24} color={tabColor} />
              {tab.label === 'Cart' && cartQuantity > 0 ? <CartBadge quantity={cartQuantity} /> : null}
            </View>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
  detailsScroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    backgroundColor: colors.background,
    paddingBottom: 24,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: colors.background,
  },
  content: {
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  price: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    marginTop: 18,
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  sizeLabel: {
    marginTop: 24,
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  sizeOption: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 14,
    backgroundColor: colors.secondaryBackground,
    minHeight: 48,
  },
  selectedSizeOption: {
    backgroundColor: colors.primary,
  },
  sizeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  selectedSizeText: {
    color: colors.background,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primary,
    marginTop: 25,
    minHeight: 56,
  },
  addButtonText: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  addedMessage: {
    marginTop: 12,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  notFound: {
    marginBottom: 20,
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginTop: 28,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  backButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
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
  activeTabLabel: {
    color: colors.primary,
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
