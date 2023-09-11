import {useNavigation, useTheme} from '@react-navigation/native';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {View, Text, Screen} from 'ui';
import Button from 'newComponents/Button';
import {useDispatch} from 'react-redux';

const CardPrompt = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <Screen edges={['right', 'left']}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.black,
        }}>
        <View style={{marginTop: Platform.OS == 'ios' ? verticalScale(40) : 0}}>
          <BackButtonHeader showPages={false} backColor={colors.background} />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: '60%',
            backgroundColor: colors.background,
            flex: 1,
          }}>
          <View height={verticalScale(40)} />
          <View
            style={{
              paddingHorizontal: '6%',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={[
                textStyle.h1,
                {textAlign: 'center', color: colors.black},
              ]}>
              [You card is safe with Kazzah.]
            </Text>
            <View height={verticalScale(10)} />
            <Text
              lineHeight={21}
              style={[
                textStyle.b3,
                ,
                {textAlign: 'center', width: '90%', color: colors.black},
              ]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View height={verticalScale(40)} />
          </View>

          <Button
            label="Got it"
            //   width={'65%'}
            onPress={() => props.navigation.navigate('AddCard')}
          />
        </View>
      </View>
    </Screen>
  );
};

const makeStyles = (colors: any) => StyleSheet.create({});

export default CardPrompt;
