import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '@/constants/colors';
import CustomButton from './CustomButton';

function ProductCard({ title, price, imageUrl, onPress, onAddToCart }) {
  const { width } = useWindowDimensions();
  // Keep cards fluid on small screens while capping their width on wider layouts.
  const cardWidth = Math.min(width - 32, 420);

  if (__DEV__) {
    console.log('ProductCard render:', title);
  }

  return (
    <Pressable style={[styles.card, { width: cardWidth }]} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.price}>${price}</Text>
      </View>

      <View style={styles.action}>
        <CustomButton title="Add" onPress={onAddToCart} />
      </View>
    </Pressable>
  );
}

// Memo keeps unchanged coffee cards from re-rendering when parent state changes.
export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: colors.secondaryBackground,
  },
  info: {
    flex: 1,
    marginHorizontal: 14,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  price: {
    marginTop: 6,
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  action: {
    width: 84,
  },
});
