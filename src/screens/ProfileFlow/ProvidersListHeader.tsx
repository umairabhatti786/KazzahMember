import {Pressable, Text, View} from 'ui';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';

const ProviderListHeader = props => {
  const {colors} = useTheme();

  return (
    <Pressable
      key={props?.index}
      onPress={() => {
        props?.setSelection(props?.item?.connection?.id);

        props?.setisPro(props?.item?.connectionRelation);
      }}
      style={{
        borderBottomColor: colors.gallery,
        borderBottomWidth: 1,
        borderTopColor: colors.gallery,
        borderTopWidth: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: verticalScale(50),
      }}>
      {props?.item?.connection?.profileImage ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}
          style={{marginRight: scale(10)}}
          overflow="hidden">
          <FastImage
            style={{
              height: scale(35),
              width: scale(35),
              borderRadius: scale(8),
            }}
            source={{uri: props?.item?.connection?.profileImage}}
          />
        </Pressable>
      ) : (
        <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          firstName={`${props?.item?.connection?.firstName}`}
          lastName={`${props?.item?.connection?.lastName}`}
        />
      )}

      <View
        marginLeft={'s'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}>
        <View width={'70%'} flexDirection={'column'}>
          <Text
            numberOfLines={1}
            style={[textStyle.b3, {color: colors.black}]}
            ellipsizeMode={'tail'}>
            {props?.item?.connection?.firstName}{' '}
            {props?.item?.connection?.lastName}
          </Text>
          {props?.item?.connection?.rootService ? (
            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {props?.item?.connection?.rootService}
            </Text>
          ) : null}
        </View>

        {props?.isSelected == props?.item?.connection?.id ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null}
      </View>
    </Pressable>
  );
};

export default ProviderListHeader;
