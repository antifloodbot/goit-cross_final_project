import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '@/constants/colors';
import { removeItem, updateQuantity } from '@/store/cartSlice';

export default function CartScreen() {
  // useSelector reads the current cart array from the Redux store.
  const cartItems = useSelector((state) => state.cart);
  // useDispatch sends cart actions to reducers like updateQuantity and removeItem.
  const dispatch = useDispatch();

  const handleQuantityChange = (item, nextQuantity) => {
    dispatch(updateQuantity({ id: item.id, size: item.size, quantity: nextQuantity }));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>Size: {item.size}</Text>
        <Text style={styles.meta}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item, item.quantity - 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item, item.quantity + 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => dispatch(removeItem({ id: item.id, size: item.size }))}
          activeOpacity={0.8}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
  listContent: {
    gap: 12,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  meta: {
    marginTop: 6,
    color: colors.inactiveTab,
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
    height: 36,
    width: 36,
  },
  quantityButtonText: {
    color: colors.background,
    fontSize: 20,
    fontWeight: '700',
  },
  removeButton: {
    marginTop: 14,
    paddingVertical: 8,
  },
  removeButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
