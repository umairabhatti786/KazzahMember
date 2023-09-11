import * as React from 'react';
import {
  NavigationContainer as RNNavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, useColorScheme as useColorSchemeRN} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from 'ui';
import {ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {setCurrentScreen} from 'reducers/authReducer';
import {darkTheme, lightTheme} from 'theme/colors';
import store from 'store';
import {setIsDarkModeEnabled} from 'reducers/configurationReducer';
import {useColorScheme} from 'nativewind';
import {getItem} from 'core/Auth/utils';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const navigationRef = createNavigationContainerRef();

const linking = {
  prefixes: ['kazzah://'],
};

export const NavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {navigation} = useTheme<Theme>();

  const dispatch = useDispatch();

  const {colorScheme, setColorScheme} = useColorScheme();

  const scheme = useColorSchemeRN();

  React.useEffect(() => {
    setColorScheme(getItem('Theme'));
    changeNavigationBarColor(
      colorScheme == 'dark' ? '#000000' : '#ffffff',
      colorScheme == 'light',
    );
  }, [scheme, colorScheme]);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme == 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme == 'dark' ? '#000000' : '#ffffff'}
      />
      <RNNavigationContainer
        onStateChange={() => {
          const currentRouteName = navigationRef?.current?.getCurrentRoute()
            ?.name;
          if (currentRouteName) dispatch(setCurrentScreen(currentRouteName));
        }}
        linking={linking}
        fallback={<ActivityIndicator color="blue" size="large" />}
        theme={colorScheme == 'dark' ? darkTheme : lightTheme}
        ref={navigationRef}
      >
        {children}
      </RNNavigationContainer>
    </SafeAreaProvider>
  );
};
