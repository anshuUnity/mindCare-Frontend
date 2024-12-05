// app/(tabs)/profile/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function ProfileStackLayout() {

  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ 
        title: 'Doctors',

       }} />
    </Stack>
  );
}
