import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      ...(variant === 'secondary' && styles.secondaryButton),
      ...(variant === 'outline' && styles.outlineButton),
      ...(size === 'small' && styles.smallButton),
      ...(size === 'large' && styles.largeButton),
      ...(disabled && styles.disabledButton),
    };
    return [baseStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...styles.text,
      ...(variant === 'secondary' && styles.secondaryText),
      ...(variant === 'outline' && styles.outlineText),
      ...(size === 'small' && styles.smallText),
      ...(size === 'large' && styles.largeText),
      ...(disabled && styles.disabledText),
    };
    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getButtonStyle()}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  smallButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  largeButton: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
    ...theme.shadows.small,
  },
  text: {
    color: theme.colors.background,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  secondaryText: {
    color: theme.colors.background,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  smallText: {
    fontSize: theme.typography.caption.fontSize,
  },
  largeText: {
    fontSize: theme.typography.h3.fontSize,
  },
  disabledText: {
    color: theme.colors.textLight,
  },
}); 