import React, {useEffect, useState} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ProductUpdate from '../../../assets/ProductUpdate.svg';

const NotificationUpdateItem = (props: any) => {
  const {colors} = useTheme();
  const [textLength, setTextLength] = useState();
  console.log('textLength', textLength);

  return (
    <View>
      <ProductUpdate height={verticalScale(250)} />
      <Pressable
        onPress={props.onPress}
        style={{
          backgroundColor: colors.background,
          borderBottomWidth: 0.5,
          width: '100%',
          flexDirection: 'row',

          borderBottomColor: colors.silverChalice,
          paddingVertical: verticalScale(15),
          height: verticalScale(65),
        }}>
        <View
          flexDirection={'row'}
          justifyContent={'space-between'}
          style={{width: '100%'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              justifyContent: 'space-around',
            }}>
            <Text
              numberOfLines={1}
              style={[textStyle.cta1, {color: colors.black}]}>
              You can now use Apple Pay
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text color="black" numberOfLines={2} fontSize={scale(10)}>
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                ...
              </Text>
              {/* {props.item.message.length > 85 ? (
              <Pressable onPress={props.onReadMore} alignSelf={'flex-end'}>
                <Text style={[textStyle.cta2, {alignSelf: 'flex-end'}]}>
                  More
                </Text>
              </Pressable>
            ) : null} */}
            </View>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              height: '100%',

              justifyContent: 'flex-end',
            }}>
            <Text
              style={[
                textStyle.b5,
                {
                  color: colors.silverChalice,
                  alignSelf: 'flex-end',
                },
              ]}>
              Mar 21, 2023
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default NotificationUpdateItem;
