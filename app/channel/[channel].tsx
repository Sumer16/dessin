import 'react-native-url-polyfill/auto';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import DrawingBoard from '@/components/DrawingBoard';

import { createClient, RealtimeChannel } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);

const randomUsername = `user-${Math.floor(Math.random() * 1000)}`;
const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export default function ChannelId() {
  const { channel } = useLocalSearchParams();
  const [ broadcastChannel, setBroadcastChannel ] = useState<RealtimeChannel | null>(null);
  const [ isConnected, setIsConnected ] = useState<boolean>(false);

  useEffect(() => {
    if (!channel || isConnected) return;

    const newChannel = supabaseClient.channel(`drawing-${channel}`);
    setBroadcastChannel(newChannel);

    const subscription = newChannel.on('broadcast', { event: 'start' }, ({ payload }) => {
      console.log('Received start event', payload);
    })
    .on('broadcast', { event: 'active' }, ({ payload }) => {
      console.log('Received active event', payload);
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setIsConnected(true);
      }
    });

    return () => {
      subscription.unsubscribe();
      newChannel.unsubscribe();
    }
  }, [channel]);

  const onDrawingStart = (x: number, y: number) => {
    broadcastChannel?.send({
      type: 'broadcast',
      event: 'start',
      payload: { x, y, color: randomColor, user: randomUsername },
    });
  };

  const onDrawingActive = (x1: number, y1: number, x2: number, y2: number) => {
    broadcastChannel?.send({
      type: 'broadcast',
      event: 'active',
      payload: { x1, y1, x2, y2, user: randomUsername },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ title: `Channel ${channel} - #${randomUsername}` }} />
      {
        isConnected && (
          <DrawingBoard onStart={onDrawingStart} onActive={onDrawingActive} />
        )
      }
    </View>
  );
}
