import React from 'react';
import {Pressable, View} from 'ui';
import BackArrow from '../../assets/BackArrow.svg';
import {scale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import QRCode from '../../assets/QRCode.svg';

type Props = {
  handleBack?: any;
  color?: any;
};

const QRCoderBackHeader = ({handleBack = null, color}: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  return (
    <View
      flexDirection={'row'}
      paddingHorizontal={'s'}
      paddingRight={'xxl'}
      marginTop={'xxl'}>
      <Pressable
        onPress={() => {
          handleBack;
          navigation.goBack();
        }}>
        <BackArrow
          style={{
            alignSelf: 'flex-start',
            marginLeft: scale(10),
            color: color,
          }}
          width={scale(20)}
          height={scale(15)}
        />
      </Pressable>
    </View>
  );
};

export default QRCoderBackHeader;
