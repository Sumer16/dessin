import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import DrawingBoard from '@/components/DrawingBoard';

export default function ChannelId() {
  const { channel } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ title: `Channel ${channel}` }} />
      <DrawingBoard />
    </View>
  );
}
