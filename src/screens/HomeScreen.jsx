import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import CategoryChip from '@/components/CategoryChip';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { SCREENS } from '@/navigation/screens';
import { fetchCoffeeMenu } from '@/services/coffeeApi';
import { addItem } from '@/store/cartSlice';

const categories = ['All', 'Latte', 'Cappuccino', 'Espresso'];

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(
      () => () => {
        setSelectedProduct('');
      },
      []
    )
  );

  useEffect(() => {
    let isMounted = true;

    async function loadCoffeeMenu() {
      try {
        // Load coffee data from the API when the screen first mounts.
        const menu = await fetchCoffeeMenu();

        if (isMounted) {
          setCoffees(menu);
          setError('');
        }
      } catch (loadError) {
        // Keep the error message in state so the screen can show it to the user.
        if (isMounted) {
          setError(loadError.message || 'Unable to load coffee menu.');
        }
      } finally {
        // Stop the loading state after either a successful request or an error.
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCoffeeMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize the filtered list so FlatList gets stable data when filters have not changed.
  const visibleCoffees = useMemo(() => coffees.filter((coffee) => {
    const matchesCategory = activeCategory === 'All' || coffee.category === activeCategory;
    const matchesSearch = coffee.title.toLowerCase().includes(searchValue.toLowerCase());

    return matchesCategory && matchesSearch;
  }), [activeCategory, coffees, searchValue]);

  // Stable handlers avoid unnecessary child renders when only unrelated state changes.
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setSelectedProduct('');
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setSelectedProduct('');
  }, []);

  const renderCoffeeItem = useCallback(({ item }) => {
    return (
      <ProductCard
        title={item.title}
        price={item.price}
        imageUrl={item.imageUrl}
        onPress={() =>
          navigation.navigate(SCREENS.PRODUCT_DETAILS, {
            id: item.id,
            title: item.title,
            price: item.price,
            imageUrl: item.imageUrl,
            description: item.description,
          })
        }
        onAddToCart={() => {
          // Home uses Redux to add products to the shared cart from any screen.
          dispatch(
            addItem({
              id: item.id,
              title: item.title,
              price: item.price,
              imageUrl: item.imageUrl,
              size: 'M',
            })
          );
          setSelectedProduct(item.title);
        }}
      />
    );
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.appShell}>
        <View style={styles.section}>
          <SearchBar value={searchValue} onChangeText={handleSearchChange} placeholder="Search coffee..." />
        </View>

        <View style={styles.categoryWrapper}>
          <ScrollView
            horizontal
            style={styles.categoryScroll}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <CategoryChip
                key={category}
                title={category}
                active={activeCategory === category}
                onPress={() => handleCategoryChange(category)}
              />
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <View style={styles.feedback}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.feedbackText}>Loading coffee menu...</Text>
          </View>
        ) : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FlatList
          data={loading || error ? [] : visibleCoffees}
          keyExtractor={(item) => item.id}
          renderItem={renderCoffeeItem}
          ItemSeparatorComponent={() => <View style={styles.productSeparator} />}
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />

        {selectedProduct ? (
          <Text style={styles.cartMessage}>{selectedProduct} added to cart</Text>
        ) : null}
      </View>
    </View>
  );
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
  content: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  section: {
    alignSelf: 'stretch',
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 18,
    backgroundColor: colors.background,
  },
  categoryWrapper: {
    alignSelf: 'stretch',
    backgroundColor: colors.secondaryBackground,
  },
  categoryScroll: {
    maxHeight: 72,
  },
  categories: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  productSeparator: {
    height: 14,
  },
  feedback: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  feedbackText: {
    marginTop: 10,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cartMessage: {
    marginTop: 18,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
