import React, {useEffect, useState} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, Platform} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';

const NotificationCard = (props: any) => {
  const {colors} = useTheme();
  const [textLength, setTextLength] = useState();
  console.log('textLength', textLength);

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        backgroundColor: colors.background,

        borderWidth: Platform.OS == 'ios' ? 0.25 : 0.5,
        width: '100%',
        flexDirection: 'row',
        borderStartColor: colors.background,
        borderEndColor: colors.background,
        borderBottomColor: colors.silverChalice,
        height: 80,
      }}
    >
      <View
        flexDirection={'row'}
        justifyContent={'space-between'}
        style={{width: '100%'}}
      >
        <View
          style={{
            width: '70%',
            height: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Text
            numberOfLines={1}
            style={[textStyle.cta1, {color: colors.black}]}
          >
            {props.item?.notificationClass?.toUpperCase()}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              marginTop={'xs'}
              numberOfLines={2}
              style={(textStyle.b5, {color: colors.black})}
            >
              {props.item.message}
            </Text>
            {props.item.message.length > 85 ? (
              <Pressable onPress={props.onReadMore} alignSelf={'flex-end'}>
                <Text style={[textStyle.cta2, {alignSelf: 'flex-end'}]}>
                  More
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            height: '100%',
            justifyContent: 'space-between',
            paddingVertical: 20,
          }}
        >
          {props.item?.isRead == 0 ? (
            <View
              style={{
                width: scale(8),
                height: scale(8),
                borderRadius: 100,
                backgroundColor: colors.red,
              }}
            />
          ) : (
            <View
              style={{
                width: scale(8),
                height: scale(8),
                borderRadius: 100,
                backgroundColor: 'transparent',
              }}
            />
          )}

          <Text
            style={[
              textStyle.b5,
              {
                color: colors.silverChalice,
                alignSelf: 'flex-end',
              },
            ]}
          >
            {props.item.date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationCard;
