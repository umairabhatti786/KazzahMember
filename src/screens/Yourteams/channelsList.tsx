import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import {SvgUri} from 'react-native-svg';
import {setChannelId, setTeamId} from 'reducers/addProReducer';
import {useDispatch} from 'react-redux';
const ChannelList = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  let imageFormate = props?.item?.icon?.split('.').pop();

  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={() => {
          dispatch(setTeamId(props?.item.teamId.toString()));
          dispatch(setChannelId(props?.item.id.toString()));
          navigation.navigate('TeamDetails', {
            data: props?.item,
          });
        }}
        style={{
          borderBottomColor: colors.gallery,
          borderBottomWidth: 1,
          borderTopColor: colors.gallery,
          borderTopWidth: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: verticalScale(50),
        }}
      >
        {imageFormate === 'svg' ? (
          <View flexDirection={'row'} alignItems={'center'}>
            <View
              style={{
                height: scale(35),
                width: scale(35),
                backgroundColor: '#000000',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: scale(5),
              }}
            >
              <SvgUri
                width={scale(20)}
                height={scale(20)}
                uri={props?.item?.icon}
              />
              <View width={90} />
            </View>
            <View width={scale(20)} />
            <View flexDirection={'column'}>
              <Text
                style={[
                  textStyle.b3,
                  {color: colors.black, marginTop: scale(5)},
                ]}
              >
                {props?.item?.name}
              </Text>
              <Text
                style={[
                  textStyle.b5,
                  {color: colors.doveGray, marginTop: scale(5)},
                ]}
              >
                {`${props?.item?.providerCount} Pros`}
              </Text>
            </View>
          </View>
        ) : null}

        {/* {props?.channelIndex == props.index ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null} */}
      </Pressable>
    </View>
  );
};

export default ChannelList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
  });
