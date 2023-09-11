import {StyleSheet} from 'react-native';
import {View, Text, Pressable} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import CrossIcon from '../../assets/CrossIcon.svg';
import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
import LogOut from '../../assets/LogOut.svg';
import {Logout} from '../../services/profile';
import {useDispatch} from 'react-redux';
import {setLogOut} from '../../reducers/authReducer';
import FastImage from 'react-native-fast-image';

const LogOutModal = ({visible, setVisible}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const onClose = () => {
    setVisible();
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View
        flexDirection={'column'}
        alignSelf="center"
        style={{backgroundColor: colors.background, padding: '6%'}}
        height={'65%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
      >
        <Pressable style={styles.crossIcon} onPress={onClose}>
          <CrossIcon
            style={{
              color: colors.black,
              width: scale(40),
              height: scale(40),
            }}
          />
        </Pressable>

        <View
          style={{
            width: '100%',
            marginTop: verticalScale(10),
            alignItems: 'center',
          }}
        >
          <FastImage
            style={{height: scale(100), width: scale(100)}}
            source={require('../../assets/logoutIcon.png')}
          />
          <View height={verticalScale(10)} />
          <View width={'100%'} alignItems={'center'}>
            <Text
              style={[textStyle.h1, {textAlign: 'center', color: colors.black}]}
            >
              Are you sure you want to logout?
            </Text>
            <View height={verticalScale(5)} />

            <Text
              style={[
                textStyle.b3,
                {textAlign: 'center', width: '90%', lineHeight: scale(18)},
              ]}
            >
              Are you sure you want to logout from Kazzah? You will no longer be
              able to book, manage and pay your Pros.
            </Text>
          </View>
        </View>
        <View height={verticalScale(20)} />
        <Button
          label="Yes, logout"
          width={'100%'}
          onPress={() => {
            onClose();
            Logout().then(() => {
              dispatch(setLogOut());
            });
          }}
        />
        <View height={scale(20)} />
        <Pressable onPress={onClose}>
          <Text
            style={[textStyle.h3, {color: colors.black, textAlign: 'center'}]}
          >
            Nevermind
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default LogOutModal;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    crossIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: scale(40),
      width: scale(40),
      marginTop: scale(-10),
      marginLeft: scale(-10),
    },
  });
