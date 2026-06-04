import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import ReviewCard from '@/components/ReviewCard';
import { colors } from '@/constants/colors';
import { fetchReviews } from '@/services/reviewsApi';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const loadedReviews = await fetchReviews();

        if (isMounted) {
          setReviews(loadedReviews);
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load reviews.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderReviewItem = useCallback(({ item }) => {
    return <ReviewCard name={item.name} email={item.email} body={item.body} />;
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.feedback}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.feedbackText}>Loading reviews...</Text>
        </View>
      ) : null}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={loading || error ? [] : reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
        ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  reviewSeparator: {
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
});
