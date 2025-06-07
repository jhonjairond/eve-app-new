import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://picsum.photos/200',
  bio: 'Event enthusiast and organizer',
  events: [
    {
      id: '1',
      title: 'Summer Music Festival',
      description: 'Join us for a day of amazing music and fun activities',
      images: ['https://picsum.photos/200/300'],
      date: '2024-07-15',
      location: 'Central Park, NY',
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      description: 'Learn about the latest trends in technology',
      images: ['https://picsum.photos/200/300'],
      date: '2024-08-20',
      location: 'Convention Center, SF',
    },
  ],
};

export const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{mockUser.name}</Text>
            <Text style={styles.email}>{mockUser.email}</Text>
          </View>
        </View>
        <Text style={styles.bio}>{mockUser.bio}</Text>
        <Button
          title="Edit Profile"
          variant="outline"
          onPress={() => {}}
          style={styles.editButton}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {mockUser.events.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            description={event.description}
            images={event.images}
            date={event.date}
            location={event.location}
            onPress={() => {}}
            style={styles.eventCard}
          />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
          <Text style={styles.settingText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="lock-closed-outline" size={24} color={theme.colors.text} />
          <Text style={styles.settingText}>Privacy</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
          <Text style={styles.settingText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
        </TouchableOpacity>

        <Button
          title="Sign Out"
          variant="secondary"
          onPress={() => {}}
          style={styles.signOutButton}
        />
      </View>
    </ScrollView>
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textLight,
  },
  bio: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  editButton: {
    marginTop: theme.spacing.sm,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  seeAll: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary,
  },
  eventCard: {
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingText: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  signOutButton: {
    marginTop: theme.spacing.xl,
  },
}); 