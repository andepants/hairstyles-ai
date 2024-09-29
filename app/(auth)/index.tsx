import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function TabOneScreen() {
  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
