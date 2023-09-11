import React from 'react';
import {Pressable, Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {ScrollView, TouchableOpacity} from 'react-native';

type Props = {
  setActiveService: any;
  activeService: any;
};

const FilterPro = ({setActiveService, activeService}: Props) => {
  const {colors} = useTheme();

  const filters = ['Pros', 'Teams', 'Service', 'Recents'];

  const navigation = useNavigation();

  return (
    <View flexDirection={'row'} width={'100%'}>

        <ScrollView
        showsHorizontalScrollIndicator={false}
         horizontal>

        {filters.map((item, index) => {
        return (
          <TouchableOpacity
          activeOpacity={0.6}
            onPress={() => {
              setActiveService(index);
            }}
            style={{
              paddingHorizontal: scale(20),
              alignItems: 'center',
              paddingVertical: scale(12),
              borderRadius: scale(20),
              borderWidth: 1,
              borderColor:
                activeService == index ? colors.black : colors.silverChalice,

              justifyContent: 'center',
              marginRight: scale(15),
            }}>
            <Text
              style={[
                textStyle.cta2,
                {
                  color:
                    activeService == index
                      ? colors.black
                      : colors.silverChalice,
                },
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}

        </ScrollView>
     
    </View>
  );
};

export default FilterPro;
