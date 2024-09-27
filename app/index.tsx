import React, { useState, useEffect } from 'react';
import { Button, TextInput, SafeAreaView, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { usePathname, useRouter } from 'expo-router';

const index = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname == "/firebaseauth/link") router.back();
  }, [pathname]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (initializing) return null;

  if (!user) {
    if (!confirm) {
      return (
        <SafeAreaView>
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber('+1 805-434-7229')}
          />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </SafeAreaView>
    );

  }
  return (
    <SafeAreaView>
      <Text>Welcome {user.phoneNumber}</Text>
    </SafeAreaView>
  );
}

export default index