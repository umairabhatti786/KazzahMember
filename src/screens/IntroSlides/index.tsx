import React from 'react';
import {Screen, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import {Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import textStyle from 'theme/typoGraphy';
import AppLogo from 'newComponents/AppLogo';
import Button from 'newComponents/Button';

export const IntroSlides = props => {
  const {colors} = useTheme();

  const introSlides = [
    {
      image: require('../../assets/appIntroSlider1.png'),
      title: 'All your Pros and your Friends Pros in one place',
      description:
        'Trusted resources to get things done efficiently and confidently',
    },
    {
      image: require('../../assets/appIntroSlide2.png'),
      title: 'Access to all your pros in one platform',
      description:
        'Chat, book and capture authentic images of services with all your pros in one place',
    },
    {
      image: require('../../assets/appIntroSlider3.png'),
      title: 'One payment platform for all your pros',
      description:
        'Easy check-outs and organized payments history to all your Pros.',
    },
    {
      image: require('../../assets/appIntroSlider4.png'),
      title: 'See your friends trusted Pros',
      description:
        'Discover Pros from your local connections.',
    },
    {
      image: require('../../assets/appIntroSlider5.png'),
      title: 'Follow the work of your trusted Pros',
      description:
        'Stay on top of the latest projects your Pros complete.',
    },
  ];

  return (
    <Screen backgroundColor={colors.background}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{alignItems: 'center', marginTop: '5%'}}>
          <Pressable onPress={() => props.navigation.navigate('SettingUp')}>
            <AppLogo />
          </Pressable>
        </View>
        <Swiper
          autoplayTimeout={5}
          autoplay={true}
          showsPagination={true}
          renderPagination={(index, total) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  bottom: '8%',
                }}>
                {introSlides.map((item: any, i: any) => {
                  return (
                    <View
                      key={i.toString()}
                      style={{
                        height: scale(6),
                        width: scale(6),
                        borderRadius: 70,
                        backgroundColor:
                          i == index ? colors.black : colors.black + '1A',
                        alignSelf: 'center',
                        marginHorizontal: 10,
                      }}
                    />
                  );
                })}
              </View>
            );
          }}>
          {introSlides.map(e => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <View
                  style={{marginTop: scale(15)}}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'66%'}
                  width={'90%'}>
                  <FastImage
                    style={{height: verticalScale(330), width: scale(300)}}
                    source={e.image}
                  />
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                  {/* <View height={verticalScale(5)} /> */}
                  <Text
                    style={[
                      textStyle.h2,
                      textStyle.center,
                      {color: colors.black, fontSize: scale(30), width: '90%'},
                    ]}>
                    {e.title}
                  </Text>
                  <View height={verticalScale(5)} />
                  <Text
                    style={[
                      textStyle.b3,
                      textStyle.center,
                      {
                        width: '90%',
                        color: colors.black,
                      },
                    ]}>
                    {e.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </Swiper>

        <Button
          onPress={() => props.navigation.navigate('AddMobileNumber')}
          label={'Create Account'}
        />
        <Button
          onPress={() => props.navigation.navigate('Login')}
          variant="secondary"
          label={'Sign in'}
        />
      </View>
    </Screen>
  );
};
