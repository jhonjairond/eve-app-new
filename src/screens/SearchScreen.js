import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { Card } from '../components/Card';
import { CategoryChip } from '../components/CategoryChip';
import { mockEvents as allEvents } from './HomeScreen';
import { useNavigation } from '@react-navigation/native';

const categories = [
  'Todos',
  'Hoy',
  'Música',
  'Deportes',
  'Gastronomía',
  'Arte',
  'Tecnología',
  'Negocios',
  'Religioso',
  'Político',
  'Infantil',
];

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  // Filtrar eventos por búsqueda y categoría
  const filteredEvents = allEvents.filter(event => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Events</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.textLight}
            returnKeyType="search"
            onSubmitEditing={() => {}}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
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

      <ScrollView style={[styles.eventsContainer, { marginTop: 10 }]}>
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            description={event.description}
            images={event.images}
            date={event.date}
            location={event.location}
            onPress={() => navigation.navigate('EventDetail', { event })}
            style={styles.eventCard}
          />
        ))}
        {filteredEvents.length === 0 && (
          <Text style={{ color: theme.colors.textLight, textAlign: 'center', marginTop: 32 }}>
            No events found.
          </Text>
        )}
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
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: 0,
  },
  categoryChip: {
    marginRight: theme.spacing.sm,
  },
  eventsContainer: {
    padding: theme.spacing.lg,
  },
  eventCard: {
    marginBottom: theme.spacing.md,
  },
}); 