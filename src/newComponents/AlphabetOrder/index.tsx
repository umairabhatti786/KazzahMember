import React from 'react';
import {scale} from 'react-native-size-matters';
import {Pressable, Text, View} from 'ui';
import _ from 'lodash';
import ArrowDown from '../../assets/ArrowDown.svg';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';

type Props = {
  onPress: any;
  sortOrder: any;
  orderTest:any;
};

const AlphabetOrder = ({onPress, sortOrder,orderTest="A-Z"}: Props) => {
  const {colors} = useTheme();
  return (
    <Pressable
      onPress={onPress}
      marginTop={'m'}
      marginBottom={'m'}
      flexDirection={'row'}
      alignItems={'center'}>
      <Text style={[textStyle.h3, {color: colors.black}]}>{orderTest}</Text>
      {sortOrder ? (
        <ArrowDown
          style={{
            marginBottom: scale(5),
            marginLeft: scale(2),
            transform: [{rotate: '180deg'}],
          }}
          color={colors.black}
          height={scale(8)}
          width={scale(8)}
        />
      ) : (
        <ArrowDown
          style={{marginBottom: scale(5), marginLeft: scale(2)}}
          color={colors.black}
          height={scale(8)}
          width={scale(8)}
        />
      )}
    </Pressable>
  );
};

export default AlphabetOrder;
