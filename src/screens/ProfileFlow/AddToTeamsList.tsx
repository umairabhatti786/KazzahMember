import {Pressable, Text, View} from 'ui';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {SvgUri} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {
  getSelectedMediaDetails,
  setSelectedMediaDetails,
} from 'reducers/updateProfileReducer';
import {useDispatch} from 'react-redux';

const AddToTeamsList = props => {
  const {colors} = useTheme();
  const mediaDetails = useSelector(getSelectedMediaDetails);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Pressable
      key={props?.index}
      onPress={() => {
        props?.setSelection(props?.item?.id);
        let mediaData = {
          ...mediaDetails,
          tags: [
            {
              label: props?.item?.id,
              value: props?.item?.id,
              service: {
                name: props?.item?.name,
                icon: props?.item?.icon,
              },
            },
          ],
          ProCount: props?.item?.providerCount,
        };

        dispatch(setSelectedMediaDetails(mediaData));

        if (props?.isEdit) {
          navigation.navigate('EditPhotoScreen');
        }
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
      {props?.item?.icon ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}
          style={{marginRight: scale(10)}}
          overflow="hidden">
          <SvgUri width={30} height={30} uri={props?.item?.icon} />
        </Pressable>
      ) : (
        <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          firstName={`${props?.item?.name}`}
          lastName={`${props?.item?.name}`}
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
            {props?.item?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[textStyle.b5, {color: colors.doveGray}]}>
            {props?.item?.providerCount} Pros
          </Text>
        </View>

        {props?.isSelected == props?.item?.id ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null}
      </View>
    </Pressable>
  );
};

export default AddToTeamsList;
