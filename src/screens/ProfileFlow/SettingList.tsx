import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';

const SettingListHeader = (props: any) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  const onPress = () => {
    switch (props.index) {
      case 0:
        navigation.navigate('ProfileScreen');
        break;
      case 1:
        navigation.navigate('Password');
        break;
      case 2:
        navigation.navigate('Address');
        break;
      case 3:
        navigation.navigate('CreditCard');
        break;
      case 4:
        navigation.navigate('PhotoScreen');
        break;
      case 5:
        navigation.navigate('DisplayScreen');
        break;
      case 6:
        navigation.navigate('NotificationsScreen');
        break;
      case 7:
        navigation.navigate('TermsAndCondition');
        break;
      case 8:
        navigation.navigate('AboutKazzah');
        break;

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        key={props.index}
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          borderBottomColor: colors.gallery,
          borderBottomWidth: 1,
          backgroundColor: colors.background,
          borderTopColor: colors.gallery,
          borderTopWidth: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          height: verticalScale(55),
        }}
      >
        <Image
          style={styles.imageStyle}
          resizeMode="cover"
          source={props.item?.icon}
        />

        <View
          marginLeft={'s'}
          width={'88%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}
        >
          <View width={'90%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}
              ellipsizeMode={'tail'}
            >
              {props.item?.name}
            </Text>

            <Text
              // numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}
            >
              {props.item?.description}
            </Text>
          </View>
          <Image
            source={require('../../../src/assets/NextIcon.png')}
            style={{width: scale(5), height: scale(8)}}
          />
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: scale(20),
    width: scale(20),
  },
});

export default SettingListHeader;
