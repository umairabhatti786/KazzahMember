import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {useDispatch} from 'react-redux';
const AddChatItem = (props: any) => {
  const {colors} = useTheme();

  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        borderBottomColor: colors.gallery,
        borderBottomWidth: 0.5,
        borderTopColor: colors.gallery,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: verticalScale(50),
      }}
    >
      {props.item?.profileImage ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}
          style={{marginRight: scale(10)}}
          overflow="hidden"
        >
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={{uri: props.item?.profileImage}}
          />
        </Pressable>
      ) : (
        <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          firstName={`${props.item?.firstName}`}
          lastName={`${props.item?.lastName}`}
        />
      )}

      <View
        marginLeft={'s'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <View width={'70%'} flexDirection={'column'}>
          <Text
            numberOfLines={1}
            style={[textStyle.b3, {color: colors.black}]}
            ellipsizeMode={'tail'}
          >
            {props.item?.firstName} {props.item?.lastName}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props.item?.rootService ? (
              <Text
                numberOfLines={1}
                style={[textStyle.b5, {color: colors.doveGray}]}
              >
                {props.item?.rootService}
              </Text>
            ) : null}
          </View>
        </View>

        {/* {item?.id == selectedProvider?.id ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null} */}
      </View>
    </Pressable>
  );
};

export default AddChatItem;
