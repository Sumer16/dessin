import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  const [ channel, setChannel ] = useState('1');

  const onJoin = () => {
    router.push({ pathname: '/channel/[channel]', params: { channel: `${channel}` }})
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello There!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          value={channel}
          onChangeText={setChannel}
          style={styles.input}
          inputMode='numeric'
        />
        <TouchableOpacity onPress={onJoin} style={styles.button}>
          <ThemedText type="subtitle">Join</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Enter channel identifier</ThemedText>
        <ThemedText>
          Enter any number as an identifier for the channel so that others can join it. 
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Share & Play</ThemedText>
        <ThemedText>
          Share & play in real-time, each user has a random color as an identifier.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    borderColor: '#808080',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#2E8A58',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
  }
});
