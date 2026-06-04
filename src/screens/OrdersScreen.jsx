import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '@/constants/colors';

function formatCurrency(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function getItemTotal(item) {
  return Number(item.price || 0) * (item.quantity ?? 0);
}

function formatCreatedAt(value) {
  return new Date(value).toLocaleString();
}

export default function OrdersScreen() {
  const orders = useSelector((state) => state.orders.orders);

  const renderOrderItem = ({ item }) => <OrderCard order={item} />;

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => String(item.orderNumber)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

function OrderCard({ order }) {
  return (
    <View style={styles.orderCard}>
      <Text style={styles.orderTitle}>Order #{order.orderNumber}</Text>
      <Text style={styles.createdAt}>{formatCreatedAt(order.createdAt)}</Text>

      <View style={styles.items}>
        {order.items.map((item) => (
          <View key={`${item.id}-${item.size}`} style={styles.itemRow}>
            <Text style={styles.itemText}>
              {item.title} ({item.size}) x {item.quantity}
            </Text>
            <Text style={styles.itemSubtotal}>{formatCurrency(getItemTotal(item))}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: {formatCurrency(order.total)}</Text>
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
  orderCard: {
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
  },
  orderTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  createdAt: {
    marginTop: 6,
    color: colors.inactiveTab,
    fontSize: 13,
    fontWeight: '600',
  },
  items: {
    marginTop: 12,
    gap: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  itemSubtotal: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  total: {
    marginTop: 14,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
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
