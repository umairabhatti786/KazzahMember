import React from 'react';
import {Screen, Text, View} from 'ui';
import {ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import textStyle from 'theme/typoGraphy';
import {scale, verticalScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

export const AboutKazzah = () => {
  const {colors} = useTheme();

  const introSlides = [
    {
      image: require('../../assets/appIntroSlide1.png'),
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
      image: require('../../assets/appIntroSlide3.png'),
      title: 'One payment platform for all your pros',
      description:
        'Easy check-outs and organized payments history to all your Pros.',
    },
  ];

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <BackButtonHeader showPages={false} />
      <Title title="About Kazzah" />
      <ScrollView contentContainerStyle={{paddingBottom: scale(50)}}>
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: scale(30),
            }}>
            <View height={scale(10)} />

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
                    <View height={verticalScale(5)} />
                    <Text
                      style={[
                        textStyle.h2,
                        textStyle.center,
                        {
                          color: colors.black,
                          fontSize: scale(30),
                          width: '90%',
                        },
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
          </ScrollView>
        </Wrapper>
      </ScrollView>
    </Screen>
  );
};
