import React, { memo, useState, useRef, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { theme } from '../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Componente memoizado para la imagen del carrusel
const CarouselImage = memo(({ uri }) => (
  <Image
    source={{ uri }}
    style={styles.cardImage}
    resizeMode="cover"
  />
));

// Componente memoizado para el indicador de puntos
const DotIndicator = memo(({ index, currentIndex }) => (
  <View
    style={[styles.dot, currentIndex === index && styles.dotActive]}
  />
));

function CardComponent({
  title,
  description,
  images = [],
  date,
  location,
  onPress,
  style,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Asegurarse de que images sea un array
  const imageArray = Array.isArray(images) ? images : [images];

  const handleScroll = useCallback((e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  }, []);

  const renderItem = useCallback(({ item }) => (
    <CarouselImage uri={item} />
  ), []);

  const keyExtractor = useCallback((_, idx) => `card-img-${idx}`, []);

  const getItemLayout = useCallback((_, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  }), []);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardImageContainer}>
        <FlatList
          ref={flatListRef}
          data={imageArray}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate={0}
          snapToAlignment="center"
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={3}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          initialScrollIndex={0}
          scrollEventThrottle={16}
          directionalLockEnabled={true}
          disableIntervalMomentum={true}
          disableScrollViewPanResponder={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        {imageArray.length > 1 && (
          <View style={styles.dotsContainer}>
            {imageArray.map((_, idx) => (
              <DotIndicator key={idx} index={idx} currentIndex={currentIndex} />
            ))}
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{date}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const Card = memo(CardComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.medium,
    marginBottom: theme.spacing.md,
    marginHorizontal: -20,
  },
  cardImageContainer: {
    width: '100%',
    height: 460,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
  },
  cardImage: {
    width: SCREEN_WIDTH,
    height: 460,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  content: {
    padding: 0,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 2,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 1,
    fontSize: 11,
    lineHeight: 13,
    maxHeight: 15,
    minHeight: 0,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
}); 