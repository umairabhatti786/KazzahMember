import React, {useEffect} from 'react';
import {Screen, Text, View} from 'ui';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import SwitchToggle from 'react-native-switch-toggle';
import {useColorScheme} from 'nativewind';
import {getItem, setItem} from 'core/Auth/utils';
import {ThemeModes} from 'utils/constants';

const moonIcon = require('../../assets/moonIcon.png');
const SunIcon = require('../../assets/ProfileFlowIcons/SunIcon.png');

export const DisplayScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [on, setOn] = React.useState(
    getItem('Theme') as 'system' | 'dark' | 'light',
  );

  const {colorScheme, setColorScheme} = useColorScheme();

  const setTheme = (value: 'system' | 'dark' | 'light') => {
    setItem('Theme', value);
    setColorScheme(value);
    setOn(value);
  };

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}
    >
      <BackButtonHeader showSave={false} showPages={false} />
      <Title title="Display" />

      <View height={scale(15)} />
      <ScrollView contentContainerStyle={{paddingBottom: scale(50)}}>
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              width: '88%',
              paddingLeft: scale(10),
              paddingRight: scale(5),
              alignSelf: 'center',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View flexDirection={'row'}>
              <Text
                style={[
                  textStyle.b3,
                  {color: colors.black, width: '70%', lineHeight: scale(18)},
                ]}
              >
                Use the Light and Dark settings found in your Device Settings.
              </Text>
              <View style={{width: '30%', alignItems: 'flex-end'}}>
                <SwitchToggle
                  switchOn={on == 'system'}
                  onPress={() => {
                    if (on == 'system') {
                      setTheme('light');
                    } else {
                      setTheme('system');
                    }
                  }}
                  circleColorOn={colors.background}
                  circleColorOff={colors.background}
                  backgroundColorOn={colors.black}
                  backgroundColorOff={colors.gallery}
                  containerStyle={{
                    width: scale(42),
                    height: scale(25),
                    borderRadius: scale(25),
                    padding: scale(5),
                  }}
                  circleStyle={{
                    width: scale(18),
                    height: scale(18),
                    borderRadius: scale(50),
                  }}
                />
              </View>
            </View>
          </View>
          {on != 'system' && (
            <Wrapper
              animation="fadeInUp"
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  height: scale(200),
                  width: '100%',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setTheme('light');
                  }}
                  style={styles.containerStyle}
                >
                  <Image
                    style={styles.imageStyle}
                    resizeMode="cover"
                    source={SunIcon}
                  />
                  <Text style={[textStyle.b5, {color: colors.black}]}>
                    Light mode
                  </Text>
                  <View style={styles.circleContainer}>
                    {colorScheme != 'dark' && (
                      <View style={styles.innerCircleContainer} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTheme('dark');
                  }}
                  style={styles.containerStyle}
                >
                  <Image
                    style={styles.imageStyle}
                    resizeMode="cover"
                    source={moonIcon}
                  />
                  <Text style={[textStyle.b5, {color: colors.black}]}>
                    Dark mode
                  </Text>
                  <View style={styles.circleContainer}>
                    {colorScheme == 'dark' && (
                      <View style={styles.innerCircleContainer} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </Wrapper>
          )}
        </Wrapper>
      </ScrollView>
    </Screen>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    imageStyle: {
      height: scale(20),
      width: scale(20),
    },
    containerStyle: {
      height: scale(120),
      width: scale(140),
      paddingVertical: scale(13),
      borderRadius: scale(10),
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: colors.container,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 8,
    },
    circleContainer: {
      height: scale(20),
      width: scale(20),
      borderRadius: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.black,
    },
    innerCircleContainer: {
      height: scale(8),
      width: scale(8),
      backgroundColor: colors.background,
      borderRadius: scale(50),
    },
  });
