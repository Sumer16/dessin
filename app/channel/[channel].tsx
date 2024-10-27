import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function ChannelId() {
  const { channel } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: `Channel ${channel}` }} />
    </>
  );
}