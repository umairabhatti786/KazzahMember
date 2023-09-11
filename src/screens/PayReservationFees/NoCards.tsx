import {useNavigation, useTheme} from '@react-navigation/native';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import React from 'react';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {View, Text} from 'ui';
import Button from 'newComponents/Button';
import {useDispatch} from 'react-redux';
import NoCardIcon from '../../../src/assets/NoCardIcon.svg';

const NoCards = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <BackButtonHeader showPages={false} showCancel={true} />
      <View
        style={{
          paddingHorizontal: '6%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40%',
        }}>
        <NoCardIcon width={scale(120)} height={scale(120)} />
        <View height={verticalScale(10)} />
        <Text style={[textStyle.h1]}>No cards.</Text>
        <View height={verticalScale(5)} />

        <Text style={[textStyle.b3, , {textAlign: 'center', width: '80%'}]}>
          You haven’t added a credit card yet. Add a card now so that you can
          pay your Pros!
        </Text>
        <View height={verticalScale(40)} />
        <Button
          label="Add credit card"
          width={'65%'}
          onPress={() => props.navigation.navigate('CardPrompt')}
        />
      </View>
    </View>
  );
};

const makeStyles = (colors: any) => StyleSheet.create({});

export default NoCards;
