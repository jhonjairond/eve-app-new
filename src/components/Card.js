import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function CardComponent({
  title,
  description,
  images = [],
  date,
  location,
  onPress,
  style,
}) {
  // Tomar la primera imagen del array o usar la única imagen disponible
  const imageUrl = Array.isArray(images) ? images[0] : images;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
        />
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
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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