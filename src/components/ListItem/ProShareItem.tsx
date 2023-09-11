import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Text, View, theme} from 'ui';
import styles from './style';
import {SvgUri} from 'react-native-svg';
const ProShareItem = props => {
  const {selectedIndexes, setSelectedIndexes} = props;
  let imageFormate = props?.item?.image?.split('.').pop();

  return props?.item?.name === 'Add' ? (
    <></>
  ) : (
    <TouchableOpacity
      onPress={props?.onSelectProShare}
      activeOpacity={0.6}
      style={{
        alignItems: 'center',
        marginHorizontal: scale(15),
        marginVertical: verticalScale(10),
        height: verticalScale(120),
      }}>
      <Text numberOfLines={1} style={styles.textStyleProTeam}>
        {props?.item?.categoryName?.charAt(0).toUpperCase() +
          props?.item?.categoryName?.slice(1)}
      </Text>
      <View
        style={[
          {
            backgroundColor: 'white',
            borderRadius: scale(4),
            height: scale(58),
            width: scale(58),
            justifyContent: 'center',
            alignItems: 'center',
          },
          props?.item?.image ? {borderRadius: scale(16)} : null,
        ]}>
        <View
          style={{
            width: scale(58),
            height: scale(58),
            borderRadius: scale(16),
            borderWidth: 3,
            overflow: 'hidden',
            borderColor: selectedIndexes.includes(props?.index)
              ? theme.colors.green
              : 'white',
          }}>
          {props.item?.image === 'https://ddj1in4n3rs0l.cloudfront.net/1' ? (
            <View
              backgroundColor={'grey3'}
              padding="xs"
              borderRadius={scale(50)}
              height={scale(58)}
              width={scale(58)}
              justifyContent="center"
              alignItems={'center'}>
              <Text
                color={'black'}
                fontSize={scale(22)}
                fontWeight="bold"
                textTransform={'uppercase'}
                textAlign="center">
                {`${
                  props?.item?.firstName ===
                  props?.item?.firstName?.split(' ')[0]
                    ? props?.item?.firstName?.charAt(0).toUpperCase()
                    : props?.item?.firstName?.charAt(0).toUpperCase()
                } ${
                  props?.item?.lastName === props?.item?.lastName?.split(' ')[0]
                    ? props?.item?.lastName?.charAt(0).toUpperCase()
                    : props?.item?.lastName?.charAt(0).toUpperCase()
                }`}
              </Text>
            </View>
          ) : (
            <>
              {imageFormate === 'svg' ? (
                <View style={{backgroundColor: '#000000', borderRadius: 70}}>
                  <SvgUri
                    width={scale(52)}
                    height={scale(52)}
                    uri={props?.item?.image}
                  />
                </View>
              ) : (
                <Image
                  style={{
                    width: scale(58),
                    height: scale(58),
                    borderRadius: scale(50),
                  }}
                  source={{uri: props.item?.image}}
                  resizeMode="cover"
                />
              )}
            </>
          )}
        </View>
      </View>
      <View
        style={{
          width: scale(58),
          alignItems: 'center',
          paddingTop: 3,
          justifyContent: 'center',
        }}>
        <Text
          variant={'info'}
          fontSize={scale(10)}
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.textStyleProviderTeam}
          textAlign="center">
          {props?.item?.firstName
            ? props?.item?.firstName?.charAt(0).toUpperCase() +
              props?.item?.firstName?.slice(1)
            : ' '}{' '}
          {props?.item?.lastName
            ? props?.item?.lastName?.charAt(0).toUpperCase() +
              props?.item?.lastName?.slice(1)
            : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProShareItem;
