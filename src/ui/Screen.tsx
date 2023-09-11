import React from 'react';
import {StatusBarStyle, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export type Edge = 'top' | 'right' | 'bottom' | 'left';

type Props = {
  children: React.ReactNode;
  barStyle?: StatusBarStyle;
  backgroundColor?: ViewStyle['backgroundColor'];
  statusBarColor?: string;
  edges?: ReadonlyArray<Edge>;
};

export const Screen = ({
  children,
  barStyle,
  statusBarColor,
  backgroundColor,
  edges,
}: Props) => {
  return (
    <SafeAreaView
      edges={edges}
      style={{
        flex: 1,
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
      }}
    >
      {/* <StatusBar
        barStyle={theme != 'light' ? 'light-content' : 'dark-content'}
        backgroundColor={theme == 'light' ? 'white' : 'black'}
      /> */}
      {children}
    </SafeAreaView>
  );
};
