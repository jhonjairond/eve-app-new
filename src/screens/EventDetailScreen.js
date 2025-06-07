import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { theme } from '../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const EventDetailScreen = ({ route }) => {
  const { event } = route.params;
  const images = Array.isArray(event.images) ? event.images : [event.images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          keyExtractor={(_, idx) => `img-${idx}`}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          )}
        />
        {images.length > 1 && (
          <View style={styles.dotsContainer}>
            {images.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, currentIndex === idx && styles.dotActive]}
              />
            ))}
          </View>
        )}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xl,
  },
  carouselContainer: {
    width: '100%',
    height: 320,
    marginBottom: theme.spacing.lg,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 320,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
    opacity: 0.5,
  },
  dotActive: {
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  infoSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  date: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  location: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  category: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
}); 