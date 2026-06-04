import { useFocusEffect } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '@/constants/colors';
import { clearCart, removeItem, updateQuantity } from '@/store/cartSlice';
import { addOrder } from '@/store/ordersSlice';

function getItemTotal(item) {
  return Number(item.price || 0) * (item.quantity ?? 0);
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export default function CartScreen() {
  // useSelector reads the current cart array from the Redux store.
  const cartItems = useSelector((state) => state.cart);
  const nextOrderNumber = useSelector((state) => state.orders.nextOrderNumber);
  // useDispatch sends cart actions to reducers like updateQuantity and removeItem.
  const dispatch = useDispatch();
  const [placedOrder, setPlacedOrder] = useState(null);
  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + getItemTotal(item), 0),
    [cartItems]
  );

  useFocusEffect(() => {
    return () => {
      setPlacedOrder(null);
    };
  });

  const handleQuantityChange = (item, nextQuantity) => {
    setPlacedOrder(null);
    dispatch(updateQuantity({ id: item.id, size: item.size, quantity: nextQuantity }));
  };

  const handlePlaceOrder = () => {
    const order = {
      orderNumber: nextOrderNumber,
      items: cartItems.map((item) => ({ ...item })),
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    setPlacedOrder(order);
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
          onPress={() => {
            setPlacedOrder(null);
            dispatch(removeItem({ id: item.id, size: item.size }));
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {placedOrder ? (
        <View style={styles.confirmationContent}>
          <OrderConfirmation order={placedOrder} />
        </View>
      ) : null}

      {cartItems.length === 0 && !placedOrder ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : null}

      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={<CartSummary total={cartTotal} onPlaceOrder={handlePlaceOrder} />}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
}

function CartSummary({ total, onPlaceOrder }) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={onPlaceOrder} activeOpacity={0.85}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

function OrderConfirmation({ order }) {
  return (
    <View style={styles.confirmationCard}>
      <Text style={styles.confirmationTitle}>Order Placed</Text>
      <Text style={styles.confirmationMeta}>Order #{order.orderNumber}</Text>

      {order.items.map((item) => (
        <View key={`${item.id}-${item.size}`} style={styles.confirmationItemRow}>
          <Text style={styles.confirmationItemText}>
            {item.title} ({item.size}) x {item.quantity}
          </Text>
          <Text style={styles.confirmationItemSubtotal}>{formatCurrency(getItemTotal(item))}</Text>
        </View>
      ))}

      <Text style={styles.confirmationTotal}>Total: {formatCurrency(order.total)}</Text>
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
  confirmationContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  summaryCard: {
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  totalAmount: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  placeOrderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primary,
    marginTop: 16,
    minHeight: 56,
  },
  placeOrderButtonText: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  confirmationCard: {
    alignSelf: 'stretch',
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
  },
  confirmationTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  confirmationMeta: {
    marginTop: 10,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  confirmationItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  confirmationItemText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  confirmationItemSubtotal: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  confirmationTotal: {
    marginTop: 12,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
});
