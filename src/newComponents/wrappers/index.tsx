import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {appStyles, colors, sizes} from 'utils';

export const MainWrapper = props => {
  const {children, style, animation} = props;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animatable.View
        animation={animation}
        style={[appStyles.mainContainer, style]}
        useNativeDriver
      >
        {children}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};
export const MainWrapperPrimary = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      animation={animation}
      style={[styles.mainWrapperPrimary, style]}
      useNativeDriver
    >
      {children}
    </Animatable.View>
  );
};
export const ImageBackgroundWrapper = props => {
  const {children, style, source} = props;
  return (
    <ImageBackground source={source} style={[appStyles.bgContainer, style]}>
      {children}
    </ImageBackground>
  );
};
export const MaterialBackgroundWrapper = props => {
  const {children, style, source} = props;
  return (
    <ImageBackgroundWrapper source={source}>
      <MainWrapper
        style={[{backgroundColor: colors.appColor1Transparent}, style]}
      >
        {children}
      </MainWrapper>
    </ImageBackgroundWrapper>
  );
};

export const MainWrapperMatrial = props => {
  const {children, style, animation, primaryColor, secondryColor, flex} = props;
  const defaultWrapperRadius = sizes.wrapperRadius;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation}
      style={[
        appStyles.mainContainer,
        {
          flex: flex ? flex : 1,
          backgroundColor: primaryColor ? primaryColor : colors.appColor1,
        },
        style,
      ]}
    >
      <View
        style={[
          appStyles.mainContainer,
          {
            backgroundColor: secondryColor ? secondryColor : colors.appBgColor1,
            borderBottomLeftRadius: defaultWrapperRadius,
            borderBottomRightRadius: defaultWrapperRadius,
          },
        ]}
      >
        {children}
      </View>
    </Animatable.View>
  );
};
export const Wrapper = ({
  children,
  style,
  animation,
  flex,
  duration,
  iterationCount,
  direction,
}) => {
  return (
    <Animatable.View
      useNativeDriver
      iterationCount={iterationCount}
      direction={direction}
      animation={animation}
      duration={duration}
      style={[{flex: flex}, style]}
    >
      {children}
    </Animatable.View>
  );
};
export const ComponentWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation}
      style={[appStyles.compContainer, styles.removerMarginVertical, style]}
    >
      {children}
    </Animatable.View>
  );
};

export const RowWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation}
      style={[appStyles.rowCompContainer, styles.removerMarginVertical, style]}
    >
      {children}
    </Animatable.View>
  );
};
export const RowWrapperBasic = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation}
      style={[appStyles.rowView, style]}
    >
      {children}
    </Animatable.View>
  );
};
export const CardWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation}
      style={[appStyles.cardView, {borderRadius: sizes.cardRadius}, style]}
    >
      {children}
    </Animatable.View>
  );
};
export const AbsoluteWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation}
      style={[{position: 'absolute'}, style]}
    >
      {children}
    </Animatable.View>
  );
};
export const FooterWrapperPrimary = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation ? animation : 'fadeInUpBig'}
      style={[styles.footerWrapperPrimary, style]}
    >
      {children}
    </Animatable.View>
  );
};
export const HeaderWrapperPrimary = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      useNativeDriver
      animation={animation ? animation : 'fadeInDown'}
      style={[styles.headerWrapperPrimary, style]}
    >
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  mainWrapperPrimary: {
    ...appStyles.mainContainer,
    backgroundColor: colors.appBgColorPrimary,
  },
  removerMarginVertical: {
    marginVertical: null,
  },
  footerWrapperPrimary: {
    ...appStyles.mainContainer,
    borderTopLeftRadius: sizes.wrapperRadius,
    borderTopRightRadius: sizes.wrapperRadius,
  },
  headerWrapperPrimary: {
    // ...appStyles.mainContainer,
    // borderTopLeftRadius:sizes.wrapperRadius,
    // borderTopRightRadius:sizes.wrapperRadius
  },
});
