import React from 'react';
import {Screen, Text, View} from 'ui';
import {ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import textStyle from 'theme/typoGraphy';
import {scale} from 'react-native-size-matters';

export const Faq = () => {
  const {colors} = useTheme();

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <BackButtonHeader showPages={false} />
      <Title title="FAQ" />
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
            <Text style={[textStyle.h3, {color: colors.black}]}>
              Lorem ipsum dolor sit amet?
            </Text>
            <View height={scale(10)} />
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, textAlign: 'left', lineHeight: scale(18)},
              ]}>
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation.
            </Text>
            <View height={scale(10)} />
            <Text style={[textStyle.h3, {color: colors.black}]}>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat?
            </Text>
            <View height={scale(10)} />
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, textAlign: 'left', lineHeight: scale(18)},
              ]}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </Text>
            <View height={scale(10)} />
            <Text style={[textStyle.h3, {color: colors.black}]}>
              Sed ut perspiciatis unde omnis iste natus?
            </Text>
            <View height={scale(10)} />
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, textAlign: 'left', lineHeight: scale(18)},
              ]}>
              error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
              sit amet, consectetur
            </Text>
            <View height={scale(10)} />
            <Text style={[textStyle.h3, {color: colors.black}]}>
              Adipisci velit, sed quia non numquam eius modi tempora incidunt ut
              labore?
            </Text>
            <View height={scale(10)} />
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, textAlign: 'left', lineHeight: scale(18)},
              ]}>
              error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
              sit amet, consectetur
            </Text>
          </ScrollView>
        </Wrapper>
      </ScrollView>
    </Screen>
  );
};
