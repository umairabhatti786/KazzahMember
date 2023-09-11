import React from 'react';
import {Screen, Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import {verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import QRCode from 'react-native-qrcode-svg';
import PersonIcon from '../../assets/PersonIcon.svg';
import QRCoderBackHeader from 'newComponents/QRCoderBackHeader';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';

const QRCodeScreen = () => {
  const {colors} = useTheme();

  const currentUser = useSelector(authSelector).currentUser;

  return (
    <View flex={1} alignItems={'center'} justifyContent={'center'}>
      <QRCode value={currentUser.id.toString()} size={300} />
      <View height={scale(20)} />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={[
            textStyle.h1,
            textStyle.center,
            {
              color: colors.black,
              width: '40%',
              marginTop: scale(5),
            },
          ]}
        >
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </Text>
        <View height={verticalScale(8)} />
        <View flexDirection={'row'} alignItems={'center'}>
          <PersonIcon
            height={scale(13)}
            width={scale(13)}
            color={colors.silverChalice}
          />
          <View width={scale(4)} />
          <Text style={[textStyle.b5, {color: colors.silverChalice}]}>
            {currentUser.username}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QRCodeScreen;
