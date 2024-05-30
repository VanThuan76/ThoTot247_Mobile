import '~/global.css';
import * as React from 'react';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeToggle } from '~/components/ThemeToggle';
import { PortalHost } from '~/components/primitives/portal';
import AuthWrapper from '~/components/AuthWrapper';

import { useColorScheme } from '@shared/lib/useColorScheme';
import { persistor, store } from '@shared/providers/redux';
import { NAV_THEME } from '@shared/lib/constants';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};
const queryClient = new QueryClient();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [colorScheme, setColorScheme] = React.useState('light');

  const { isDarkColorScheme } = useColorScheme();
  const [isFontLoaded, setIsFontLoaded] = React.useState(false);
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load font
        await Font.loadAsync({
          'roboto-regular': require('~/assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold': require('~/assets/fonts/Roboto-Bold.ttf'),
        });

        // Load other resources/data
        const theme = await AsyncStorage.getItem('theme');
        if (!theme) {
          AsyncStorage.setItem('theme', colorScheme);
          setIsColorSchemeLoaded(true);
          return;
        }
        const colorTheme = theme === 'dark' ? 'dark' : 'light';
        setColorScheme(colorTheme);
        setIsColorSchemeLoaded(true);
      } catch (error) {
        // Handle font loading error
        console.error('Error loading fonts:', error);
      } finally {
        setIsFontLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isFontLoaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <AuthWrapper>
              <Stack initialRouteName='(tabs)'
                screenOptions={{
                  headerBackTitle: 'Back',
                  // headerTitle(props) {
                  //   return <Text className='text-xl font-semibold'>{toOptions(props.children)}</Text>;
                  // },
                  headerRight: () => <ThemeToggle />,
                }}
              >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ title: 'Thợ Tốt 247', headerRight: () => <ThemeToggle /> }} />
              </Stack>
              <PortalHost />
            </AuthWrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

