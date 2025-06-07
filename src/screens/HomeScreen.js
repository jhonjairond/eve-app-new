import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { Card } from '../components/Card';
import { CategoryChip } from '../components/CategoryChip';
import { SafeAreaView } from 'react-native-safe-area-context';
import eveLogo from '../../assets/eve-logo.png';
import { useNavigation } from '@react-navigation/native';

export const categories = [
  'All',
  'Music',
  'Sports',
  'Food',
  'Art',
  'Technology',
  'Business',
  'Religious',
  'Political',
  'Childrens',
];

// Asignar categorías a los eventos de ejemplo de forma distribuida
const eventCategories = categories.slice(1); // Excluye 'All'
export const mockEvents = Array.from({ length: 50 }, (_, i) => {
  const category = eventCategories[i % eventCategories.length];
  return {
    id: (i + 1).toString(),
    title: `Evento ${i + 1}`,
    description: `Descripción del evento ${i + 1}`,
    images: Array.from({ length: (i % 3) + 1 }, (_, j) => `https://picsum.photos/800/600?random=${i * 3 + j + 1}`),
    imageUrl: `https://picsum.photos/400/220?random=${i * 3 + 1}`,
    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String(((i * 3) % 28) + 1).padStart(2, '0')}`,
    location: `Ubicación ${i + 1}`,
    category,
  };
});

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH / 3;

export const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const flatListRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigation = useNavigation();

  // Obtener la primera imagen de cada evento para el carrusel superior
  const bannerImages = mockEvents.map(event => (event.images && event.images.length > 0 ? event.images[0] : event.imageUrl));
  const totalImages = bannerImages.length;

  // Loop infinito: cuando llegamos al final, volvemos al inicio
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex > totalImages) {
          // Volver al inicio
          flatListRef.current?.scrollToIndex({ index: 0, animated: false });
          return 0;
        } else {
          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [totalImages]);

  // Asegura que siempre se vean 3 imágenes completas a la vez
  const getItemLayout = (_, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  // Duplicar las primeras 3 imágenes al final para el loop visual
  const carouselData = [...bannerImages, ...bannerImages.slice(0, 3)];

  // Filtrar eventos según la categoría seleccionada
  const filteredEvents = selectedCategory === 'All'
    ? mockEvents
    : mockEvents.filter(event => event.category === selectedCategory);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.buttonContainer}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="add" size={24} color={theme.colors.text} />
            </View>
          </TouchableOpacity>
          <Image source={eveLogo} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity 
            style={styles.buttonContainer}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="location-outline" size={24} color={theme.colors.text} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Carrusel superior */}
      <View style={styles.carouselWrapper}>
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={carouselData}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            getItemLayout={getItemLayout}
            initialScrollIndex={0}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item }) => (
              <View style={styles.carouselImageWrapper3}>
                <Image
                  source={{ uri: item }}
                  style={styles.carouselImage3}
                  resizeMode="cover"
                />
              </View>
            )}
            keyExtractor={(_, idx) => `carousel-img-${idx}`}
            windowSize={5}
            maxToRenderPerBatch={5}
          />
        </View>
      </View>

      {/* Barra de categorías */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}
            />
          ))}
        </ScrollView>
      </View>

      {/* Contenido principal */}
      <ScrollView 
        style={styles.mainScroll}
        contentContainerStyle={styles.mainContent}
      >
        <View style={styles.eventsContainer}>
          {filteredEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <Card
                title={event.title}
                description={event.description}
                images={event.images}
                date={event.date}
                location={event.location}
                onPress={() => navigation.navigate('EventDetail', { event })}
                style={{ marginBottom: 0, marginTop: 8 }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: theme.colors.background,
    height: 50,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 0,
  },
  buttonContainer: {
    width: 50,
    height: '100%',
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    padding: theme.spacing.sm,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChip: {
    marginRight: theme.spacing.sm,
  },
  eventsContainer: {
    padding: theme.spacing.lg,
    marginTop: 0,
    flex: 1,
  },
  eventCard: {
    marginBottom: theme.spacing.md,
  },
  cardImageList: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.card,
  },
  cardImage: {
    width: SCREEN_WIDTH - 32,
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginRight: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 3,
    opacity: 0.5,
  },
  dotActive: {
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  categoriesWrapper: {
    backgroundColor: theme.colors.background,
    zIndex: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  carouselWrapper: {
    marginTop: 10,
    backgroundColor: theme.colors.background,
  },
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    height: 126,
  },
  carouselContent: {
    alignItems: 'center',
  },
  categoriesScroll: {
    flexGrow: 0,
  },
  carouselImageWrapper3: {
    width: ITEM_WIDTH,
    height: 126,
    paddingHorizontal: 4,
  },
  carouselImage3: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  mainScroll: {
    flex: 1,
  },
  mainContent: {
    flexGrow: 1,
  },
}); 