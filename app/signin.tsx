import React, { useState } from 'react';
import { Button, TextInput, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import Flatted from 'flatted';

const SignIn = () => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('805-434-7229');
  const [countryCode, setCountryCode] = useState('+1'); // Default to US country code
  const router = useRouter();

  function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    };
  }

  async function signInWithPhoneNumber(phoneNumber) {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>HairStyles.AI</Text>
      {!confirm ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your phone number:</Text>
          <View style={styles.phoneInputContainer}>
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue) => setCountryCode(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="+1" value="+1" />
              <Picker.Item label="+44" value="+44" />
              <Picker.Item label="+91" value="+91" />
              <Picker.Item label="+61" value="+61" />
              <Picker.Item label="+81" value="+81" />
              <Picker.Item label="+49" value="+49" />
              <Picker.Item label="+33" value="+33" />
              <Picker.Item label="+39" value="+39" />
              <Picker.Item label="+86" value="+86" />
              <Picker.Item label="+7" value="+7" />
              <Picker.Item label="+34" value="+34" />
              <Picker.Item label="+55" value="+55" />
              <Picker.Item label="+27" value="+27" />
              <Picker.Item label="+82" value="+82" />
              <Picker.Item label="+31" value="+31" />
              <Picker.Item label="+47" value="+47" />
              <Picker.Item label="+46" value="+46" />
              <Picker.Item label="+41" value="+41" />
              <Picker.Item label="+52" value="+52" />
              <Picker.Item label="+65" value="+65" />
              <Picker.Item label="+60" value="+60" />
              <Picker.Item label="+63" value="+63" />
              <Picker.Item label="+62" value="+62" />
              <Picker.Item label="+64" value="+64" />
              {/* Add more country codes as needed */}
            </Picker>
            <TextInput
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(formatPhoneNumber(text))}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={styles.phoneNumberInput}
              placeholderTextColor="#888"
            />
          </View>
          <Button
            title="Continue"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
            color="#000"
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            value={code}
            onChangeText={text => setCode(text)}
            placeholder="Verification Code"
            keyboardType="number-pad"
            style={styles.verificationInput}
            placeholderTextColor="#888"
          />
          <Button title="Confirm Code" onPress={() => confirmCode()} color="#000" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#000',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    width: 100, // Adjust the width as needed
    color: '#000',
  },
  phoneNumberInput: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    color: '#000',
    fontSize: 20
  },
  verificationInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    marginBottom: 20,
    color: '#000',
  },
});

export default SignIn;
