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
        title: 'Profile',
        headerRight: () => (
          segments[segments.length - 1] !== "profile-edit" && (
            <TouchableOpacity onPress={() => router.push("../profile/profile-edit")}>
              <IconSymbol size={24} name="pencil" color={Colors[colorScheme ?? 'light'].tint} />
            </TouchableOpacity>
          )
        ),

       }} />
      <Stack.Screen name="profile-edit" options={{ title: 'Edit Profile' }} />
    </Stack>
  );
}
