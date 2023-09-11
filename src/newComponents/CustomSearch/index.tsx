import {Platform, TextInput} from 'react-native';
import {View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import SearchIcon from 'assets/SearchIcon.svg';

const CustomSearch = ({
  width = '100%',
  onChangeFilterSearch,
  placeholder,
  style,
}: any) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          width: width,
          alignSelf: 'center',
          height: verticalScale(36),
          flexDirection: 'row',
          borderRadius: scale(110),
          paddingHorizontal: scale(10),
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: scale(20),
          backgroundColor: colors.gallery,
        },
        style,
      ]}
    >
      <SearchIcon
        style={{color: colors.silverChalice}}
        width={scale(20)}
        height={scale(15)}
      />
      <View width={scale(5)} />

      <TextInput
        style={{
          flex: 1,
          color: colors.black,
          fontFamily: 'Calibre',
          fontWeight: '400',
          fontSize: 18,
          height: verticalScale(36),
          marginTop: Platform.OS == 'ios' ? 5 : 0,
        }}
        placeholderTextColor={colors.silverChalice}
        placeholder={placeholder}
        onChangeText={onChangeFilterSearch}
      />
    </View>
  );
};

export default CustomSearch;
