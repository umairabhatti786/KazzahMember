import React from 'react';
import {Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  fetchAllProviders,
  fetchSearchedProviders,
} from 'reducers/searchReducer';

type Props = {
  setActiveFilter: any;
  activeFilter: any;
};
const MapFilter = ({setActiveFilter, activeFilter}: Props) => {
  const {colors} = useTheme();

  const filters = ['My pros', 'Public', 'Friend’s pros'];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View
      flexDirection={'row'}
      width={'100%'}
      style={{height: verticalScale(50)}}>
      {filters.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setActiveFilter(index);
            }}
            style={{
              paddingHorizontal: scale(20),
              alignItems: 'center',
              height: verticalScale(35),
              borderRadius: scale(20),

              borderWidth: 1,
              backgroundColor: colors.background,
              borderColor:
                activeFilter == index ? colors.black : colors.silverChalice,

              justifyContent: 'center',
              marginRight: scale(15),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },

              shadowOpacity: 0.13,
              shadowRadius: 10,
              elevation: 3,
            }}>
            <Text
              style={[
                textStyle.cta2,
                {
                  color:
                    activeFilter == index ? colors.black : colors.silverChalice,
                },
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MapFilter;
