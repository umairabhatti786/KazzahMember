import React, {useEffect} from 'react';
import {Text, View} from 'ui';
import {StyleSheet, Dimensions} from 'react-native';
import SplashBackground from '../../assets/SplashBackground.svg';
import SettingUP from '../../assets/SettingUP.svg';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import services from 'services';
import {useDispatch} from 'react-redux';
import {logIn} from 'reducers/authReducer';
const {height, width} = Dimensions.get('screen');

const SettingUp = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      const profileRes = await services.getAuthUser();
      dispatch(logIn(profileRes.data.data));
    }, 3000);
  }, []);

  const {colors} = useTheme();
  return (
    <View flex={1}>
      <SplashBackground height={height} width={width} />
      <View style={styles.imageContainer}>
        <SettingUP />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            textStyle.h1,
            textStyle.center,
            {color: colors.black, width: '60%'},
          ]}
        >
          Setting up your account
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: '20%',
    start: '13%',
  },
  textContainer: {
    position: 'absolute',
    top: '55%',
    start: '20%',
  },
});

export default SettingUp;
