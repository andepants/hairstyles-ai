import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot, Stack, usePathname, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/', // Ensure the initial route is correctly defined
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const pathname = usePathname();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (pathname == "/firebaseauth/link") router.back();
  }, [pathname]);

  const onAuthStateChanged = (user) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (initializing) {
      return;
    }
    const inAuthGroup = segments[0] === '(auth)';
    const isModal = segments[0] === 'modal';
    if (user && !inAuthGroup && !isModal) {
      router.replace('/(auth)');
    } else if (!user && inAuthGroup) {
      router.replace('/signin')
    }
  }, [user, initializing, segments]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
            name="signin"
            options={{
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (router.canGoBack()) {
                        router.back();
                      }
                    }}
                    style={{ marginLeft: 10 }}
                  >
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                );
              },
              headerTitle: 'HairStyles.AI',
              headerTitleAlign: 'center',
            }}
          />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
